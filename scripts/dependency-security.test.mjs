import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import test from 'node:test';

import { parseAudit } from './dependency-security-audit.mjs';
import { fixture, success, report } from './dependency-security-fixture.mjs';
import { raiseVersionFloors, runSecurity, selectFindings } from './dependency-security.mjs';

const advisory = (name, severity = 'high', id = name) => ({
  id,
  module_name: name,
  severity,
  title: `${name} vulnerability`,
  vulnerable_versions: '<1.0.1',
});

test('weekly policy includes production high and all development critical; monthly includes development high', () => {
  const shared = advisory('shared');
  const devHigh = advisory('dev-high');

  const scan = {
    prod: report([shared, advisory('prod-low', 'low')]),
    dev: report([shared, devHigh, advisory('dev-critical', 'critical')]),
  };

  assert.deepEqual(
    selectFindings(scan, 'weekly').map((item) => [item.module_name, item.scope]),
    [
      ['shared', 'production'],
      ['dev-critical', 'development'],
    ],
  );
  assert.equal(selectFindings(scan, 'monthly').length, 3);
  assert.equal(selectFindings(scan, 'check').length, 3);
});

test('registry failures, degraded responses, and invalid JSON fail closed', () => {
  assert.throws(() => parseAudit({ status: 1, stdout: '', stderr: 'registry unavailable' }));
  assert.throws(() => parseAudit({ status: 2, stdout: '{"status":"degraded"}', stderr: '' }));
  assert.throws(() => parseAudit(success('{"advisories":{}}')));
  const invalid = report([advisory('x', 'unknown')]);
  const invalidResult = success(JSON.stringify(invalid));
  assert.throws(() => parseAudit(invalidResult));
  const valid = report([advisory('x')]);
  const validResult = { ...success(JSON.stringify(valid)), status: 1 };
  const parsed = parseAudit(validResult);
  assert.equal(Object.keys(parsed.advisories).length, 1);
});

test('version floors preserve caret/tilde/exact ranges and leave unrelated or nonstandard specs alone', () => {
  const manifest = {
    dependencies: {
      caret: '^1.0.0',
      tilde: '~1.0.0',
      exact: '1.0.0',
      untouched: '^1.0.0',
      alias: 'npm:other@^1',
    },
  };

  const before = {
    caret: '1.0.0',
    tilde: '1.0.0',
    exact: '1.0.0',
    untouched: '1.0.0',
    alias: '1.0.0',
  };

  assert.equal(
    raiseVersionFloors(manifest, before, {
      ...before,
      caret: '1.0.1',
      tilde: '1.0.1',
      exact: '2.0.0',
      alias: '2.0.0',
    }),
    true,
  );
  assert.deepEqual(manifest.dependencies, {
    caret: '^1.0.1',
    tilde: '~1.0.1',
    exact: '2.0.0',
    untouched: '^1.0.0',
    alias: 'npm:other@^1',
  });
});

test('a clean weekly run creates no update and performs no install or build', () => {
  fixture({}, ({ run, commands }) => {
    const result = runSecurity({ mode: 'weekly', fix: true, run });
    assert.equal(result.changed, false);
    assert.equal(result.failed, false);
    assert.equal(result.report_issue, false);
    assert.equal(
      commands.some(([, subcommand]) =>
        ['update', 'install', 'check', 'build'].includes(subcommand),
      ),
      false,
    );
  });
});

test('monthly lower-severity findings produce a report but no update PR', () => {
  fixture({ before: [advisory('app', 'moderate')] }, ({ run, commands }) => {
    const result = runSecurity({ mode: 'monthly', fix: true, run });
    assert.equal(result.changed, false);
    assert.equal(result.failed, false);
    assert.equal(result.report_issue, true);
    assert.equal(
      commands.some((args) => args.includes('--fix=update')),
      false,
    );
    assert.match(
      readFileSync('.security-report/report.md', 'utf8'),
      /Lower-severity monthly overview/u,
    );
  });
});

test('a successful repair raises the manifest floor, reaudits, and validates before publishing', () => {
  fixture({ before: [advisory('app')], fixAvailable: true }, ({ run, commands }) => {
    const result = runSecurity({ mode: 'weekly', fix: true, run });
    assert.equal(result.changed, true);
    assert.equal(result.draft, 'false');
    assert.equal(result.failed, false);
    assert.equal(JSON.parse(readFileSync('package.json', 'utf8')).dependencies.app, '^2.0.0');
    assert.equal(
      commands.some((args) => args.includes('--frozen-lockfile')),
      true,
    );
    assert.equal(
      commands.some((args) => args[0] === 'aubr' && args[1] === 'build'),
      true,
    );
  });
});

test('an out-of-range transitive fix updates only its direct parent', () => {
  fixture(
    { before: [advisory('transitive')], fixAvailable: true, majorOnly: true },
    ({ run, commands }) => {
      const result = runSecurity({ mode: 'weekly', fix: true, run });
      assert.equal(result.failed, false);
      const updates = commands.filter((args) => args[1] === 'update');
      assert.deepEqual(updates, [['aube', 'update', '--latest', '--lockfile-only', 'app']]);
    },
  );
});

test('unfixable vulnerabilities remain visible and fail the run', () => {
  fixture({ before: [advisory('app')] }, ({ run }) => {
    const result = runSecurity({ mode: 'weekly', fix: true, run });
    assert.equal(result.changed, false);
    assert.equal(result.failed, true);
    assert.equal(result.report_issue, true);
  });
});

for (const [description, options] of [
  ['a newly introduced severe advisory', { after: [advisory('other', 'critical')] }],
  [
    'a lower-severity advisory remaining in the affected package',
    { after: [advisory('app', 'low')] },
  ],
  ['a failing build', { validationFailure: true }],
]) {
  test(`${description} makes the update a draft and fails the run`, () => {
    fixture({ before: [advisory('app')], fixAvailable: true, ...options }, ({ run }) => {
      const result = runSecurity({ mode: 'weekly', fix: true, run });
      assert.equal(result.changed, true);
      assert.equal(result.draft, 'always-true');
      assert.equal(result.failed, true);
      assert.equal(result.report_issue, true);
    });
  });
}

test('unrelated low-severity findings do not block a repaired security PR', () => {
  fixture(
    {
      before: [advisory('app'), advisory('other', 'low')],
      after: [advisory('other', 'low')],
      fixAvailable: true,
    },
    ({ run }) => {
      assert.equal(runSecurity({ mode: 'weekly', fix: true, run }).failed, false);
    },
  );
});

test('staged updates from an existing PR are preserved and validated even without new findings', () => {
  fixture({}, ({ run, commands, git }) => {
    writeFileSync('aube-lock.yaml', 'existing PR update\n');
    git('add', 'aube-lock.yaml');
    const result = runSecurity({ mode: 'weekly', fix: true, run });
    assert.equal(result.changed, true);
    assert.equal(result.failed, false);
    assert.equal(
      commands.some((args) => args[0] === 'aubr' && args[1] === 'build'),
      true,
    );
  });
});

test('real Aube JSON without package names is enriched before targeted repairs', () => {
  fixture(
    { before: [advisory('app')], fixAvailable: true, nameless: true },
    ({ run, commands }) => {
      const result = runSecurity({ mode: 'weekly', fix: true, run });
      assert.equal(result.failed, false);
      assert.equal(result.changed, true);
      assert.equal(
        commands.some((args) => args[0] === 'curl'),
        true,
      );
      const body = readFileSync('.security-report/report.md', 'utf8');
      assert.match(body, /app vulnerability/u);
      assert.match(body, /&lt;1\.0\.1/u);
    },
  );
});

test('a failed advisory-name lookup cannot be mistaken for a clean scan', () => {
  fixture({ before: [advisory('app')], nameless: true, bulkFailure: true }, ({ run }) => {
    assert.throws(() => runSecurity({ mode: 'weekly', fix: true, run }), /registry unavailable/u);
  });
});
