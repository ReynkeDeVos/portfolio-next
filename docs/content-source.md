# Content sources

The owner's use of mise is a self-reported workflow fact. This project's
`.tool-versions` file is read by mise and selects Node LTS. Portfolio
implementation details come from the actual source and manifest, not a general
list of familiar technologies. The owner reports that the site is deployed on
Cloudflare Workers (2026-10-01).

Source: the previous portfolio at `/home/kawa/Projects/Portfolio/src/data/index.ts`
and its contact components, inspected on 2026-10-01.

The old site supplies provisional career stations and contact details. Its
design and components are not reused. The owner supplied the current focus on
software development, experimentation, terminal workflows, Arch Linux, more than 20 years with Linux as the main
operating system, and practical daily evaluation of AI tools.

## Verified project evidence

Public GitHub source, manifests and attribution were inspected for selected
work. The owner selected Reputation Assistant, Scoundrel TUI and PokémonBattle
as the main examples, in that order. Elder Gym Bro App and Omarchy System Stats
appear below, left to right on wider screens. Name Shuffler CLI and the unfinished
Blitzlesen are not displayed. PokémonBattle retains its fork attribution and
Elder Gym Bro its team credits; the portfolio does not claim independent
ownership of either codebase. The owner confirmed on 2026-10-01 that they built
PokémonBattle with Sebastian and Clara during the bootcamp, and that Elder Gym
Bro was the bootcamp final project with a different team. See [repository evidence](research-selected-work.md)
for pinned source revisions and limits. No usage or impact metrics are invented.

`portfolio.selectedWork` in `src/content/portfolio.ts` owns this selection.
Its ordered `featured` and `supporting` ID lists decide what appears and in
which order; catalog order and catalog records that no list names have no
effect on the page. Change the selection there, not in components.

## Technical breadth

The curriculum and lecture repositories supplied the technology inventory.
See [technical profile evidence](research-technical-profile.md). Teaching a
technology does not establish commercial production experience with it.
At the owner’s request, Better Auth is included alongside custom authentication
in the skills and teaching inventory. The owner says the teaching addition
will take effect within days. The owner also requested Claude Agent SDK
under AI integration and automation, without a separate coming-soon entry.
The Anthropic client SDK is listed separately from the Agent SDK.

The owner teaches both WBS tracks: `sd-curriculum` (web development) and
`se-curriculum` (software engineering). The teaching list was re-checked
against both, and the lecture tree, after pulling on 2026-10-01. SD adds
backend JavaScript and TypeScript with Node's HTTP module, Express, MongoDB,
Zod and Swagger; JWT, cookie and bcrypt authentication; OpenAI, Anthropic and
Google Gen AI SDKs, local models, MCP; and AI-assisted coding with GitHub
Copilot, OpenSpec and n8n. SE's .NET modules use SQL Server and SQLite with
Scalar and Serilog; PostgreSQL is only named there as a supported EF Core
provider, so it stays with the Python and Flask module. Podman does not appear
in any teaching material and is listed under skills only. Claude Agent SDK and Matt Pocock's agent skills (such as
`/wayfinder`) are listed at the owner's request.

The owner reports regular deployments to Cloudflare, Render, Vercel and Railway
and use of Docker and Podman. Fallow appears in the general code-quality
toolkit, supported by the lecture inventory; this portfolio does not claim to
run Fallow in its build.

The short career descriptions condense the old portfolio’s experience
bullets in the same file into first-person sentences, at the owner’s request
on 2026-10-01; no new claims were added.

Employer links come from the old portfolio’s `src/data/index.ts`, including
the specific LIV research-unit and UKE institute pages.

Institution names follow the selected language: [Leibniz-Institut für Virologie](https://www.leibniz-liv.de/)
and [Universitätsklinikum Hamburg-Eppendorf](https://www.uke.de/allgemein/ueber-uns/das-uke/index.html)
use their official German names. WBS Coding School, Closelink and University
of Utah School of Medicine retain their names in both languages. The official
agent library name is [Claude Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview).

The small dated model recommendation list follows the owner's maintained
model guide, checked on 2026-10-01, with the owner’s current preference for
Opus 5.5 for design. Thinking levels are practical starting
settings rather than rankings or guarantees. The portfolio does not publish
the local guide or duplicate its source transcript archive.

## Portrait

The owner selected DSC02990.jpg for the close-up and DSC03095.jpg for the
larger viewer. Conventional cropping retains the brick background. The close-up
is 480x480 and horizontally mirrored at the owner's request, so Renke faces
right. The larger portrait is 720x1080. Both use AVIF quality 65, with original
metadata removed. No AI image editing or retouching was used. Provenance
sidecars record the source filenames, crop coordinates and conversion settings.

The owner confirmed participation in the Claude Code for Business course as
preparation for the company's business partner program. This does not claim
certification or approved partner status.

Career periods and older project descriptions remain provisional. Education
details, individual contributions to collaborative forks, and an updated
downloadable CV still need confirmation. The owner is employed. No job-search
or availability claim is added. Private repository content is not published.

English is primary. Every public content item must have an English and German
version. Code, comments, README files, issues and documentation use English.
Avoid em dashes outside deliberate typography in the website design.

## Project copy and contact

The owner requested project descriptions that require no gaming knowledge and
omit test details. Testing remains part of the skills and teaching inventory;
project summaries and badges focus on the application itself. Game and team
attribution remains factual.

The contact button uses the owner's Gmail portfolio alias. The browser decodes
the encoded address only when the button is activated and opens the mail
application. The prerendered HTML has no email address, mailto link or address
tooltip. This deters plain-text address harvesters, not bots that execute or
analyze JavaScript. The build validator checks the decoded address.

The portfolio-build section links each named technology to its official
documentation or repository. It reuses the existing inline link treatment and
green keyboard focus indicator.

At the owner's request, the profile chips stay short and list C#/.NET and
Python separately. The Skills section's language description says where each
is used: React and TypeScript for frontends, both TypeScript on Node.js and C#
on .NET for backends, and Python for algorithms and data structures. The owner
added ultrarunning as a
personal profile highlight. It is not a
software skill, and the chip group’s accessible label reflects the mixed
profile highlights. The portfolio-build section addresses a
technical lead, such as the head of a software team. It names and links the technologies used,
with one short reason per group for the less obvious ones. React, TypeScript,
Tailwind and the fonts are not explained. Radix and class-variance-authority
are not listed because they come with shadcn/ui. The aube description follows its
[guide](https://aube.sh/guide.html), checked on 2026-10-01: made by jdx, the
developer of mise; it reads and writes pnpm, npm, Yarn and Bun lockfiles in
place; it checks publishing evidence, release age and known malicious packages
when selecting versions ([aube.sh](https://aube.sh/)). No benchmark figure is
quoted.

Other build-section facts were checked on 2026-10-01:
TypeScript 7 is the [10x faster Go port](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/)
of the compiler. Oxlint and Oxfmt belong to [Oxc](https://oxc.rs/docs/guide/introduction),
developed by VoidZero, which maintains Vite. Cloudflare is an
[official TanStack Start hosting partner](https://tanstack.com/blog/cloudflare-partnership)
and [acquired VoidZero](https://voidzero.dev/posts/whats-new-jun-2026) in 2026.
The AVIF comparison with WebP is a general format property, not a measurement
of these portraits. At the owner’s request, Effect was removed from the dependency
list and build validator. The owner still lists it in the general skills
inventory; the portfolio does not describe it as part of its implementation.
