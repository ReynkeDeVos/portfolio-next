# Dependency security automation

The repository uses Aube and GitHub Actions. The scheduled workflow creates or
updates one PR on `automation/dependency-security`; it never merges or deploys
dependency changes automatically.

## Policy

| When                                                | Dependencies                         | Findings that trigger repairs    |
| --------------------------------------------------- | ------------------------------------ | -------------------------------- |
| Mondays at 07:23 UTC                                | Production and optional dependencies | High and critical                |
| Mondays at 07:23 UTC                                | Development dependencies             | Critical                         |
| First day of each month at 07:43 UTC                | All dependencies                     | High and critical                |
| Dependency manifest/lockfile PRs and pushes to main | All dependencies                     | High and critical fail the check |

The monthly run also collects info/low/moderate findings without creating version
updates for them. Its report appears in the run summary and artifact, and in a
`Dependency security report (monthly)` issue when findings need attention.
Weekly unresolved findings use a corresponding weekly issue. Existing report
issues are updated and closed when the next run under that policy is clean.

Shared transitive dependencies can belong to both scopes. Production takes
priority when classifying a finding. `devDependencies` is not proof that code
is absent from the deployed application, nor that a build or development-server
vulnerability is harmless. Review the linked advisory's attack prerequisites.
This workflow does not perform code reachability analysis, fetch EPSS scores, or
monitor known exploitation independently. Treat a known, reachable exploit as
urgent regardless of its score or normal schedule.

## Repairs and verification

1. Audit the locked graph in all, production, and development scopes. Invalid
   responses and registry errors fail the workflow instead of reporting a clean
   result.
   Aube 2.6.1 drops package names from audit JSON. For nonempty nameless reports,
   the script queries Aube's locked packages and retrieves the package-keyed
   response from the public npm bulk advisory endpoint. An incomplete mapping
   fails the scan. This repository uses public npm packages; revisit that
   endpoint if private registries are introduced.
2. Try scoped `aube audit --fix=update` for the policy's findings.
3. For remaining findings, use `aube why` to identify direct dependencies that
   bring them into the graph, then update only those dependencies with
   `aube update --latest --lockfile-only`. This fallback can introduce major
   updates; inspect the diff and migration requirements before merging.
4. Raise ordinary direct version specifiers to their newly locked versions,
   retaining caret/tilde/exact spelling, then synchronize the lockfile.
5. Audit again. Findings in affected package names at any severity, remaining
   policy findings, and newly detected high/critical advisories prevent the PR
   from being presented as a successful fix. Unrelated low/moderate findings
   do not block a weekly repair.
6. Install with a frozen lockfile and run `aubr check` and `aubr build`.

Successful updates become a normal PR. Partial updates or failing validation
become a draft PR plus a report issue, and the workflow fails visibly. If no
version change is possible, it creates the report issue without an empty PR.
There are no automatic overrides or ignored/unfixable advisories.

An existing open security PR's changes are carried forward on the next run, so
a weekly run cannot discard development fixes prepared by a monthly run. A merge
conflict stops the job and needs manual resolution. Direct version changes in
the report refer to the current run; the PR diff contains all accumulated changes.

## Running it manually

In GitHub, open **Actions → Scheduled dependency security → Run workflow** on
`main`. Choose `weekly` or `monthly`; `monthly` audits high/critical findings in
both scopes and produces the lower-severity overview.

Local read-only checks:

```bash
node scripts/dependency-security.mjs weekly
node scripts/dependency-security.mjs monthly
node scripts/dependency-security.mjs check
```

`weekly` and `monthly` return a nonzero status when their policy has unresolved
findings. Adding `--fix` changes `package.json`/`aube-lock.yaml`, validates changes,
and writes results into `.security-report/`; it does not publish a PR locally.
Scheduled runs publish those results before marking unresolved findings as failed.

## GitHub setup and maintenance

Enable **Settings → Actions → General → Workflow permissions → Allow GitHub
Actions to create and approve pull requests**. Keep the default token permission
read-only: only the scheduled job requests contents, PR, and issue write access.
No PAT, Cloudflare credentials, or additional secrets are needed. PR-triggered
checks run with read-only permissions and without persisted checkout credentials.

The implementation validates automated updates inside the scheduled job because
PR checks triggered with `GITHUB_TOKEN` can require human approval. Approve those
checks in the PR when GitHub requests it. Merging and deploying a reviewed update
are separate actions; neither is performed by this workflow.

Actions are pinned to commit SHAs. Aube's version and release SHA-256 are kept
in `scripts/install-aube.sh`, shared with the Cloudflare build. When changing
`packageManager`, update that installer with the matching release digest.
Node follows the project's `.tool-versions` LTS selection.

Scan reports are retained for 90 days for scheduled runs and 30 days for PR
checks. GitHub cron is best effort. If this private repository becomes public,
GitHub can disable scheduled workflows after 60 days without repository activity.

Sources: [Aube audit](https://aube.sh/cli/audit.html),
[Aube update](https://aube.sh/cli/update.html),
[GitHub scheduled workflows](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule),
[Workflow-triggered events](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow).
