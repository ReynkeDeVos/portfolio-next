import { appendFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

import { ranks, scanDependencies } from './dependency-security-audit.mjs';
import { execute, checked } from './dependency-security-process.mjs';
import { writeSecurityReport } from './dependency-security-report.mjs';

const sections = ['dependencies', 'devDependencies', 'optionalDependencies'];

function finding(id, advisory, scope = 'all') {
  return { ...advisory, id, scope };
}

function selectFindings(scan, mode) {
  const found = new Map();

  const add = (report, threshold, scope) => {
    for (const [id, advisory] of Object.entries(report.advisories)) {
      if (ranks[advisory.severity] >= ranks[threshold] && !found.has(id)) {
        found.set(id, { ...advisory, id, scope });
      }
    }
  };

  add(scan.prod, 'high', 'production');
  add(scan.dev, mode === 'weekly' ? 'critical' : 'high', 'development');

  return [...found.values()];
}

function directVersions(run) {
  const result = run('aube', ['list', '--lockfile-only', '--json']);

  if (result.status !== 0) {
    throw new Error(`Cannot read locked versions: ${result.stderr}`);
  }

  const [root] = JSON.parse(result.stdout);

  if (!root) {
    throw new Error('No project found in the lockfile');
  }

  return Object.fromEntries(
    sections.flatMap((section) =>
      Object.entries(root[section] ?? {}).map(([name, value]) => [name, value.version]),
    ),
  );
}

function raiseVersionFloors(manifest, before, after) {
  let changed = false;

  for (const section of sections) {
    for (const [name, spec] of Object.entries(manifest[section] ?? {})) {
      if (after[name] && before[name] !== after[name]) {
        // Only rewrite ordinary version ranges. Aliases/URLs/catalogs need explicit review.
        const match = spec.match(/^(?<prefix>[~^]?)\d+\.\d+\.\d+(?:-[\w.-]+)?(?:\+[\w.-]+)?$/u);

        if (match) {
          const next = `${match.groups.prefix}${after[name]}`;

          manifest[section][name] = next;
          changed = true;
        }
      }
    }
  }

  return changed;
}

function runSecurity({ mode, fix = false, run = execute, reportDir = '.security-report' }) {
  if (!['weekly', 'monthly', 'check'].includes(mode) || (fix && mode === 'check')) {
    throw new Error('Use weekly/monthly [--fix] or check');
  }

  mkdirSync(reportDir, { recursive: true });
  const before = scanDependencies(run);
  const selected = selectFindings(before, mode);
  const notes = [];
  const oldVersions = directVersions(run);
  let after = before;

  if (fix && selected.length > 0) {
    for (const [scope, level] of [
      ['--prod', 'high'],
      ['--dev', mode === 'weekly' ? 'critical' : 'high'],
    ]) {
      const result = run('aube', ['audit', scope, '--audit-level', level, '--fix=update']);

      if (result.status !== 0) {
        notes.push(`Initial ${scope} repair: ${result.stderr}`);
      }
    }

    after = scanDependencies(run);
    const remaining = selectFindings(after, mode);
    const parents = new Set();

    for (const name of new Set(remaining.map((item) => item.module_name))) {
      const result = checked(run, 'aube', ['why', name, '--json']);

      for (const entry of JSON.parse(result.stdout)) {
        const parent = entry.chain?.[0]?.name;

        if (entry.importer === '.' && parent && oldVersions[parent]) {
          parents.add(parent);
        }
      }
    }

    if (parents.size > 0) {
      // Scope the fallback to parents of remaining findings; never update the whole manifest.
      const result = run('aube', ['update', '--latest', '--lockfile-only', ...parents]);
      notes.push(`Targeted fallback: ${[...parents].join(', ')} (may include major updates).`);

      if (result.status !== 0) {
        notes.push(`Fallback failed: ${result.stderr}`);
      }
    }

    const manifest = JSON.parse(readFileSync('package.json', 'utf8'));

    if (raiseVersionFloors(manifest, oldVersions, directVersions(run))) {
      writeFileSync('package.json', `${JSON.stringify(manifest, null, 2)}\n`);
      checked(run, 'aube', ['install', '--lockfile-only', '--ignore-scripts']);
    }

    after = scanDependencies(run);
  }

  const remaining = selectFindings(after, mode);
  const affectedNames = new Set(selected.map((item) => item.module_name));

  const affectedRemaining = Object.values(after.all.advisories).filter((item) =>
    affectedNames.has(item.module_name),
  );

  const newSevere = Object.entries(after.all.advisories)
    .filter(([id, item]) => ranks[item.severity] >= ranks.high && !before.all.advisories[id])
    .map(([id, item]) => finding(id, item));

  const unresolved = remaining.length > 0 || affectedRemaining.length > 0 || newSevere.length > 0;
  const diff = checked(run, 'git', ['diff', 'HEAD', '--', 'package.json', 'aube-lock.yaml']).stdout;
  let validation = 'No dependency update to validate.';
  let validationFailed = false;

  if (fix && diff) {
    const checks = [
      ['aube', ['install', '--frozen-lockfile']],
      ['aubr', ['check']],
      ['aubr', ['build']],
    ];

    const results = [];

    for (const [command, args] of checks) {
      const result = run(command, args);
      writeFileSync(`${reportDir}/${command}-${args[0]}.log`, `${result.stdout}\n${result.stderr}`);
      results.push(`${command} ${args.join(' ')}: ${result.status === 0 ? 'PASS' : 'FAIL'}`);

      if (result.status !== 0) {
        validationFailed = true;
        break;
      }
    }

    validation = results.join('\n');
  }

  const newVersions = directVersions(run);

  const updates = Object.keys(oldVersions)
    .filter((name) => oldVersions[name] !== newVersions[name])
    .map((name) => `- ${name}: ${oldVersions[name]} → ${newVersions[name]}`);

  const lower = Object.entries(after.all.advisories)
    .filter(([, item]) => ranks[item.severity] < ranks.high)
    .map(([id, item]) => finding(id, item));

  writeSecurityReport(reportDir, {
    mode,
    before,
    after,
    selected,
    remaining,
    affectedRemaining,
    newSevere,
    updates,
    validation,
    lower,
    notes,
  });
  const failed = unresolved || validationFailed;

  const outputs = {
    changed: Boolean(diff),
    failed,
    draft: failed ? 'always-true' : 'false',
    report_issue: unresolved || validationFailed || (mode === 'monthly' && lower.length > 0),
  };

  return outputs;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const result = runSecurity({ mode: process.argv[2], fix: process.argv.includes('--fix') });
    const body = readFileSync('.security-report/report.md', 'utf8');

    if (process.env.GITHUB_OUTPUT) {
      appendFileSync(
        process.env.GITHUB_OUTPUT,
        Object.entries(result)
          .map(([key, value]) => `${key}=${value}\n`)
          .join(''),
      );
    }

    if (process.env.GITHUB_STEP_SUMMARY) {
      appendFileSync(process.env.GITHUB_STEP_SUMMARY, body);
    }

    console.log(body);

    // Scheduled jobs publish the report/PR before their final failure step.
    if (!process.argv.includes('--fix') && result.failed) {
      process.exitCode = 1;
    }
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}

export { raiseVersionFloors, runSecurity, selectFindings };
