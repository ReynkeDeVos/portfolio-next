# Lighthouse hints and perceived performance

Checked 2026-10-03. Question: which remaining Lighthouse hints are worth pursuing
when the goal is for the portfolio to feel as fast as possible?

## Recommendation

Investigate first-party JavaScript and the gap between visible content and
working controls. Keep immediate navigation. Exclude extension bytes from site
work. No speed improvement has been measured yet.

| Finding                                            | Decision                                     | Reason                                                                                            |
| -------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| HTML → CSS, reported maximum path 124 ms           | Low priority; measure before changing        | One directly linked stylesheet is expected; the tree does not establish a late-discovery problem. |
| No preconnected origins; no candidates             | Leave alone                                  | The observed startup assets use the document's origin.                                            |
| Extension scripts: 140.1 KiB estimated unused      | Exclude from site work; repeat a clean audit | These URLs belong to installed extensions.                                                        |
| Site entry: 62.6 KiB estimated unused of 160.5 KiB | Worth attribution and profiling              | There may be avoidable startup bytes or work, especially on slower devices.                       |
| Desktop console image: approximately 142.6 KiB     | First controlled optimization experiment     | A real startup download supplies a developer decoration rather than visible page content.         |
| Hydration and first clicks                         | Highest measurement priority                 | Prerendered content can appear before React handlers are ready.                                   |

Evidence and sources for these decisions follow.

## What the supplied report establishes

The owner supplied a successful Lighthouse result and the following excerpts
for `https://portfolio.renkebrixel.workers.dev`:

- Maximum critical-path latency: 124 ms. Document: 14.45 KiB, 124 ms;
  `/assets/styles-C5XLtlec.css`: 9.73 KiB, 122 ms.
- No preconnected origins, and no additional good preconnect candidates.
- Estimated unused JavaScript: approximately 203 KiB. Extension rows total
  342.1 KiB with 140.1 KiB estimated unused; the site entry
  `/assets/index-OGO72cdi.js` is 160.5 KiB with 62.6 KiB estimated unused.

The full report, version, device/throttling settings and metric values were not
supplied. These excerpts cannot establish LCP or click latency. Lab results
also differ from real visits. [Lab and field differences](https://web.dev/articles/lab-and-field-data-differences)

Diagnostics/opportunities do not directly subtract points: metrics determine
the performance score. An excellent score can coexist with useful hints.
Assess timings beyond the score's ceiling. [Lighthouse scoring](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring)

### The network dependency tree

A linked stylesheet depends on HTML discovery. Chrome's insight only fails
when a critical request is not discoverable early; the tree alone does not
establish failure. The reported maximum is already 124 ms: adding the child
122 ms to obtain 246 ms would misinterpret it. [Network dependency insight](https://developer.chrome.com/docs/performance/insights/network-dependency-tree)

Inlining CSS removes a render-blocking request but adds HTML bytes on both
locale pages and loses independent caching. With roughly 10 KiB transferred,
experiment only if traces show a meaningful delay; compare repeat visits.
Critical extraction must retain responsive, theme and restored-hash rules to
avoid visual regressions.
[LCP: render-blocking stylesheet tradeoffs](https://web.dev/articles/optimize-lcp#reduce_or_inline_render-blocking_stylesheets)

### Preconnect

Preconnect prepares another origin's connection; the document connection
already exists for same-origin assets. No candidates means no action.
Outbound GitHub/LinkedIn links are not startup assets. [Resource hints](https://web.dev/learn/performance/resource-hints#preconnect)

### Unused JavaScript

About 69% of the 202.7 KiB rounded estimate belongs to extensions. The site's
62.6 KiB is approximately 39% of its reported transfer size; that does not mean
39% is safely deletable.

The `chrome-extension://` uBlock and React DevTools files are not served by the
portfolio. Chrome explicitly says extensions can interfere with audits and
recommends a clean incognito run. Prefer an extension-free profile, or verify
that no extensions are allowed in incognito. [Chrome's Lighthouse guidance](https://developer.chrome.com/docs/devtools/lighthouse/#handling_report_errors)

Coverage records which functions/blocks execute during the recording; it
continues collecting while you interact. Code unused during initial loading
may be required by theme, language, tabs, keyboard handling, dialogs or error
states. Exercise those paths before proposing removal. Coverage does not prove
dead code. [Coverage recording and interpretation](https://developer.chrome.com/docs/devtools/coverage#record_code_coverage)

Lighthouse applies an estimated compression ratio to unused source ranges.
Savings are neither a guaranteed bundle reduction nor a millisecond prediction.
Attribute ranges with source maps before removing or deferring them.
[Lighthouse audit implementation](https://github.com/GoogleChrome/lighthouse/blob/main/core/audits/byte-efficiency/unused-javascript.js)

## Repository and deployment evidence

The existing [performance plan](performance.md), [Vite configuration](../vite.config.ts)
and [Section tabs](../src/components/section-navigation.tsx) establish a
prerendered portfolio with both locales and mounted section content. The
[router](../src/router.tsx) preloads on render; automatic component splitting is
disabled deliberately to avoid a fresh component download when navigating.
The [root route](../src/routes/__root.tsx) and [head builder](../src/head/head.ts)
link CSS and preload two local WOFF2 fonts. The
[font generator](../scripts/subset-fonts.py) subsets characters and emits
`font-display: swap`.

Browser inspection of the deployed home page during this research found the
same entry and CSS hashes as the owner's report. Resource Timing reported
these resource-body sizes; these are not Lighthouse transfer totals and exclude
any distinction in response-header accounting:

| Deployed resource         | Encoded body bytes | Decoded body bytes |
| ------------------------- | -----------------: | -----------------: |
| `styles-C5XLtlec.css`     |              9,595 |             42,724 |
| `index-OGO72cdi.js`       |            164,237 |            488,117 |
| Roboto Flex subset        |             22,464 |             22,464 |
| Google Sans Flex subset   |             34,664 |             34,664 |
| Animated console greeting |            145,992 |            145,992 |

The observed initial resource set was CSS, entry JavaScript, two fonts, portrait
thumbnail and console greeting, all on the document origin. No Lottie player
or 404 animation data request appeared on the normal route. The
[404 animation](../src/components/not-found-animation.tsx) already imports its
player dynamically and fetches animation data only when mounted. Installed
package size is consequently not evidence of initial-route bytes.

Career selection updated the hash/panel without adding requests; this confirms
behavior, not timed latency. Local artifact hashes differ from deployment, so
source inspection cannot establish deployed module composition. Hidden-preview
paint timings were discarded. No clean audit or CPU/INP benchmark was obtained.

The [client entry](../src/client.tsx) invokes the console greeting before
calling `hydrateRoot`, without awaiting it. The
[greeting code](../src/lib/console-greeting.ts) starts a low-priority fetch,
converts the downloaded image to a base64 data URL, and logs it. Coarse-pointer
devices skip the image; reduced motion selects the small still. This is a
separate approximately 142.6 KiB desktop download, not the 62.6 KiB unused
JavaScript estimate. It does not gate hydration through an `await`, but its
network and processing work are candidates for deferral. Whether they delay
visible content or clicks remains unmeasured. The greeting later switched to a
29,796-byte AVIF animation (about 29.1 KiB); the figures above predate that
change.

## Priorities for a page that feels instant

1. **Measure first meaningful paint and the first working interaction together.**
   Prerendered HTML supports early reading; React hydration attaches interactive
   logic afterward. Record clicks immediately after content appears, including
   before hydration completes, rather than evaluating only settled-page clicks.
   Preserve matching server/client output to avoid visual jumps.
   [React hydration](https://react.dev/reference/react-dom/client/hydrateRoot#hydrating-server-rendered-html)
2. **Prefer immediate results over a smaller file that adds a click-time wait.**
   Keep tabs readable immediately and navigation independent of animation
   completion. Splitting can reduce startup JavaScript but moves module loading
   to later use; preloading changes when that cost is paid. For two shared
   portfolio locales, blanket route splitting may save little. Evaluate rare
   dialog/error features separately. [TanStack code splitting](https://tanstack.com/router/latest/docs/guide/code-splitting),
   [TanStack preloading](https://tanstack.com/router/latest/docs/guide/preloading)
3. **Optimize measured main-thread work.** Less JavaScript is useful, but a byte
   decrease alone does not establish faster interactions. Tasks longer than
   50 ms can block response; defer nonessential work or break up an identified
   long task while keeping visible updates first.
   [Long tasks](https://web.dev/articles/optimize-long-tasks)
4. **Measure animation and portrait readiness separately from INP.** INP covers
   click, tap and key interactions through the next paint; it excludes hover and
   scrolling, and does not measure an entire transition's completion. Profile
   those experiences directly. Prefer transform/opacity where practical and
   inspect dropped frames; avoid speculative `will-change` promotion.
   [INP definition](https://web.dev/articles/inp#whats_in_an_interaction),
   [Animation profiling](https://web.dev/articles/animations-guide)
5. **Treat font changes as visual tradeoffs.** Existing subsets and early
   preloads already address discovery/bytes. Preloads can compete with other
   resources; swapping fonts can shift layout. Compare a system-font or
   one-family variant only if willing to trade the current typography for fewer
   downloads. Check fallback appearance and layout stability rather than
   assuming that another preload will help. [Font best practices](https://web.dev/articles/font-best-practices)

For a more ambitious experiment, retain the prerendered HTML and compare a
tiny browser controller for tabs/theme/dialogs against hydrating the whole
React/Start application. This could reduce runtime delivery and startup work,
but is an architectural hypothesis, not a demonstrated win. It must preserve
keyboard behavior, focus trapping/return, history, hashes, both languages and
pre-paint theme/section restoration. Test a production prototype before paying
for a rewrite. React's documentation establishes what hydration does; it does
not establish this portfolio's hydration cost.
[React hydration](https://react.dev/reference/react-dom/client/hydrateRoot)

## Concrete next experiments

For an isolated Helium run on this machine, the installed binary and these
extension switches were checked. A fresh user-data directory avoids the normal
profile; extension disabling alone does not imply every built-in browser
feature is disabled. [Chromium profile override](https://chromium.googlesource.com/chromium/src/+/main/docs/user_data_dir.md),
[Google's extension-disabling flags](https://github.com/GoogleChrome/chrome-launcher/blob/main/src/flags.ts)

```bash
lighthouse_profile=$(mktemp -d /tmp/helium-lighthouse.XXXXXX)
/usr/bin/helium-browser \
  --user-data-dir="$lighthouse_profile" \
  --disable-extensions \
  --disable-component-extensions-with-background-pages \
  --no-first-run --no-default-browser-check \
  https://portfolio.renkebrixel.workers.dev
```

Keep that window foreground, open DevTools → Lighthouse and audit it. The
temporary directory remains until removed after closing that browser instance.

1. Run five extension-free production Lighthouse navigations per mobile/desktop
   condition, in a foreground tab. Save JSON and trace, browser/audit versions,
   throttling and cache settings; compare medians and spread. Also inspect a
   warm repeat visit. Record FCP, LCP and its actual element/subparts, CLS and
   main-thread blocking. This repeat count is a proposed procedure, not a
   Lighthouse requirement. [Lighthouse variability](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring#why_your_score_fluctuates)
2. Record a production interaction trace under a slower CPU: first tab click
   immediately after paint, rapid tab changes, theme, language, portrait
   open/close and keyboard navigation. Inspect input, processing and presentation
   delay. A navigation-only score cannot establish all of these paths.
   [Optimize INP](https://web.dev/articles/optimize-inp),
   [Lighthouse user flows](https://web.dev/articles/lighthouse-user-flows)
3. Compare the current desktop greeting against a variant that fetches nothing
   during startup, or starts only after startup and an idle opportunity. Measure
   cold-load paint and early clicks as well as bytes. Do not delay hydration to
   preserve the decoration. Mobile coarse-pointer behavior is already different.
4. Generate source maps locally for the matching production revision and combine
   bundle attribution with Coverage collected through all interactions. Identify
   safe removals or rare features to defer. Retest first-click behavior after
   every split; a transferred-byte saving that causes a visible wait fails this
   project's goal. [Coverage](https://developer.chrome.com/docs/devtools/coverage)
5. Try CSS inlining or font alternatives only if traces attribute a meaningful
   delay to them. Retain a change when improvements repeat beyond normal
   variation and the visual/interaction experience holds up. For the strongest
   optimization appetite, compare the tiny-controller prototype under exactly
   the same conditions.

The public good-INP threshold is 200 ms or less at the 75th percentile of field
visits, segmented by device class. That is a useful guardrail, not a claim that
200 ms feels instant or a measured result for this site. Use local interaction
traces for iteration and field observations when available for actual visitor
experience. [INP thresholds and lifecycle](https://web.dev/articles/inp)

For this owner's stronger goal, aim for visible response within 100 ms in the
agreed benchmark conditions, including the first post-paint click. This is a
proposed project aspiration, separate from the official field-INP threshold.
