# portfolio-next

My bilingual portfolio, built with TanStack Start, React and Cloudflare Workers.

Live: [portfolio.renkebrixel.workers.dev](https://portfolio.renkebrixel.workers.dev/)

```sh
mise i       # Node LTS
aubr dev     # installs dependencies, starts Vite
aubr build   # builds the Worker
```

Cloudflare Workers Builds installs with pnpm from `pnpm-lock.yaml`, runs `pnpm run build` and deploys `main`.
