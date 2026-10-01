# portfolio-next

Renke Brixel’s bilingual portfolio, built with TanStack Start, React and Cloudflare Workers.

Live site: [portfolio.renkebrixel.workers.dev](https://portfolio.renkebrixel.workers.dev/)

Cloudflare Workers Builds deploys this repository's `main` branch to the `portfolio` Worker.
Each push or merge to `main` installs the locked dependencies, runs the project checks,
builds both language versions, and deploys the result when those steps succeed.

Cloudflare build settings:

- Production branch: `main`
- Root directory: `/`
- Build command: `bash scripts/cloudflare-build.sh`
- Deploy command: `.cloudflare-build/bin/aubx wrangler deploy`
- Build variable: `SKIP_DEPENDENCY_INSTALL=1`

The build script installs Aube 2.6.1 and verifies its release archive checksum.
Node.js is pinned in `.node-version`. Update the script's Aube version and checksum
alongside `packageManager` when upgrading Aube.

For a manual deployment from a configured local checkout, run `aubr deploy`.
