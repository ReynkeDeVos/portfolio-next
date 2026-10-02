import { checked } from './dependency-security-process.mjs';

const ranks = { info: 0, low: 1, moderate: 2, high: 3, critical: 4 };

// JSON from the CLI is untrusted input; these checks establish its contract at the I/O boundary.
/* oxlint-disable anti-slop/no-runtime-typeof */
function parseAudit(result) {
  let report = null;

  try {
    report = JSON.parse(result.stdout);
  } catch {
    throw new Error(`Audit did not return JSON: ${result.stderr}`);
  }

  if (
    ![0, 1].includes(result.status) ||
    report.status ||
    !report.advisories ||
    typeof report.advisories !== 'object' ||
    Array.isArray(report.advisories) ||
    !report.metadata?.vulnerabilities
  ) {
    throw new Error(`Audit unavailable or malformed: ${result.stderr || result.stdout}`);
  }

  for (const advisory of Object.values(report.advisories)) {
    if (!Object.hasOwn(ranks, advisory.severity)) {
      throw new Error('Audit contains an invalid advisory');
    }
  }

  for (const severity of Object.keys(ranks)) {
    if (!Number.isInteger(report.metadata.vulnerabilities[severity])) {
      throw new TypeError('Audit is missing vulnerability counts');
    }
  }

  return report;
}
/* oxlint-enable anti-slop/no-runtime-typeof */

function addPackageName(name, advisory) {
  if (!Object.hasOwn(ranks, advisory.severity)) {
    throw new Error('Package-keyed registry response contains an invalid severity');
  }

  return { ...advisory, module_name: name };
}

function scanDependencies(run) {
  const audit = (flags) => {
    const report = parseAudit(run('aube', ['audit', ...flags, '--audit-level', 'info', '--json']));

    // Aube 2.6.1 flattens the bulk response and drops package names. Ask the same
    // endpoint for its package-keyed response only when enrichment is necessary.
    if (Object.values(report.advisories).some((item) => !item.module_name)) {
      const packages = JSON.parse(checked(run, 'aube', ['query', '*', ...flags, '--json']).stdout);
      const versions = {};

      for (const pkg of packages) {
        versions[pkg.name] ??= [];

        if (!versions[pkg.name].includes(pkg.version)) {
          versions[pkg.name].push(pkg.version);
        }
      }

      const bulk = JSON.parse(
        checked(run, 'curl', [
          '--fail',
          '--silent',
          '--show-error',
          '--retry',
          '2',
          '--max-time',
          '60',
          '--header',
          'Content-Type: application/json',
          '--data-raw',
          JSON.stringify(versions),
          'https://registry.npmjs.org/-/npm/v1/security/advisories/bulk',
        ]).stdout,
      );

      const named = {};
      const matched = new Set();

      for (const [name, advisories] of Object.entries(bulk)) {
        for (const item of advisories) {
          if (report.advisories[item.id]) {
            named[`${item.id}:${name}`] = addPackageName(name, item);
            matched.add(String(item.id));
          }
        }
      }

      if (Object.keys(report.advisories).some((id) => !matched.has(id))) {
        throw new Error('Could not map every advisory to a package; refusing an incomplete scan');
      }

      report.advisories = named;
    }

    return report;
  };

  return { all: audit([]), prod: audit(['--prod']), dev: audit(['--dev']) };
}

export { ranks, parseAudit, scanDependencies };
