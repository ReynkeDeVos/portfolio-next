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

// Exercise orchestration against a real Git checkout while controlling registry/repair outcomes.
function fixture(options, exercise) {
  const previous = process.cwd();
  const directory = mkdtempSync(join(tmpdir(), 'dependency-security-test-'));
  process.chdir(directory);
  const manifest = { dependencies: { app: '^1.0.0' }, devDependencies: { tool: '^1.0.0' } };
  writeFileSync('package.json', `${JSON.stringify(manifest, null, 2)}\n`);
  writeFileSync('aube-lock.yaml', 'initial lockfile\n');

  git('init', '--quiet');
  git('config', 'user.name', 'Security test');
  git('config', 'user.email', 'test@example.invalid');
  git('add', 'package.json', 'aube-lock.yaml');
  git('commit', '--quiet', '-m', 'baseline');
  let repaired = false;
  let auditItems = [];
  const commands = [];

  const run = (command, args) => {
    commands.push([command, ...args]);

    if (command === 'git') {
      return git(...args);
    }

    if (command === 'aubr') {
      return { ...success(), status: options.validationFailure && args[0] === 'build' ? 1 : 0 };
    }

    if (command === 'curl') {
      if (options.bulkFailure) {
        return { status: 22, stdout: '', stderr: 'registry unavailable' };
      }

      const bulk = {};

      for (const item of auditItems) {
        bulk[item.module_name] ??= [];
        bulk[item.module_name].push(item);
      }

      return success(JSON.stringify(bulk));
    }

    assert.equal(command, 'aube');

    if (args[0] === 'audit' && !args.includes('--fix=update')) {
      const items = repaired ? (options.after ?? []) : (options.before ?? []);

      const filtered = items.filter((item) =>
        args.includes('--prod')
          ? item.scope !== 'development'
          : args.includes('--dev')
            ? item.scope === 'development'
            : true,
      );

      auditItems = filtered;
      const output = report(filtered);

      if (options.nameless) {
        for (const item of Object.values(output.advisories)) {
          // Copy first: the package-keyed registry response still needs its names.
          const copy = { ...item };
          delete copy.module_name;
          output.advisories[item.id] = copy;
        }
      }

      return { ...success(JSON.stringify(output)), status: filtered.length > 0 ? 1 : 0 };
    }

    if (args[0] === 'list') {
      return success(
        JSON.stringify([
          {
            dependencies: { app: { version: repaired ? '2.0.0' : '1.0.0' } },
            devDependencies: { tool: { version: '1.0.0' } },
          },
        ]),
      );
    }

    if (args[0] === 'why') {
      return success(
        JSON.stringify([
          { importer: '.', depType: 'dependencies', chain: [{ name: 'app' }, { name: args[1] }] },
        ]),
      );
    }

    if (args[0] === 'query') {
      return success(
        JSON.stringify(auditItems.map((item) => ({ name: item.module_name, version: '1.0.0' }))),
      );
    }

    if (
      (args.includes('--fix=update') && options.fixAvailable && !options.majorOnly) ||
      (args[0] === 'update' && options.fixAvailable)
    ) {
      repaired = true;
      writeFileSync('aube-lock.yaml', 'fixed lockfile\n');
    }

    return success();
  };

  try {
    exercise({ run, commands, git });
  } finally {
    process.chdir(previous);
    rmSync(directory, { recursive: true, force: true });
  }
}

export { fixture, success, report };
