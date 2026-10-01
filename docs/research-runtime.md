# Runtime and build tooling

Checked 2026-10-01. The project uses Node directly and aube for package management.

Node LTS is selected in `.tool-versions`, which mise reads. Package scripts
launch installed tool binaries directly; `aubr` runs package scripts. Node runs the TypeScript content
validator without an additional loader.

[Nub](https://nubjs.com/docs/runtime) augments stock Node with TypeScript,
JSX, resolution and modern APIs. It does not replace Node's JavaScript engine.
This project does not need those additions, so Nub is not required.

[Cloudflare's Vite plugin](https://developers.cloudflare.com/workers/local-development/vite-plugin/)
runs Worker code in workerd, matching deployment. Nub and Bun cannot be selected
as the deployed Workers JavaScript engine. The local launcher does not change
the site's network latency, prerendered HTML, client bundle or browser animation
cost.

For managed builds, provision Node and aube. Install from `aube-lock.yaml`;
do not create a second lockfile. Production deployment and CI account
configuration remain outside this design draft.
