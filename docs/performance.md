# Performance plan

## First load

Prerender public portfolio routes at build time and serve their HTML as
Cloudflare static assets. The page puts identity and all four content panels in the HTML. The self-hosted
Latin variable font is preloaded. A 480x480 AVIF supplies the thumbnail; the
720x1080 AVIF loads when the portrait is hovered, focused or opened.

Fingerprint-named assets use a one-year immutable browser cache via
`public/_headers`. The unversioned portrait uses a one-day cache. HTML retains
Cloudflare's revalidation behavior so content updates remain discoverable.
These rules apply to static asset responses, not arbitrary Worker responses.

## Navigation

The initial route set is small. Disable automatic route component splitting so
the primary navigation does not need to download another component on click.
Use local content and render preloading. No exit animation, artificial delay or
remote request may gate portfolio content. Revisit the bundle tradeoff if the
portfolio grows into a large article archive.

## Theme

Apply one synchronous data-theme attribute mutation to the document root. All component colors
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

Nub 0.9.5 runs local TypeScript and tool binaries on pinned Node 24.21.0.
Node type definitions deliberately use major 24 so the compiler does not
assume newer runtime APIs. `nub exec --no-check` avoids Nub dependency
freshness/install behavior because aube owns the installed dependencies.
Cloudflare Workers uses workerd at development preview and deployment, so the
local launcher is not a website runtime-speed improvement. See
[runtime evidence](research-runtime.md).

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
- [Cloudflare static asset headers](https://developers.cloudflare.com/workers/static-assets/headers/)
- [TanStack Router preloading](https://tanstack.com/router/latest/docs/guide/preloading)
- [TypeScript 7 release](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/)
- [Animation rendering and compositor work](https://web.dev/articles/animations-overview)
- [Native scroll-driven animations](https://developer.chrome.com/docs/css-ui/scroll-driven-animations)
- [Current Chromium UI features, including timeline triggers and scoped view transitions](https://developer.chrome.com/blog/new-in-web-ui-io26)

## Language implementation

The locale is represented by prerendered `/` and `/de` routes. TanStack Router
links preserve the selected section in the URL hash. Typed local dictionaries
supply interface labels and bilingual content; Zod validates English and German
content at build time. Native Intl formats dates. There is no separate i18n
runtime or translation fetch, which is sufficient for two curated languages.
Complex plurals, additional locales or a translator platform would justify
revisiting that choice.

The section indicator restores without transitions on initial hydration,
language navigation and hash restoration. Direct user section changes enable
its existing animation. Work is the default; the approved recruiter-oriented
order is Work, Career, Skills, Workflow.

## Rendering model

Both public locale pages are prerendered HTML. Interactive controls hydrate in
React. The app does not opt into React Server Components. TanStack Start now
[documents experimental RSC support](https://tanstack.com/start/latest/docs/framework/react/guide/server-components).
[React explains](https://react.dev/reference/rsc/server-components) that Server
Components can keep their code and dependencies out of the client bundle.
Adoption should be evaluated by measured JavaScript and interaction costs, not
by assuming that a server-component label makes a static portfolio faster.

Production Chromium checks found no horizontal overflow or JavaScript
exceptions at 1440, 1402 and 390px. Sampled text/role pairs reached at least
6.0:1 in light and 6.57:1 in dark. The profile ends within the first mobile
viewport in both languages. Content appears while navigation animations remain
active. Locale and reload restoration have no indicator transitions. Modal
photos fit both viewport axes, with Escape dismissal and trigger focus return.
These local checks are not deployed Core Web Vitals or network benchmarks.

The final keyboard pass exercised 200 focus stops across four sections, two
languages and two themes using native Chromium input. Each stop had a visible
green indicator. Arrow keys and Home/End select tabs; Enter opens the portrait,
Tab and Shift+Tab stay inside the dialog, and Escape closes it and restores
focus. The owner explicitly requested removing the skip-to-content link after
trying the navigation. It is absent from both language routes.
