import { writeFileSync } from 'node:fs';

function markdown(value) {
  return String(value ?? '')
    .replaceAll(/[\r\n]/gu, ' ')
    .replaceAll('|', String.raw`\|`)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function advisoryTable(findings) {
  if (findings.length === 0) {
    return 'No matching known vulnerabilities.';
  }

  return [
    '| Package | Severity | Scope | Advisory | Affected range |',
    '| --- | --- | --- | --- | --- |',
    ...findings.map((item) => {
      const ghsa = item.url?.match(/^https:\/\/github\.com\/advisories\/(?<ghsa>GHSA-[\w-]+)/u)
        ?.groups.ghsa;

      const id = markdown(item.github_advisory_id ?? ghsa ?? item.id);
      const link = /^GHSA-[\w-]+$/u.test(id) ? `[${id}](https://github.com/advisories/${id})` : id;

      return `| ${markdown(item.module_name)} | ${markdown(item.severity)} | ${item.scope ?? 'all'} | ${link}: ${markdown(item.title)} | ${markdown(item.vulnerable_versions)} |`;
    }),
  ].join('\n');
}

function writeSecurityReport(
  reportDir,
  {
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
  },
) {
  const body = [
    '# Dependency security report',
    `Policy: ${mode}. Production: high/critical; development: ${mode === 'weekly' ? 'critical' : 'high/critical'}.`,
    '## Findings before repair',
    advisoryTable(selected),
    '## Direct version changes in this run',
    updates.join('\n') || 'None. Transitive updates may appear in the lockfile diff.',
    '## Remaining findings under this policy',
    advisoryTable(remaining),
    '## Any-severity findings in affected packages',
    advisoryTable(affectedRemaining),
    '## Newly detected high/critical findings',
    advisoryTable(newSevere),
    '## Validation',
    validation,
    ...(mode === 'monthly' ? ['## Lower-severity monthly overview', advisoryTable(lower)] : []),
    '## Review',
    'Dependency scope follows package.json; it is not proof of production reachability. Read the advisory attack prerequisites before merging. No automatic merge or deployment.',
    ...notes.map((note) => `\n${markdown(note)}`),
  ].join('\n\n');

  writeFileSync(`${reportDir}/report.md`, `${body}\n`);

  const prBody = [
    '## Summary',
    'Update vulnerable dependencies and retain their fixes in the Aube lockfile.',
    '```text\naudit → scoped repair → targeted parent upgrades if needed → reaudit → frozen install + checks + build\n```',
    updates.join('\n') || 'See the lockfile diff for accumulated/transitive updates.',
    '## Evidence',
    `**Before this run:** ${selected.length} policy findings. **After:** ${remaining.length} policy findings, ${affectedRemaining.length} any-severity findings in affected packages, ${newSevere.length} newly detected severe findings.`,
    '### Original advisories',
    advisoryTable(selected),
    '### Remaining advisories',
    advisoryTable(remaining),
    '### Other findings in affected packages',
    advisoryTable(affectedRemaining),
    '### New severe advisories',
    advisoryTable(newSevere),
    validation,
    '## Merge Danger',
    '**Door:** two-way. Reverting the dependency changes restores the previous versions and their known vulnerabilities.',
    '**Blast Radius:** dependencies. Targeted parent upgrades may include major versions; review compatibility and advisory prerequisites. Dependency scope does not establish reachability.',
    ...notes.map((note) => markdown(note)),
  ].join('\n\n');

  writeFileSync(`${reportDir}/pr.md`, `${prBody}\n`);
  writeFileSync(`${reportDir}/audit-before.json`, `${JSON.stringify(before, null, 2)}\n`);
  writeFileSync(`${reportDir}/audit-after.json`, `${JSON.stringify(after, null, 2)}\n`);
}

export { writeSecurityReport };
