---
name: Renke Brixel Portfolio
description: Compact Material 3 Expressive software developer portfolio with sand and warm charcoal themes.
colors:
  primary: oklch(47% 0.075 150)
  on-primary: oklch(99% 0.01 90)
  primary-container: oklch(88% 0.055 140)
  on-primary-container: oklch(28% 0.05 150)
  secondary-container: oklch(87% 0.075 68)
  on-secondary-container: oklch(32% 0.07 45)
  tertiary: oklch(48% 0.13 40)
  tertiary-container: oklch(90% 0.06 50)
  on-tertiary-container: oklch(30% 0.09 38)
  surface: oklch(91.5% 0.038 76)
  on-surface: oklch(26% 0.025 55)
  on-surface-variant: oklch(40% 0.035 60)
  surface-container-low: oklch(97% 0.018 82)
  surface-container: oklch(94.5% 0.028 78)
  surface-container-high: oklch(92% 0.038 75)
  surface-container-highest: oklch(89.5% 0.048 72)
  outline: oklch(58% 0.035 62)
  outline-variant: oklch(84% 0.04 70)
  scrim: oklch(20% 0.02 55 / 0.6)
  primary-dark: oklch(80% 0.08 145)
  on-primary-dark: oklch(26% 0.05 150)
  primary-container-dark: oklch(36% 0.055 150)
  on-primary-container-dark: oklch(90% 0.05 140)
  secondary-container-dark: oklch(38% 0.05 55)
  on-secondary-container-dark: oklch(91% 0.05 72)
  tertiary-dark: oklch(78% 0.1 50)
  tertiary-container-dark: oklch(38% 0.09 40)
  on-tertiary-container-dark: oklch(91% 0.05 55)
  surface-dark: oklch(20% 0.012 60)
  on-surface-dark: oklch(92% 0.02 75)
  on-surface-variant-dark: oklch(80% 0.03 70)
  surface-container-low-dark: oklch(23% 0.014 60)
  surface-container-dark: oklch(25.5% 0.016 60)
  surface-container-high-dark: oklch(29% 0.018 60)
  surface-container-highest-dark: oklch(33% 0.02 60)
  outline-dark: oklch(64% 0.03 65)
  outline-variant-dark: oklch(40% 0.022 60)
  scrim-dark: oklch(10% 0.01 60 / 0.7)
  tab-track: light-dark(var(--md-sys-color-surface-container-low), var(--md-sys-color-surface-container-high))
typography:
  headline-lg:
    fontFamily: "'Roboto Flex Variable', ui-sans-serif, system-ui, sans-serif"
    fontSize: 2rem
    fontWeight: 650
    lineHeight: 2.5rem
    letterSpacing: -0.02em
  headline-md:
    fontFamily: "'Roboto Flex Variable', ui-sans-serif, system-ui, sans-serif"
    fontSize: 1.75rem
    fontWeight: 650
    lineHeight: 2.25rem
    letterSpacing: -0.015em
  title-lg:
    fontFamily: "'Roboto Flex Variable', ui-sans-serif, system-ui, sans-serif"
    fontSize: 1.375rem
    fontWeight: 600
    lineHeight: 1.75rem
    letterSpacing: -0.005em
  title-md:
    fontFamily: "'Roboto Flex Variable', ui-sans-serif, system-ui, sans-serif"
    fontSize: 1rem
    fontWeight: 600
    lineHeight: 1.5rem
    letterSpacing: 0.009em
  body-lg:
    fontFamily: "'Roboto Flex Variable', ui-sans-serif, system-ui, sans-serif"
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5rem
    letterSpacing: 0.005em
  body-md:
    fontFamily: "'Roboto Flex Variable', ui-sans-serif, system-ui, sans-serif"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.25rem
    letterSpacing: 0.012em
  body-sm:
    fontFamily: "'Roboto Flex Variable', ui-sans-serif, system-ui, sans-serif"
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1rem
    letterSpacing: 0.02em
  label-lg:
    fontFamily: "'Roboto Flex Variable', ui-sans-serif, system-ui, sans-serif"
    fontSize: 0.875rem
    fontWeight: 500
    lineHeight: 1.25rem
    letterSpacing: 0.007em
  label-md:
    fontFamily: "'Roboto Flex Variable', ui-sans-serif, system-ui, sans-serif"
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1rem
    letterSpacing: 0.03em
rounded:
  xs: 4px
  sm: 8px
  lg: 16px
  lg-inc: 20px
  xl: 28px
  xl-inc: 32px
  full: 2147483647px
spacing:
  '0.5': 2px
  '1': 4px
  '1.5': 6px
  '2': 8px
  '3': 12px
  '4': 16px
  '5': 20px
  '6': 24px
  '7': 28px
components:
  button-filled:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.on-primary}'
    typography: '{typography.label-lg}'
    rounded: '{rounded.full}'
    padding: 0 20px
    height: 40px
  button-tonal:
    backgroundColor: '{colors.secondary-container}'
    textColor: '{colors.on-secondary-container}'
    typography: '{typography.label-lg}'
    rounded: '{rounded.full}'
    padding: 0 20px
    height: 40px
  button-segment:
    textColor: '{colors.on-surface-variant}'
    typography: '{typography.label-lg}'
    rounded: '{rounded.full}'
    padding: 0 14px
    height: 32px
  button-segment-selected:
    backgroundColor: '{colors.secondary-container}'
    textColor: '{colors.on-secondary-container}'
    typography: '{typography.label-lg}'
    rounded: '{rounded.full}'
    height: 32px
  navigation-track:
    backgroundColor: '{colors.tab-track}'
    rounded: '{rounded.full}'
    padding: '{spacing.1}'
    height: 48px
  strength-chip:
    backgroundColor: '{colors.secondary-container}'
    textColor: '{colors.on-secondary-container}'
    typography: '{typography.label-lg}'
    rounded: '{rounded.sm}'
    padding: 0 12px
    height: 32px
  technology-tag:
    backgroundColor: '{colors.surface-container-highest}'
    textColor: '{colors.on-surface-variant}'
    typography: '{typography.label-md}'
    rounded: '{rounded.xs}'
    padding: 2px 8px
  identity-panel:
    backgroundColor: '{colors.surface-container-low}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.xl-inc}'
    padding: '{spacing.5}'
  project-item:
    backgroundColor: '{colors.surface-container-low}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.xs}'
    padding: 20px
  build-section:
    backgroundColor: '{colors.surface-container-low}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.xl-inc}'
    padding: '{spacing.5}'
  portrait-trigger:
    rounded: '{rounded.full}'
    size: 96px
  portrait-dialog:
    backgroundColor: '{colors.surface-container-high}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.xl}'
    padding: '{spacing.4}'
---

# Design System: Renke Brixel Portfolio

## Overview

**Creative North Star: "Material 3 Expressive portfolio"**

This is a factual documentation label for the owner's chosen Material 3 Expressive direction, not a new approved metaphor. The implemented draft combines warm sand and charcoal surfaces, sage interaction color, caramel selections and copper project categories. Compact identity and project evidence share the first desktop view. Software development is the primary identity; teaching appears in current-employment and career context.

The owner required actual Claude Opus 5.5 for visual decisions. The palette, type, connected lists, controls and portrait treatment documented here come from the current code and the recorded Opus design work in `docs/design-process.md`. The owner selected original photoshoot crops, approved the green keyboard rings, and requested removal of the skip-to-content link. These are existing decisions, not decisions made by this document.

This system describes the private, undeployed draft. Historical career material remains owner-authorized provisional content pending public-release confirmation. The rejected exploration in `.impeccable/directions.json` is not design authority. Qualitative color names and rule names below are descriptive documentation labels; normative primitives are the frontmatter values extracted from `src/styles.css` and implemented components.

**Key Characteristics:**

- Compact software developer identity with visible portrait, location and contact.
- One self-hosted Roboto Flex family, using weight and size for hierarchy.
- Warm tonal surfaces, connected shapes and no box shadows.
- Immediate content changes with independent decorative feedback.
- One sage keyboard ring across native and component interactions.

## Colors

The role palette uses sage for action and keyboard focus, caramel for selected controls, copper for work categories and selection, and a warm sand or charcoal surface ladder. Descriptive names are documentation labels. The frontmatter keeps the source OKLCH strings, including alpha on scrims. Unsuffixed primitives describe light mode; matching `-dark` primitives record the dark overrides. Runtime components use the unsuffixed root CSS variables, whose values change together.

### Primary

- **Sage action:** `primary` and `on-primary` form the Email button and keyboard rings. Primary also colors the developer identity, caret and native accents. Text links use on-surface, with stationary diagonal arrows.
- **Sage tonal:** `primary-container` and `on-primary-container` support the portrait fallback and thinking-level chips.

### Secondary

- **Caramel tonal:** `secondary-container` and `on-secondary-container` fill contact alternatives, strengths, the selected tab indicator and selected language/theme controls.

### Tertiary

- **Copper evidence:** `tertiary` distinguishes selected-project categories. `tertiary-container` and `on-tertiary-container` provide the document selection highlight.

### Neutral

- **Sand / warm charcoal:** `surface` is the document ground and `on-surface` is primary reading text.
- **Warm muted text:** `on-surface-variant` supports descriptions, dates, secondary icons and unselected controls.
- **Tonal containers:** `surface-container-low` carries identity, featured work, career, skills and the build section. `surface-container` is the larger portrait's loading ground. `surface-container-high` carries grouped controls and the dialog. `surface-container-highest` carries technology tags.
- **Divisions:** `outline-variant` is the border and divider role. `outline` is the scrollbar thumb role.
- **Scrim:** `scrim` dims the page behind the photo viewer.
- **Tab track:** `tab-track` resolves to the low container in light mode and the high container in dark mode, preserving separation from the page.

**The Role Pairing Rule.** Pair filled accents and containers with their matching on-color roles. Resolve theme changes through the root Material variables; do not animate color between themes.

## Typography

**Display Font:** No separate display font is used.
**Body Font:** Self-hosted Roboto Flex Variable, with ui-sans-serif, system-ui and sans-serif fallbacks.
**Label Font:** The same family; no separate monospace role.

The font face loads only the Latin weight-axis WOFF2 from `@fontsource-variable/roboto-flex`, covers English and German, uses `font-display: swap`, and is preloaded by the root route. The face supports weights from 100 to 1000; the implemented hierarchy uses regular (400), medium (500), semibold (600) and emphasized (650). Optical sizing is automatic. Body text uses pretty wrapping; headings use balanced wrapping.

### Hierarchy

- **Headline:** The name uses `headline-md` on narrow screens and `headline-lg` from the small breakpoint, with emphasized weight (650). Their sizes, line heights and tracking are normative in frontmatter.
- **Title:** `title-lg` identifies featured projects and section containers. `title-md` serves smaller project titles, group headings and the developer identity. The identity uses medium (500); group headings use semibold (600).
- **Body:** `body-lg` introduces the owner and featured projects; `body-md` carries supporting descriptions and list rows; `body-sm` carries compact project details and teaching technologies. Career roles and build technology names emphasize `body-lg` with medium (500).
- **Label:** `label-lg` serves buttons, tabs, strengths and project categories. `label-md` serves technology tags, table headings and timestamps. Selection can use semibold (600), while passive timestamps inherit regular weight (400).
- **Reading width:** Featured-project summaries stop at 64ch; supporting project details at 72ch; skills and build explanations at 68ch. These are component constraints rather than a page-wide measure.

**The One Family Rule.** Keep headings, body and labels in Roboto Flex. Use the implemented role sizes and separate weight emphasis rather than adding a display face.

## Layout

The main container is centered with a maximum width (1200px), full available width and a minimum document height of one dynamic viewport. Narrow screens stack identity before content. The base page uses horizontal and top padding (16px), a column gap (16px) and bottom padding (64px). Small screens increase horizontal and top padding to (24px).

At the large breakpoint (64rem), the page becomes two columns with a left identity track capped at (23rem), a flexible content track and a gap (24px). At the extra-large breakpoint (80rem), the identity track grows to (25rem). The identity remains aligned to the start of the content column. Its padding steps from (20px) to (24px) to (28px). Reused container padding is (20px), becoming (24px) from small screens.

Related items use compact gaps: connected lists (4px), technology tags (6px), controls and strengths (8px), subsection groups (12px), major panel blocks (16px or 24px). Spacing follows the actual Tailwind quarter-rem rhythm recorded in frontmatter, not an invented new scale.

Work, Career, Skills and Workflow are the section order, with Work initially open. All panels are prerendered and inactive ones are hidden. The URL hash preserves the selected panel across reloads and language navigation. Controls remain inside the identity panel. The new bilingual build explanation ends Workflow; its definition-list rows reuse the career rhythm, using a (7.5rem) topic column from small screens. Skills use an (11rem) heading column from medium screens. More-project cards use two columns from medium screens; interest groups become a three-column connected row.

## Elevation & Depth

The system is flat and uses tonal layering, borders and a translucent scrim. No component applies box shadows. Surface-container-low separates primary content from the document ground; higher containers distinguish small controls, technology tags and the portrait dialog. Supporting project cards, AI starting points and current teaching use opaque surface-container fills, distinct from the page ground and main low-surface panels. Thin outline-variant dividers group career, skills, build rows and table content. A focused stretched project link raises its item above adjacent items so the green outline remains visible; this is stacking, not shadow elevation.

**The Tonal Depth Rule.** Use surface roles and outline-variant divisions for depth. The current portfolio has no box shadows.

## Shapes

Material Expressive shapes distinguish scale and grouping: compact tags use `xs`, strength chips use `sm`, secondary cards use `lg-inc`, the dialog uses `xl`, and identity or section containers use `xl-inc`. Buttons, tab tracks and language/theme groups are fully rounded. `full` records the compiled Tailwind radius, a large value that yields a pill or circle rather than a visible numeric curve.

Connected project and interest lists keep small inner corners and enlarged outside corners. Interest groups change from a vertical joined silhouette to a horizontal one at the medium breakpoint. The portrait uses a twelve-lobe cookie clip path, generated from the same normalized path for all sizes. The photo remains upright as the frame turns one lobe (30 degrees) on a section change.

## Components

### Buttons

Filled contact actions use primary/on-primary; tonal alternatives use secondary-container/on-secondary-container. Buttons use label-large, medium weight, a full shape and a height (40px), with horizontal padding (20px) reduced to (16px) beside an edge icon. Icons default to (18px). Small grouped controls use height (32px), padding (14px), and (16px) icons; icon-only sizes are square.

Hover shows a current-color state layer (8% opacity), keyboard focus a state layer (10%) and the green ring, and pressing scales the control (0.97) with a (10%) state layer. Transform and opacity use separate fast spatial/effects curves over (150ms). Colors do not transition. Disabled controls suppress pointer events and use opacity (40%). The editable button library also defines outlined, text and standard variants; they are not used as contact alternatives in this draft.

### Chips

Strength chips are noninteractive, caramel-toned, medium-weight label-large with `sm` corners, height (32px) and horizontal padding (12px). Technology tags are noninteractive, use the highest surface with muted text, label-medium, `xs` corners and padding (2px 8px). Thinking-level chips use primary-container/on-primary-container, label-medium and height (24px).

### Cards / Containers

Primary containers use the low surface with enlarged corners and padding (20px or 24px). Featured work is a connected list: individual items have small corners, while the first and last items complete the large outer silhouette. Supporting projects use an outline-variant border and `lg-inc` corners.

Project names are semantic links whose hit area stretches across the item. Hover adds an on-surface state layer (6%). The outgoing arrow stays stationary. Keyboard focus draws the shared ring around the whole item. Descriptive text and technologies remain readable during every state.

### Navigation

Tabs form a connected pill track, height (48px), with padding (4px), equal-width triggers and a caramel indicator. The indicator moves over (350ms) with the fast spatial curve after the panel has committed. It does not animate on initial restoration, reload or language navigation. Active tabs use caramel on-container text and semibold weight. Language and theme groups use a high-surface track with padding (4px), gaps (2px) and selected tonal segments. All clickable controls use a pointer cursor.

### Keyboard focus

Every interactive element uses the primary green outline (3px). The default offset is (2px); connected tabs and control segments use an inset offset (-3px), tab panels use (4px), and the portrait trigger uses (8px) to clear the expanded frame. A noninheriting registered CSS property keeps each offset local. Rings appear through `:focus-visible`, retaining the mouse presentation. Stretched project links place their ring on the containing item. The owner explicitly requested removal of the skip-to-content link, and the current draft omits it.

### Portrait and photo viewer

The owner-selected AVIF thumbnail is an ordinary crop from DSC02990.jpg, mirrored to face right. The larger portrait is an ordinary crop from DSC03095.jpg; both retain their original brick backgrounds and have no AI editing. The thumbnail size steps from (96px) to (128px) to (144px).

Hover and keyboard focus expand the scalloped frame to (1.08), while coordinated image scaling keeps the visible photograph fixed: overscan starts at (1.09) and changes to (1.0093) as the frame expands. Rotation and expansion use the spatial curve over (500ms). Hover or focus warms the larger image cache without delaying opening. A sage hint appears inside the lower rim: “click me 😊” or “klick mich 😊”. The photo and hint remain upright. Hover does not rotate the frame; section changes retain the existing one-lobe rotation.

The viewer uses a scrim and a high-surface dialog with extra-large corners. A tonal close button sits on its own top row, receives initial focus and remains distinct from the image. The visible title is omitted; a screen-reader title remains. Radix supplies the focus trap, Escape/outside dismissal and focus return. The image fits both viewport axes with a maximum width (960px), retains its full crop and uses rounded-lg corners. Opening fades over (150ms); closing unmounts immediately.

### Build explanation

The bilingual "How this portfolio is built" section is a low-surface container with a title-large heading, body-medium introduction and divided topic/technology/reason rows. Every named technology links to its documentation in on-surface color, with a stationary diagonal ArrowUpRight and an `xs` focus shape. Employer names and the GitHub-profile footer use the same inline treatment. Project links use on-surface text and arrows while retaining their whole-item hit area. These text links have no underline or arrow movement on hover or keyboard focus. The section describes the actual renderer, editable UI, self-hosted font, AVIF crops, content validation and local tooling. `.tool-versions` provides mise-compatible Node/Nub pins; Nub launches tooling on Node, aube manages packages, and Cloudflare Workers with workerd is a prepared deployment target.

All feedback is decorative. Reduced-motion preferences set transition and animation duration to zero throughout the document; content never depends on finishing an effect. Exact easing and state snippets live in the v2 sidecar because the frontmatter schema has no motion or focus fields. Sidecar tonal ramps are synthesized dark-to-light preview metadata, except the tab-track strip, which uses existing surface ladder values; these strips do not add shipped palette tokens. Component previews embed the actual AVIF media and expand utility styles into local CSS. Navigation and dialog previews show the implemented surfaces and states; runtime selection, image opening and focus trapping remain app behavior.

## Do's and Don'ts

### Do:

- **Do** use the root Material color roles and their matching on-colors in both themes.
- **Do** preserve the compact identity, original portrait crops and software developer emphasis.
- **Do** use large outer corners and small inner corners for connected content groups.
- **Do** show the shared green ring for keyboard focus, including whole-item project links.
- **Do** commit content immediately and keep decorative motion independent of navigation.
- **Do** respect reduced motion and restore the selected section without animation after language navigation or reload.
- **Do** keep implementation explanations grounded in the real stack and describe Cloudflare as the prepared hosting target.

### Don't:

- **Don't** replace owner-approved visual decisions through documentation; further visual refinements belong to actual Claude Opus 5.5.
- **Don't** scale the visible photograph, add circular hover outlines, or restore detached portrait icon badges.
- **Don't** replace the original brick background or AI-edit the owner's portrait.
- **Don't** introduce an oversized hero or another display font into the compact identity.
- **Don't** add shadow elevation where the implemented system uses tonal surfaces.
- **Don't** reintroduce the skip-to-content link removed at the owner's explicit request.
- **Don't** treat provisional career claims or the rejected direction exploration as confirmed public content or design authority.
