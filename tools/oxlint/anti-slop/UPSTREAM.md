# Vendored anti-slop Oxlint plugin

## Source

- Source repository: unknown. The copy came from the locally installed `install-anti-slop` agent skill bundle (`~/.agents/skills/install-anti-slop/assets/anti-slop`). The skill bundle names no upstream repository, and the skill lockfile has no entry for it.
- Source commit: unknown. The skill bundle is not a git checkout and records no revision.
- Pristine snapshot: on 2026-10-01 the installed tree matched the skill bundle byte for byte (`diff -r`). SHA-256 over the sorted per-file `sha256sum` listing of every file except this `UPSTREAM.md`, computed from this directory: `44a6f958c61f71d0597f5af11f20610c24f2f3f4a27e8396ebf892744f00b503`.

Use this snapshot hash as the merge base for future updates. Record a real upstream repository and commit here once they are known.

## Installed paths

- `tools/oxlint/anti-slop/index.ts` is the generic plugin, registered in `.oxlintrc.json` as `anti-slop`.
- `tools/oxlint/anti-slop/rules/` and `tools/oxlint/anti-slop/shared/` hold the generic rules and their helpers.
- `tools/oxlint/anti-slop/effect/` is the opt-in Effect plugin. It is copied but **not registered**, because `package.json` does not depend on `effect`.
- `tools/oxlint/anti-slop/vendor/eslint-stylistic/` holds code vendored from ESLint Stylistic. It keeps that project's `LICENSE` and has its own `UPSTREAM.md`.

## Intentional deviations

None. The files are unmodified copies of the bundle.

## Repository integration

- `@oxlint/plugins` is pinned exactly to `1.86.0`, the installed `oxlint` version. Upgrade the two packages together.
- `.oxlintrc.json` sets all 18 generic anti-slop rules and `oxc/no-accumulating-spread` to `error`.
- `.oxlintrc.json` and `.oxfmtrc.jsonc` both ignore agent tooling directories and this directory, so the formatter leaves the vendored code alone.
