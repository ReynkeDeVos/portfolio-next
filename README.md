# portfolio-next

Renke Brixel’s bilingual portfolio, built with TanStack Start, React and Cloudflare Workers.

Live: [portfolio.renkebrixel.workers.dev](https://portfolio.renkebrixel.workers.dev/)

Install Node from `.tool-versions` and uv from `mise.toml` (`mise install`
reads both), then run `aube install` and `aubr dev`. Both `dev` and `build`
generate smaller WOFF2 fonts from the English and German source content.
uv installs the locked FontTools/Brotli dependencies in an isolated, cached
environment; no Python packages need to be installed globally.
See [font generation and verification](docs/fonts.md).

Dependency security is checked weekly for production and monthly for development;
critical development findings are also checked weekly. See
[the automation policy and manual controls](docs/dependency-security.md).

Pull requests must pass the Check workflow: `aubr check`, `aubr build`, then
`aubr test:prerender`, which asserts the built HTML of both Locale pages, and
`aubr test:e2e`, which drives the built site in Chromium with Playwright. Run
`aubr playwright install chromium` once before the first local run.
