# portfolio-next

Renke Brixel’s independent software developer portfolio, built with TanStack Start, React, TypeScript 7 and Cloudflare Workers. English is the primary language, with German as an alternative.

## Current stage

The framework setup is verified. The homepage is intentionally empty while the
owner compares three developer-focused visual concepts. Designed pages, theme
and language controls, and animations are not implemented yet.

## Development

Requires Node.js 24 or newer and aube 2.6.1.

```sh
aube install --frozen-lockfile
aube run dev
```

## Verification

```sh
aube run check
aube run build
aube run preview
```

`content:check` validates bilingual content with Zod and Effect outside the browser. Public routes are prerendered. The previous portfolio is an interim content source only; none of its styling or photos are reused.

## Hosting

Cloudflare Workers is the prepared hosting target. The official Cloudflare Vite plugin runs local preview in the Workers runtime. Production deployment requires a Cloudflare account and the owner’s chosen domain.

```sh
aube exec wrangler login
aube run deploy
```

See [performance decisions](docs/performance.md), [content provenance](docs/content-source.md) and [product brief](PRODUCT.md). Visual design is awaiting the owner’s choice among revised developer-focused mockups.

shadcn/ui is configured in `components.json`. Add individual components when the
approved design requires them using `aube dlx shadcn@latest add <component>`.
The generator is run on demand rather than installed permanently.
