# Performance plan

## First load

Prerender public portfolio routes at build time and serve their HTML as
Cloudflare static assets. The designed page will put important copy in the HTML. Self-host any
selected fonts, preload only the critical face and keep large media out of the
first viewport until real assets exist.

## Navigation

The initial route set is small. Disable automatic route component splitting so
the primary navigation does not need to download another component on click.
Use local content and render preloading. No exit animation, artificial delay or
remote request may gate portfolio content. Revisit the bundle tradeoff if the
portfolio grows into a large article archive.

## Theme

Apply one synchronous class mutation to the document root. All component colors
come from CSS variables. Initialize the choice in the head before first paint.
No color transitions or per-component effects during a theme switch. Stored
preferences must degrade gracefully when storage is blocked.

## Language

English routes and German routes should each be prerendered. A language switch
preserves the current content section and produces a shareable URL. Set correct
document language and alternate-language metadata.

## Motion

Animate one characteristic visual interaction with short, interruptible
transitions. Content starts visible. Reduced motion removes nonessential
movement. Navigation never waits for an animation to finish.

The animation target is the latest stable Chrome/Chromium. Prefer native CSS
transitions/keyframes for simple motion and the Web Animations API when playback
needs cancellation, reversal or orchestration. Keep repeated frame updates on
the compositor where possible by animating transform and opacity. CSS is not
intrinsically faster than WAAPI; the rendering work is the deciding factor.

Use native scroll/view timelines for scroll-linked motion, and timeline triggers
for time-based scroll entry effects. Avoid JavaScript scroll listeners and
per-frame React state for these cases. Use element-scoped view transitions only
when a shared-element change warrants their snapshot work. They are an optional
effect, not the default navigation mechanism. Keep new content immediately
readable, including while an animation runs.

No animation library is needed for the current scope. Avoid blanket layer
promotion with will-change; measure first. Large layers, blur effects, and
animations of layout dimensions need explicit profiling even on current Chrome.

## Dependencies

Node 24 is the development baseline. Node type definitions deliberately use
major 24 so the compiler does not assume newer runtime APIs.

TanStack Query is installed at the owner's request. Static portfolio copy needs
no QueryClient or network requests. Introduce it when there is real server state.
Effect and Zod validate bilingual content in the build workflow and do not
enter the browser bundle. shadcn is configured; add only components the design
actually uses.

## Verification

Measure a production build, not dev-server timings. Check direct requests to
every locale URL, keyboard navigation, narrow layouts, theme persistence,
reduced motion, and response to clicks while animation is active. Target good
Core Web Vitals: LCP <= 2.5 s, INP <= 200 ms and CLS <= 0.1 at the 75th
percentile. These are targets, not measured claims. Cloudflare latency needs
real deployment measurements across the audience's regions.

## Sources

- [Cloudflare TanStack Start integration](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/)
- [TanStack Router preloading](https://tanstack.com/router/latest/docs/guide/preloading)
- [TypeScript 7 release](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/)
- [Animation rendering and compositor work](https://web.dev/articles/animations-overview)
- [Native scroll-driven animations](https://developer.chrome.com/docs/css-ui/scroll-driven-animations)
- [Current Chromium UI features, including timeline triggers and scoped view transitions](https://developer.chrome.com/blog/new-in-web-ui-io26)
