# portfolio-next

Renke Brixel’s independent software developer portfolio, built with TanStack Start, React, TypeScript 7 and Cloudflare Workers. English is the primary language, with German as an alternative.

## Current stage

The `design/material-expressive` branch contains a reviewable Material 3
Expressive draft designed with Claude Opus 5.5. It presents identity, portrait,
location, technical strengths, contact and selected work in a compact layout.
Work, Career, Skills and Workflow switch immediately. English and German have
prerendered routes, and the theme changes through document-wide color tokens.
The visual draft awaits owner review; production deployment is still open.

## Development

Requires Node.js 24 and aube 2.6.1. The project selects Node.js LTS
in `.tool-versions`, which mise reads with `mise install`. aube owns dependency
installation and the lockfile; package scripts run the installed tools directly.

Vite uses its default local host and port and prints the URL when it starts.

```sh
aube install --frozen-lockfile
aubr dev
```

## Verification

```sh
aubr check
aubr build
aubr preview
```

`content:check` validates bilingual content with Zod outside the browser. Public routes are prerendered. The previous portfolio is an interim career-content source only. The portrait comes from the owner's separately authorized photoshoot.

## Hosting

Cloudflare Workers is the prepared hosting target. The official Cloudflare Vite plugin runs local preview in the Workers runtime. Production deployment requires a Cloudflare account and the owner’s chosen domain.

```sh
aube exec wrangler login
aubr deploy
```

See [performance decisions](docs/performance.md), [content provenance](docs/content-source.md), [design research](docs/research-material-expressive.md) and [product brief](PRODUCT.md).

The draft uses editable shadcn Button, Tabs and Dialog components with Material roles,
Tailwind utilities, native CSS motion, and a self-hosted Roboto Flex font from
`@fontsource-variable`. Static portfolio content needs no network requests or query provider.

Class merging uses the `cn` package from
[shadcn-ui/cn](https://github.com/shadcn-ui/cn). Workflow includes a bilingual
explanation of this portfolio's implementation choices and mise setup.

Keyboard users get green focus indicators throughout. Use Tab and Shift+Tab
to navigate controls, arrow keys or Home/End within the section tabs, and
Escape to close the photo viewer.

Add individual components with `aube dlx shadcn@latest add <component>` when
needed. The generator is run on demand rather than installed permanently.
