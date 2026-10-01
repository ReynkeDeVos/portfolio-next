# Runtime and build tooling

Checked 2026-10-01. The owner requested Nub, with Bun as a fallback.

[Nub](https://nubjs.com/docs/runtime) augments stock Node with TypeScript,
JSX, resolution and modern APIs. It does not replace Node's JavaScript engine.
The project uses installed Nub 0.9.5 and pins Node 24.21.0 in `.tool-versions`.

[Nub's Cloudflare deployment guide](https://nubjs.com/docs/deployment/cloudflare)
documents Nub in Workers Builds and a package-based setup for Pages. Nub
participates in the build, while deployed Workers use Cloudflare's runtime.
Cloudflare's current build-image documentation does not list Nub explicitly,
so the preinstallation claim is attributed to Nub, not independently asserted
from Cloudflare's tooling table.

[Cloudflare's Vite plugin](https://developers.cloudflare.com/workers/local-development/vite-plugin/)
runs Worker code in workerd, matching deployment. Nub and Bun cannot be selected
as the deployed Workers JavaScript engine. The local launcher does not change
the site's network latency, prerendered HTML, client bundle or browser animation
cost. Those remain the actual performance work.

The package scripts use Nub for tooling and TypeScript content validation.
`nub exec --no-check` leaves dependency freshness and installation to aube,
which remains the requested package manager. No Nub lockfile or second package
manager is introduced. Vite 8.3.2 and TypeScript 7.0.2 launch successfully via
Nub. The complete check and build must also pass before the change is committed.

For managed builds, pin Nub using the project tool-version file and provision
aube separately. A build environment must install from `aube-lock.yaml`; it
must not fall back to npm and create a second lockfile. Production deployment
and CI account configuration remain outside this design draft.
