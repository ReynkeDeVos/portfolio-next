# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

TanStack Start, React, TypeScript 7, Vite, Zod, shadcn/ui, Tailwind CSS, TanStack Query. Effect was removed from this project at the owner’s request; it remains in the general skills inventory. aube manages packages. Oxlint and Oxfmt use the owner's global configuration as their baseline. Cloudflare Workers is the prepared hosting target. Production credentials and a domain are not configured yet.

## Users

Employers, peers and potential collaborators exploring Renke’s technical skills and software projects.

## Product Purpose

A personal, visually expressive software developer portfolio. Demonstrate technical skills through selected projects without overloading the page. Renke is employed; never frame the portfolio as a job search or claim availability for new jobs.

## Positioning

Renke Brixel is presented first as a software developer. His current role as an instructor belongs in his career history and relevant project context, rather than being the visual focus. His current teaching includes algorithms and data structures with Python, and backend with C# and .NET. Earlier biological research work is provisional content from the old portfolio, pending confirmation.

Renke enjoys trying new technologies, prefers a terminal-first workflow and Arch Linux, and has more than twenty years of Linux experience. He follows AI news daily and evaluates which tools actually help his workflow. A small dated recommendation table is derived from his maintained model guide.

Selected work leads with Reputation Assistant for Caves of Qud, Scoundrel TUI and Omarchy System Stats. Blitzlesen provides an additional web example. Teaching coverage and project experience are distinct; do not imply commercial production experience from curriculum presence alone. Better Auth is upcoming alongside the custom authentication solution.

## Visual Direction

The owner requested Material 3 Expressive after finding the previous mockups too similar to a typical Opus landing page. Use its tonal color roles, intentional shapes, logical grouping and selective motion in a compact personal portfolio. Avoid an oversized hero and the previous display fonts. The first desktop screen must make name, portrait, location, software-development identity, core strengths, current employment context and contact links immediately visible, with project evidence nearby. Prioritize identity, portrait, location and contact on narrow screens, without hiding them behind controls.

Use Tailwind utilities and editable shadcn components first. Small CSS blocks cover design tokens, font declarations, keyframes and native features that are not supported clearly by utilities. Material 3 is visual guidance; no additional Material component framework is required. The `material-3` skill is installed for Codex and exposed to Claude Code.

Use `@fontsource-variable` for self-hosted variable fonts. The draft uses Roboto Flex with only the Latin weight-axis font file required for its English and German content.

## Constraints

- Independent new project; reuse none of the old design. The owner authorized selecting a portrait from `/home/kawa/Pictures/wbs-photoshoot/Renke`.
- Previous portfolio data is provisional content; do not invent professional claims.
- Primary portfolio language is English, switchable to German.
- Code, comments, documentation and project workflows use English.
- Internal clicks should reveal content without deliberate delay.
- First load should feel fast; prerender public content where possible.
- Theme changes apply to the whole document simultaneously.
- Subtle but distinctive animation must not delay navigation or hide readable content.
- Development is the primary identity; teaching is visible in career context.
- The first viewport is concise, uncluttered and contains the information a recruiter needs at first glance.
- Never claim that the owner is looking for a job.
- Avoid em dashes in documentation, comments, issues and project text; deliberate website typography may use them when appropriate.
- Support keyboard navigation and reduced motion. Every interactive element has
  a green keyboard focus indicator without altering the mouse presentation.
- Explain the portfolio's actual technology choices for technical readers and
  mention mise as part of the owner's terminal-based development setup.
- Explain projects in plain language for readers who do not play computer
  games. Omit test details and testing-only badges from project summaries.
- Keep the contact address out of the rendered HTML and decode the owner's
  portfolio email alias only when the email button is activated.
- The owner requested animation recommendations based exclusively on the latest Chrome/Chromium features.
- New GitHub repository remains private initially.

## Open Decisions

- Material 3 Expressive is the requested replacement direction. Claude is responsible for the design, with a reviewable preview on a separate branch.
- A portrait has been selected from the authorized photoshoot directory; final career dates and the updated downloadable CV still need confirmation.
- Domain and production Cloudflare deployment are open.

## Confirmed design preferences

Use Opus 5.5 for all visual design work and refinements. Light mode should feel
warm and sandy, with daisyUI Caramellatte as the main palette reference. Dark
mode should use related warm charcoal, sage and copper roles. Keep controls
inside the identity panel so the top is compact. Use the owner-selected AVIF
portraits and retain the original brick background. Mirror the close-up so the
subject faces right. No visible title is needed in the photo viewer. Photo
scaling, circular outlines and detached icon badges on hover were rejected.
The owner prefers the scalloped frame to expand gently while the photograph
retains its visual scale. Clickable controls use a pointer cursor.

Navigation order is Work, Career, Skills, Workflow, with Work initially open.
Restore the selected tab without motion on language navigation or reload.
Design delegation conveys user requirements without prescribing a visual
solution; Opus chooses the treatment. Nub launches local tooling on pinned
Node, while aube remains the package manager and workerd the deployed runtime.
