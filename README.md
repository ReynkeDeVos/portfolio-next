# portfolio-next

My bilingual portfolio, built with TanStack Start, React and Cloudflare Workers.

Live: [portfolio.renkebrixel.workers.dev](https://portfolio.renkebrixel.workers.dev/)

```sh
mise install    # Node LTS
aubr dev        # installs dependencies, starts Vite
```

`aubr build` builds the Worker.
Cloudflare Workers Builds runs `scripts/cloudflare-build.sh` and deploys `main`.
