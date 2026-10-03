import { appendFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

import { ranks, scanDependencies } from './dependency-security-audit.mjs';
import { execute, checked } from './dependency-security-process.mjs';
import { writeSecurityReport } from './dependency-security-report.mjs';

const sections = ['dependencies', 'devDependencies', 'optionalDependencies'];

const validationSteps = [
  ['aube', ['install', '--frozen-lockfile']],
  ['aubr', ['check']],
  ['aubr', ['build']],
];

function finding(id, advisory, scope = 'all') {
  return { ...advisory, id, scope };
}

function devThreshold(mode) {
  return mode === 'weekly' ? 'critical' : 'high';
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
  add(scan.dev, devThreshold(mode), 'development');

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

function auditFix(run, mode) {
  const notes = [];

  for (const [scope, level] of [
    ['--prod', 'high'],
    ['--dev', devThreshold(mode)],
  ]) {
    const result = run('aube', ['audit', scope, '--audit-level', level, '--fix=update']);

    if (result.status !== 0) {
      notes.push(`Initial ${scope} repair: ${result.stderr}`);
    }
  }

  return notes;
}

function directParents(run, findings, oldVersions) {
  const parents = new Set();

  for (const name of new Set(findings.map((item) => item.module_name))) {
    const result = checked(run, 'aube', ['why', name, '--json']);

    for (const entry of JSON.parse(result.stdout)) {
      const parent = entry.chain?.[0]?.name;

      if (entry.importer === '.' && parent && oldVersions[parent]) {
        parents.add(parent);
      }
    }
  }

  return parents;
}

function updateDirectParents(run, mode, oldVersions) {
  const remaining = selectFindings(scanDependencies(run), mode);
  const parents = directParents(run, remaining, oldVersions);

  if (parents.size === 0) {
    return [];
  }

  // Scope the fallback to parents of remaining findings; never update the whole manifest.
  const result = run('aube', ['update', '--latest', '--lockfile-only', ...parents]);
  const notes = [`Targeted fallback: ${[...parents].join(', ')} (may include major updates).`];

  if (result.status !== 0) {
    notes.push(`Fallback failed: ${result.stderr}`);
  }

  return notes;
}

function syncVersionFloors(run, oldVersions) {
  const manifest = JSON.parse(readFileSync('package.json', 'utf8'));

  if (raiseVersionFloors(manifest, oldVersions, directVersions(run))) {
    writeFileSync('package.json', `${JSON.stringify(manifest, null, 2)}\n`);
    checked(run, 'aube', ['install', '--lockfile-only', '--ignore-scripts']);
  }
}

function repair(run, mode, oldVersions) {
  const notes = [...auditFix(run, mode), ...updateDirectParents(run, mode, oldVersions)];
  syncVersionFloors(run, oldVersions);

  return { after: scanDependencies(run), notes };
}

function assessFindings({ mode, before, after, selected }) {
  const remaining = selectFindings(after, mode);
  const affectedNames = new Set(selected.map((item) => item.module_name));

  const affectedRemaining = Object.values(after.all.advisories).filter((item) =>
    affectedNames.has(item.module_name),
  );

  const newSevere = Object.entries(after.all.advisories)
    .filter(([id, item]) => ranks[item.severity] >= ranks.high && !before.all.advisories[id])
    .map(([id, item]) => finding(id, item));

  return {
    remaining,
    affectedRemaining,
    newSevere,
    unresolved: remaining.length > 0 || affectedRemaining.length > 0 || newSevere.length > 0,
  };
}

function validate(run, reportDir) {
  const results = [];

  for (const [command, args] of validationSteps) {
    const result = run(command, args);
    writeFileSync(`${reportDir}/${command}-${args[0]}.log`, `${result.stdout}\n${result.stderr}`);
    results.push(`${command} ${args.join(' ')}: ${result.status === 0 ? 'PASS' : 'FAIL'}`);

    if (result.status !== 0) {
      return { summary: results.join('\n'), failed: true };
    }
  }

  return { summary: results.join('\n'), failed: false };
}

function versionUpdates(oldVersions, newVersions) {
  return Object.keys(oldVersions)
    .filter((name) => oldVersions[name] !== newVersions[name])
    .map((name) => `- ${name}: ${oldVersions[name]} → ${newVersions[name]}`);
}

function lowerSeverity(scan) {
  return Object.entries(scan.all.advisories)
    .filter(([, item]) => ranks[item.severity] < ranks.high)
    .map(([id, item]) => finding(id, item));
}

function runSecurity({ mode, fix = false, run = execute, reportDir = '.security-report' }) {
  if (!['weekly', 'monthly', 'check'].includes(mode) || (fix && mode === 'check')) {
    throw new Error('Use weekly/monthly [--fix] or check');
  }

  mkdirSync(reportDir, { recursive: true });
  const before = scanDependencies(run);
  const selected = selectFindings(before, mode);
  const oldVersions = directVersions(run);

  const { after, notes } =
    fix && selected.length > 0 ? repair(run, mode, oldVersions) : { after: before, notes: [] };

  const { unresolved, ...findings } = assessFindings({ mode, before, after, selected });
  const diff = checked(run, 'git', ['diff', 'HEAD', '--', 'package.json', 'aube-lock.yaml']).stdout;

  const validation =
    fix && diff
      ? validate(run, reportDir)
      : { summary: 'No dependency update to validate.', failed: false };

  const lower = lowerSeverity(after);

  writeSecurityReport(reportDir, {
    mode,
    before,
    after,
    selected,
    ...findings,
    updates: versionUpdates(oldVersions, directVersions(run)),
    validation: validation.summary,
    lower,
    notes,
  });
  const failed = unresolved || validation.failed;

  return {
    changed: Boolean(diff),
    failed,
    draft: failed ? 'always-true' : 'false',
    report_issue: failed || (mode === 'monthly' && lower.length > 0),
  };
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
