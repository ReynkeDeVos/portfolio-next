# portfolio-next

Renke Brixel’s bilingual portfolio, built with TanStack Start, React and Cloudflare Workers.

Live: [portfolio.renkebrixel.workers.dev](https://portfolio.renkebrixel.workers.dev/)

Dependency security is checked weekly for production and monthly for development;
critical development findings are also checked weekly. See
[the automation policy and manual controls](docs/dependency-security.md).

Pull requests must pass the Check workflow: `aubr check`, `aubr build`, then
`aubr test:prerender`, which asserts the built HTML of both Locale pages.
