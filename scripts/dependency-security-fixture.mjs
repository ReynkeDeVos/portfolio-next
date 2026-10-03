import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const success = (stdout = '') => ({ status: 0, stdout, stderr: '' });

const report = (items) => ({
  advisories: Object.fromEntries(items.map((item) => [item.id, item])),
  metadata: {
    vulnerabilities: Object.fromEntries(
      ['info', 'low', 'moderate', 'high', 'critical'].map((severity) => [
        severity,
        items.filter((item) => item.severity === severity).length,
      ]),
    ),
  },
});

function git(...args) {
  const result = spawnSync('git', args, { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);

  return result;
}

function inAuditScope(item, args) {
  if (args.includes('--prod')) {
    return item.scope !== 'development';
  }

  return args.includes('--dev') ? item.scope === 'development' : true;
}

function auditReport(items, nameless) {
  const output = report(items);

  if (nameless) {
    for (const item of Object.values(output.advisories)) {
      // Copy first: the package-keyed registry response still needs its names.
      const copy = { ...item };
      delete copy.module_name;
      output.advisories[item.id] = copy;
    }
  }

  return { ...success(JSON.stringify(output)), status: items.length > 0 ? 1 : 0 };
}

function bulkAdvisories(items) {
  const bulk = {};

  for (const item of items) {
    bulk[item.module_name] ??= [];
    bulk[item.module_name].push(item);
  }

  return success(JSON.stringify(bulk));
}

// A repair flips audits from `options.before` to `options.after`, so the re-audit sees the outcome the test declares.
function fakeTools(options) {
  let repaired = false;
  let auditItems = [];

  const repair = (args) => {
    if (
      (args.includes('--fix=update') && options.fixAvailable && !options.majorOnly) ||
      (args[0] === 'update' && options.fixAvailable)
    ) {
      repaired = true;
      writeFileSync('aube-lock.yaml', 'fixed lockfile\n');
    }

    return success();
  };

  const audit = (args) => {
    const items = repaired ? (options.after ?? []) : (options.before ?? []);
    auditItems = items.filter((item) => inAuditScope(item, args));

    return auditReport(auditItems, options.nameless);
  };

  const aube = {
    audit: (args) => (args.includes('--fix=update') ? repair(args) : audit(args)),
    list: () =>
      success(
        JSON.stringify([
          {
            dependencies: { app: { version: repaired ? '2.0.0' : '1.0.0' } },
            devDependencies: { tool: { version: '1.0.0' } },
          },
        ]),
      ),
    why: (args) =>
      success(
        JSON.stringify([
          { importer: '.', depType: 'dependencies', chain: [{ name: 'app' }, { name: args[1] }] },
        ]),
      ),
    query: () =>
      success(
        JSON.stringify(auditItems.map((item) => ({ name: item.module_name, version: '1.0.0' }))),
      ),
  };

  return {
    git: (args) => git(...args),
    aubr: (args) => ({
      ...success(),
      status: options.validationFailure && args[0] === 'build' ? 1 : 0,
    }),
    curl: () =>
      options.bulkFailure
        ? { status: 22, stdout: '', stderr: 'registry unavailable' }
        : bulkAdvisories(auditItems),
    // `update`, `install` and anything else without canned output succeed, repairing if the test allows.
    aube: (args) => (Object.hasOwn(aube, args[0]) ? aube[args[0]] : repair)(args),
  };
}

// Exercise orchestration against a real Git checkout while controlling registry/repair outcomes.
function fixture(options, exercise) {
  const previous = process.cwd();
  const directory = mkdtempSync(join(tmpdir(), 'dependency-security-test-'));
  process.chdir(directory);
  const manifest = { dependencies: { app: '^1.0.0' }, devDependencies: { tool: '^1.0.0' } };
  writeFileSync('package.json', `${JSON.stringify(manifest, null, 2)}\n`);
  writeFileSync('aube-lock.yaml', 'initial lockfile\n');

  git('init', '--quiet');
  // Keep the developer's global signing setup out of the throwaway repository.
  git('config', 'commit.gpgsign', 'false');
  git('config', 'user.name', 'Security test');
  git('config', 'user.email', 'test@example.invalid');
  git('add', 'package.json', 'aube-lock.yaml');
  git('commit', '--quiet', '-m', 'baseline');
  const commands = [];
  const tools = fakeTools(options);

  const run = (command, args) => {
    commands.push([command, ...args]);
    assert.ok(Object.hasOwn(tools, command), `Unexpected command: ${command}`);

    return tools[command](args);
  };

  try {
    exercise({ run, commands, git });
  } finally {
    process.chdir(previous);
    rmSync(directory, { recursive: true, force: true });
  }
}

export { fixture, success, report };
