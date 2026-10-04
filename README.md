# portfolio-next

My bilingual portfolio, built with TanStack Start, React and Cloudflare Workers.

Live: [portfolio.renkebrixel.workers.dev](https://portfolio.renkebrixel.workers.dev/)

```sh
mise install    # Node LTS and uv
aubr dev        # installs dependencies first
```

`aubr build` subsets the fonts to the characters the source uses, then builds the Worker.
Cloudflare Workers Builds runs `scripts/cloudflare-build.sh` and deploys `main`.
