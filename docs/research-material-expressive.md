# Material 3 Expressive and dependency research

Checked on 2026-10-01. This is a design and dependency brief, not an assertion that the final interface already implements these recommendations.

## Design direction

Use Material 3 Expressive to make a compact personal portfolio easier to scan. The first desktop viewport must show the owner's name, portrait, Hamburg location, software-development identity, core technical strengths, direct contact links, current role, and a concrete project example. This information hierarchy comes from the user's brief. It does not require a full-screen hero or a company-style landing page.

Material describes Expressive as an evolution of M3 rather than a replacement version. Its published tactics use contrasting shapes, nuanced colors, selective typographic emphasis, logical grouping, adaptable components, and purposeful motion to direct attention. It recommends limiting exceptional focal interactions to one or two. The relevant interpretation here is a memorable portrait and selected-work treatment surrounded by clear, restrained information. [Start building with M3 Expressive](https://m3.material.io/blog/building-with-m3-expressive).

### Practical application to this portfolio

| Area       | Proposed application                                                                                                                                                                                                          | Official basis                                                                                                                  |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Identity   | A compact portrait/identity block with plain role, location, and contact labels. Project evidence sits alongside on wider screens.                                                                                            | Adaptable components and containment in the [Expressive introduction](https://m3.material.io/blog/building-with-m3-expressive). |
| Color      | A personal seed palette with tonal surfaces, a primary contact action, quieter secondary controls, and one tertiary accent for special evidence. Use paired foreground/background tokens in both themes.                      | [Color roles](https://m3.material.io/styles/color/roles).                                                                       |
| Typography | A readable sans serif chosen for this person, moderate headline/title sizes, normal body copy, and selective emphasized labels. Monospace can identify technical metadata without turning the page into a terminal imitation. | [Type scale and tokens](https://m3.material.io/styles/typography/type-scale-tokens).                                            |
| Shapes     | Combine a deliberate portrait crop with simpler project containers and a small connected control group. Avoid applying a decorative silhouette to every object.                                                               | Shape variety and grouping in the [Expressive introduction](https://m3.material.io/blog/building-with-m3-expressive).           |
| Content    | A short technical identity and selected work first. Terminal workflow, Linux history, experimentation, and considered AI use add personality. Teaching appears as experience and evidence of technical breadth.               | Project-specific interpretation of the user's brief.                                                                            |
| Motion     | Small, interruptible feedback after interaction. Keep identity and project information visible from the first paint.                                                                                                          | [Motion physics](https://m3.material.io/styles/motion/overview/how-it-works) and the existing performance brief.                |

These applications are design recommendations, not prescribed Material portfolio layouts. On small screens, preserve the priority of identity, portrait, location, role, and contact rather than shrinking an entire desktop composition. Long German labels must fit naturally. Below-fold supporting detail remains acceptable; required first-glance information must not depend on a carousel, tab change, tooltip, animation, or scrolling.

## Color and type guidance

Material color roles distinguish surfaces from accents and pair each accent/container with an appropriate `on-*` foreground. Surface-container levels support nested hierarchy on larger screens. Keep region roles consistent across breakpoints and test the actual light/dark pairs. For this implementation, map a small selected set of these roles to CSS custom properties instead of adding a runtime palette engine. [Color roles](https://m3.material.io/styles/color/roles).

The current type system has 15 baseline and 15 emphasized styles. The docs explicitly say a product need not use every style and allow replacing the default Roboto typeface. Use emphasized styles for meaningful selection, action, or headline emphasis. A small subset of body, label, title, and headline roles fits this brief. Custom font choice and moderate scale are compatible with Material guidance; enormous display text is unnecessary. [Type scale and tokens](https://m3.material.io/styles/typography/type-scale-tokens).

## Motion and platform status

The current motion system separates spatial springs, which may overshoot, from effects springs for color/opacity, which must not. It offers expressive and standard schemes and fast/default/slow variants. The website identifies web implementations as compatible rather than claiming a ready-made React component runtime. [How motion physics works](https://m3.material.io/styles/motion/overview/how-it-works).

The official web conversion table provides these curve approximations for animations without gestures or interruptions:

| Token                      | CSS approximation                      | Duration |
| -------------------------- | -------------------------------------- | -------- |
| Expressive fast spatial    | `cubic-bezier(0.42, 1.67, 0.21, 0.90)` | 350 ms   |
| Expressive default spatial | `cubic-bezier(0.38, 1.21, 0.22, 1.00)` | 500 ms   |
| Expressive fast effects    | `cubic-bezier(0.31, 0.94, 0.34, 1.00)` | 150 ms   |
| Expressive default effects | `cubic-bezier(0.34, 0.80, 0.34, 1.00)` | 200 ms   |

For simple portfolio feedback, use native CSS or WAAPI on `transform` and `opacity`. The curves describe a visual approximation, not a real spring simulation with equivalent interruption behavior. Prefer the fast variants for small controls. Do not delay routing or conceal new content until an exit animation finishes. Theme changes must update the root color tokens immediately, without cascading per-component color transitions. Respect reduced motion. [Official web motion conversion table](https://m3.material.io/styles/motion/overview/specs).

Published design guidance and implementation maturity are separate. The May 2025 introduction linked alpha Jetpack Compose code. As checked now, Android's release page lists stable Material3 1.4.0 and the 1.5.0-alpha29 line. Some Expressive APIs have graduated from experimental annotations inside the alpha line, while other APIs remain experimental. This does not make the entire Expressive system experimental and does not establish stable web component parity. Android APIs and promotional demonstrations are visual references, not dependencies for this React project. [Compose Material3 release notes](https://developer.android.com/jetpack/androidx/releases/compose-material3).

No MUI or replacement UI framework is needed to apply these styles. Implement chosen color, typography, shape, and motion tokens in the existing React/Tailwind/shadcn setup. That is a project recommendation intended to preserve the current stack and keep runtime scope small.

## e18e direct dependency check

Compared `package.json` against the live `mappings` keys in all three official manifests: 320 native, 153 micro-utility, and 476 preferred mappings. The check was repeated after adding the design dependencies. None of this project's 26 direct runtime/dev dependencies is an exact flagged mapping. `aube`, recorded as the package manager, is also absent. This is a mapping check, not a security audit or proof that a package is optimal for every use. e18e distinguishes native replacements from more opinionated preferred-package alternatives. [Replacement categories](https://github.com/e18e/module-replacements), [native manifest](https://github.com/e18e/module-replacements/blob/main/manifests/native.json), [micro-utilities manifest](https://github.com/e18e/module-replacements/blob/main/manifests/micro-utilities.json), [preferred manifest](https://github.com/e18e/module-replacements/blob/main/manifests/preferred.json).

| Direct package                     | Version range | Exact e18e mapping |
| ---------------------------------- | ------------- | ------------------ |
| `@tanstack/react-query`            | `^5.104.0`    | None               |
| `@tanstack/react-router`           | `^1.170.41`   | None               |
| `@tanstack/react-start`            | `^1.168.60`   | None               |
| `effect`                           | `^4.0.0`      | None               |
| `react`                            | `^19.3.0`     | None               |
| `react-dom`                        | `^19.3.0`     | None               |
| `zod`                              | `^4.6.5`      | None               |
| `@fontsource-variable/roboto-flex` | `^5.3.0`      | None               |
| `class-variance-authority`         | `^0.7.1`      | None               |
| `cn`                               | `^0.4.0`      | None               |
| `lucide-react`                     | `^1.49.0`     | None               |
| `radix-ui`                         | `^1.6.7`      | None               |
| `@cloudflare/vite-plugin`          | `^1.62.3`     | None               |
| `@shadcn/lint`                     | `^0.2.0`      | None               |
| `@tailwindcss/vite`                | `^4.3.3`      | None               |
| `@types/node`                      | `24`          | None               |
| `@types/react`                     | `^19.3.0`     | None               |
| `@types/react-dom`                 | `^19.3.0`     | None               |
| `@vitejs/plugin-react`             | `^6.1.1`      | None               |
| `oxfmt`                            | `^0.71.0`     | None               |
| `oxlint`                           | `^1.86.0`     | None               |
| `oxlint-tsgolint`                  | `^7.0.2003`   | None               |
| `tailwindcss`                      | `^4.3.3`      | None               |
| `typescript`                       | `^7.0.2`      | None               |
| `vite`                             | `^8.3.2`      | None               |
| `wrangler`                         | `^4.145.0`    | None               |

### Applicable decisions

- No direct dependency replacement is required by these mappings. The five design additions supply a self-hosted font, editable shadcn components, class composition and icons. A generic preference list does not justify replacing the requested stack.
- e18e's shared schema-validation page recommends both Valibot and `zod/mini`. This is not a deprecation of Zod. Current validation runs in `scripts/validate-content.ts` during builds, so changing its API would not reduce browser JavaScript. If future client forms need schemas, consider the tree-shakable `zod/mini` subpath first and verify optionality, coercion, object-key stripping, and error behavior. [Schema-validation guidance](https://e18e.dev/docs/replacements/schema-validation).
- For future Better Auth work, `@better-auth/cli` is flagged because its replacement package name is `auth`. The `better-auth` runtime package is not flagged by these manifests. The portfolio itself currently requires no authentication. [Better Auth CLI replacement](https://e18e.dev/docs/replacements/better-auth-cli).
- Avoid adding older utilities for functionality already available in the selected runtime. Evaluate any proposed addition against the exact replacement entry and the actual task, rather than rewriting curriculum history or historical project technology descriptions. [e18e replacement index](https://e18e.dev/docs/replacements/).

## Verification and limits

The Material pages require JavaScript. Their full rendered content was read in the collaborative Chromium browser, including the color-role, typography, and motion conversion tables. e18e's index, migration pages, and upstream JSON manifests were read directly. Sources are current at the check date and may change. Curriculum and GitHub project discovery are separate investigations; this report makes no claim to have checked every teaching repository or transitive package.
