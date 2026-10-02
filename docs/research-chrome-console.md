# Colorful text and animation in the Chrome Console

Checked 2026-10-02. Scope: an easter egg printed by the page into the DevTools Console, targeting current desktop Chrome only. Chrome's latest announced Stable release is 154.0.8037.97 on Linux and 154.0.8037.97/.98 on Windows/macOS, with a staged rollout. [Chrome release announcement](https://chromereleases.googleblog.com/2026/10/).

## Recommendation

Use native `console.log()` with `%c` and a short CSS string. Print the animation as a CSS background using an embedded image data URL. GIF works; animated WebP and AVIF are modern alternatives discussed below. No logging package, custom formatter, DOM injection, or JavaScript animation loop is needed. `%c` remains Chrome's documented way to style console output; its age does not make it obsolete. [Chrome's formatting guide](https://developer.chrome.com/docs/devtools/console/format-style).

For this portfolio, use a small, once-per-document browser greeting. Keep any sizeable animation out of the initial application bundle; an explicitly invoked helper can load it on demand. These are implementation recommendations consistent with the project's [performance brief](performance.md), rather than measured performance results.

## Colorful text

```js
console.log(
  '%cHello, curious developer!%c Welcome to my portfolio.',
  'color:#b6f36a;background:#182218;font:600 16px system-ui;padding:6px 10px;border-radius:8px',
  '',
);
```

Each `%c` consumes the next style argument and changes the styling of subsequent text. The empty second style resets the suffix. Self-contained foreground/background colors keep this example readable independently of DevTools' theme. ANSI escape sequences also work, including RGB colors, but CSS is the clearer choice for a browser-only branded greeting with an image. [Chrome's formatting guide](https://developer.chrome.com/docs/devtools/console/format-style).

## Animated GIF

Replace the placeholder with the complete base64 content of a real animated GIF, generated at build time:

```js
const gifDataUrl = 'data:image/gif;base64,REPLACE_WITH_COMPLETE_BASE64';

console.log(
  '%c\u00a0',
  `font-size:0;line-height:0;padding:60px 100px;` +
    `background:url("${gifDataUrl}") center / 200px 120px no-repeat`,
);
```

The nonbreaking space gives Chrome text to style. Zero font size and line height leave padding to form the 200×120px image area. This sizing matters: Chrome sanitizes console CSS instead of accepting arbitrary page CSS. Its accepted property prefixes are `background`, `border`, `color`, `font`, `line`, `margin`, `padding`, and `text`, plus their `-webkit-` forms. Properties such as `width`, `height`, `display`, `animation`, and `transform` are removed. [Chrome 154 CSS sanitizer](https://chromium.googlesource.com/devtools/devtools-frontend/+/66df492aaa0129d090937e933dd44c5389ab24d2/front_end/ui/legacy/components/object_ui/CSSStyleSanitizer.ts).

Chrome itself renders styled console text in an inline-block `span` with paint containment, and applies the sanitized CSS. [Chrome 154 Console renderer](https://chromium.googlesource.com/devtools/devtools-frontend/+/66df492aaa0129d090937e933dd44c5389ab24d2/front_end/panels/console/ConsoleViewMessage.ts).

Only `data:` URLs are allowed in console CSS `url()`. Direct `https://.../hello.gif`, same-origin `/hello.gif`, and `blob:` URLs fail this check. A page can separately fetch a file and convert its bytes to a data URL before logging, but that is an extra page request and conversion, not a bypass of the restriction. The build-time embedding above is simpler for a tiny asset. [Chrome's formatting guide](https://developer.chrome.com/docs/devtools/console/format-style), [Chrome 154 CSS sanitizer](https://chromium.googlesource.com/devtools/devtools-frontend/+/66df492aaa0129d090937e933dd44c5389ab24d2/front_end/ui/legacy/components/object_ui/CSSStyleSanitizer.ts).

Animation uses Chrome's native image playback rather than CSS keyframes or repeated console calls. This conclusion follows from the console's normal CSS background rendering, Chromium's animated-background regression test, and Blink's bitmap frame/loop handling. The GIF's own frames and loop metadata govern playback; console CSS offers no general pause/stop control. This is source-backed analysis, not a visual test performed in DevTools during this research. [Animated background test](https://chromium.googlesource.com/chromium/src/+/154.0.8037.97/third_party/blink/web_tests/images/animated-background-image-crash.html), [Chrome 154 bitmap animation implementation](https://chromium.googlesource.com/chromium/src/+/154.0.8037.97/third_party/blink/renderer/platform/graphics/bitmap_image.cc).

## Modern image formats and video

**Animated AVIF is supported in current Chrome.** Use the same `%c` background technique with a complete `data:image/avif;base64,...` image URL. Google's official examples explicitly render animated AVIF in Chrome; Chrome 154's decoder tests verify multiple frames, timing, and finite/infinite repetition. [Official AVIF animation guide](https://web.dev/articles/avif-updates-2023#animated_avif), [Chrome 154 AVIF tests](https://chromium.googlesource.com/chromium/src/+/154.0.8037.97/third_party/blink/renderer/platform/image-decoders/avif/avif_image_decoder_test.cc).

```js
const avifDataUrl = 'data:image/avif;base64,REPLACE_WITH_COMPLETE_BASE64';
console.log(
  '%c\u00a0',
  `font-size:0;line-height:0;padding:60px 100px;` +
    `background:url("${avifDataUrl}") center / 200px 120px no-repeat`,
);
```

AVIF can store an animated image sequence encoded with AV1. Although AV1 is a video codec and a video can be converted to animated AVIF, Chrome renders this through its image pipeline. It is not an inline video player with audio, seeking controls, or a media stream. Google's codelab demonstrates creating animated AVIF from source media and displaying it as an image. [Serving AVIF images](https://web.dev/codelabs/avif#6).

The console background method is not GIF-specific. The following choices use Chrome's normal image support after passing the same data-URL restriction:

| Content    | Data URL prefix                                      | Console result                           |
| ---------- | ---------------------------------------------------- | ---------------------------------------- |
| GIF        | `data:image/gif;base64,`                             | Animated if the file has multiple frames |
| WebP       | `data:image/webp;base64,`                            | Static or animated according to the file |
| AVIF       | `data:image/avif;base64,`                            | Static or animated according to the file |
| APNG       | `data:image/apng;base64,`                            | Animated PNG image                       |
| PNG / JPEG | `data:image/png;base64,` / `data:image/jpeg;base64,` | Static image                             |
| MP4 / WebM | `data:video/mp4;base64,` / `data:video/webm;base64,` | No inline video playback                 |

The image-format rows follow Chrome's image decoder selection, combined with the Console's CSS background renderer; they were not individually tested in DevTools here. [Chrome 154 image decoder selection](https://chromium.googlesource.com/chromium/src/+/154.0.8037.97/third_party/blink/renderer/platform/image-decoders/image_decoder.cc), [Chrome 154 Console renderer](https://chromium.googlesource.com/devtools/devtools-frontend/+/66df492aaa0129d090937e933dd44c5389ab24d2/front_end/panels/console/ConsoleViewMessage.ts).

**Direct MP4/WebM playback is not supported by this console method.** Allowing a `data:` URL does not make its contents a supported CSS image. Logging an `HTMLVideoElement` displays an inspectable DOM representation, not a player. Custom formatters cannot add a `<video>` player either: their tag allowlist excludes `video` and `source`. Convert a silent clip into an animated image for console decoration, or link to an actual video in the page. [Chrome's DOM-element formatting](https://developer.chrome.com/docs/devtools/console/format-style), [Chrome 154 custom preview implementation](https://chromium.googlesource.com/devtools/devtools-frontend/+/66df492aaa0129d090937e933dd44c5389ab24d2/front_end/ui/legacy/components/object_ui/CustomPreviewComponent.ts).

If “GIF” means a short looping animation rather than requiring the GIF file format, consider animated WebP with the same method and `data:image/webp;base64,...`. Chrome supports animated WebP. It can offer smaller files, full color, and better transparency. It is not universally faster: Google's comparison also records higher CPU usage for straight-line decoding, with benefits when seeking. Those numerical benchmarks date to 2013, so they do not establish current Chrome 154 timings. Compare the actual exports and only benchmark decoding if the asset is large enough to matter. [Google's WebP FAQ](https://developers.google.com/speed/webp/faq#why_should_i_use_animated_webp).

For a Chrome-only animation, include AVIF among the candidate exports rather than choosing GIF automatically. Google's published AVIF animation comparison shows substantial file-size savings, but that 2023 sample does not establish a universal current decoding winner. Compare the actual AVIF, WebP, and GIF at acceptable visual quality; file size, decoding cost, and memory are separate criteria. No AVIF-versus-WebP runtime benchmark was performed here. [Official AVIF animation comparison](https://web.dev/articles/avif-updates-2023#animated_avif).

## Performance

Your assumption is reasonable for a single small text greeting: its cost is expected to be negligible in practice. This is an engineering judgment, not a measured result. The animation is the part worth controlling:

- **Transfer and parsing:** embedding an image in initial JavaScript makes every visitor download it, including visitors who never open DevTools. Base64 produces four characters per three source bytes, approximately 33% expansion before HTTP compression. That is not a claim of 33% larger compressed transfer. [RFC 4648, base64 encoding](https://datatracker.ietf.org/doc/html/rfc4648#section-4).
- **Retention:** a closed Console is not a zero-cost gate. The Console standard recommends buffering messages when it is not open, and V8 stores console arguments in bounded message storage. Avoid logging large objects just to render decoration. [Console standard](https://console.spec.whatwg.org/#printer), [V8 console storage](https://chromium.googlesource.com/v8/v8/+/refs/heads/main/src/inspector/v8-console-message.cc).
- **Playback:** visible animated images require frame decoding and rendering. Smaller intrinsic dimensions, fewer frames, and limited repetition reduce the amount of potential work; displaying a large image at a smaller CSS size does not remove its source-image decoding costs. [Blink bitmap animation implementation](https://chromium.googlesource.com/chromium/src/+/154.0.8037.97/third_party/blink/renderer/platform/graphics/bitmap_image.cc). This is a qualitative inference, not a CPU or memory benchmark.

Prefer two native log calls over adding a library. Log once in browser startup, rather than during component rendering or every navigation. Do not simulate animation with timers, repeated logging, or `console.clear()`, which would add work and remove useful diagnostics. Respect the site's reduced-motion preference by omitting the animated entry or selecting a static alternative before logging; console CSS cannot carry the page's stylesheet/media-query rules. These are recommendations, not requirements imposed by Chrome.

For a tiny decorative asset, build-time embedding is the simplest implementation. For a large one, an explicit helper that fetches/converts/logs only when invoked protects normal page loading. Merely fetching after page load still transfers the image to everyone; it is not the same as loading on demand.

## Choosing for recent phones and weaker computers

With the same nominal **100 Mbit/s** connection, the transfer arithmetic is the same: a decimal 200 kB file takes about **16 ms**, and 1 MB takes about **80 ms** at full throughput. These are ideal payload-only calculations (`bytes × 8 / bits-per-second`), excluding latency, connection setup, protocol overhead, contention, and base64 expansion. Downloading once and decoding/rendering repeatedly are different costs. A looping animation may finish downloading quickly and continue consuming CPU and battery for minutes. Cached image frames can avoid some subsequent decoding, at the cost of memory; frame presentation still has work to do. [Blink bitmap animation and frame caching](https://chromium.googlesource.com/chromium/src/+/154.0.8037.97/third_party/blink/renderer/platform/graphics/bitmap_image.cc).

For the user's roughly three-year-old smartphone/iPad versus a weak Chromebook or 2015 MacBook, the conservative recommendations are:

| Where / content                                      | Practical starting choice                                                                                                                                    |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Console easter egg, on any of these devices          | A small animated WebP, modest intrinsic dimensions and frame rate; compare AVIF on the weakest target before switching. Native `%c` remains the method.      |
| An opaque real clip displayed in the page            | A real `<video>` with an H.264 MP4 baseline choice, modest dimensions/frame rate, and a static poster. Use `muted loop playsinline` for a silent decoration. |
| Optional newer video encoding                        | Offer AV1 only after checking the actual video's configuration for `supported`, `smooth`, and `powerEfficient`; retain H.264 fallback.                       |
| Reduced motion or decoration with no useful movement | A static image.                                                                                                                                              |

This is a compatibility/performance starting policy, not a measured ranking or an assertion that WebP always uses less CPU. Video is the appropriate route for clips on the page; Google's official guide demonstrates replacing GIFs with H.264 MP4 and a `<video>` element. It remains unavailable as an inline Console player. [Replace GIFs with video](https://web.dev/articles/replace-gifs-with-videos).

**Do not assume hardware AV1 video decoding also accelerates animated AVIF images.** In the inspected Chrome 154 image path, Blink creates a `crabbyavif` decoder and explicitly configures its `dav1d` decoding threads. That is the software image-decoding route, distinct from choosing a platform video decoder. Older documentation describes libavif; the pinned current source uses crabbyavif. [Chrome 154 AVIF decoder](https://chromium.googlesource.com/chromium/src/+/154.0.8037.97/third_party/blink/renderer/platform/image-decoders/avif/avif_image_decoder.cc), [Chrome 154 image decoder selection](https://chromium.googlesource.com/chromium/src/+/154.0.8037.97/third_party/blink/renderer/platform/image-decoders/image_decoder.cc).

`navigator.mediaCapabilities.decodingInfo()` queries **audio/video**, using the exact codec/profile, width, height, bitrate, and frame rate. Its `smooth` and `powerEfficient` results are predictions for that configuration; they are not measurements or promises. They do not predict the cost of a CSS-background AVIF/WebP animation. Avoid selecting codecs by device age, marketing category, or user-agent sniffing: those labels do not identify the actual chip, decoder, software, or current workload. [Media Capabilities specification](https://www.w3.org/TR/media-capabilities/).

At 30 fps, successive frames are about **33.3 ms** apart; at 60 fps, **16.7 ms** apart. These arithmetic intervals illustrate why frame rate and decoding work matter even on a fast connection; they are not measured decoder timings. Start a tiny decoration at a lower frame rate if it still looks right, and compare dropped frames, CPU, and energy on the weakest real target. Exact device models and the selected asset would be needed for a firm winner. No device or energy benchmark was performed in this research.

## Why not custom formatters?

Chrome custom object formatters require the viewer's DevTools setting to be enabled and default to disabled. They are useful for structured debugging values, but add setup for a public greeting. [Chrome 154 SDK settings](https://chromium.googlesource.com/devtools/devtools-frontend/+/66df492aaa0129d090937e933dd44c5389ab24d2/front_end/core/sdk/SDKSettings.ts).

They also use restricted JSONML: allowed tags are `span`, `div`, `ol`, `li`, `table`, `tr`, and `td`; `img` is absent. Only style attributes are applied, through the same CSS sanitizer. They do not offer an unrestricted HTML/image rendering API. [Chrome 154 custom preview implementation](https://chromium.googlesource.com/devtools/devtools-frontend/+/66df492aaa0129d090937e933dd44c5389ab24d2/front_end/ui/legacy/components/object_ui/CustomPreviewComponent.ts).

## Verification and limits

Read Chrome's official documentation and the DevTools files pinned by Chromium 154.0.8037.97, rather than relying solely on development-head source. That release's `DEPS` names DevTools revision `66df492aaa0129d090937e933dd44c5389ab24d2`. [Chrome 154 dependency pin](https://chromium.googlesource.com/chromium/src/+/154.0.8037.97/DEPS).

No application code changed, no image asset was selected, and no runtime benchmark or actual DevTools visual test was performed. The snippets are implementation examples and need real assets. Before shipping, verify the selected image animates in Stable Chrome's Console, its complete file size, the production bundle impact, reduced motion, and that the greeting appears once per document.
