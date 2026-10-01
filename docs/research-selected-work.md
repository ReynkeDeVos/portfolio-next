# Selected work research

Reviewed 1 October 2026 using authenticated GitHub metadata and shallow read-only checkouts of public repositories. The inventory contains 40 repositories: 24 public repositories, including eight forks. Private repositories were excluded from source inspection and public portfolio evidence. Nine public candidates were source-inspected; the remaining public repositories were screened by repository identity, fork status and metadata.

## Recommended selection

Use the first three as the core selection. Add Blitzlesen if a fourth piece helps demonstrate React interaction work. These projects show different kinds of software development without making teaching the homepage identity.

| Priority    | Portfolio title                       | Concise description                                                                                                | Verified stack                                                                                     | Why select it                                                                                         |
| ----------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| 1           | Reputation Assistant for Caves of Qud | A game mod that brings faction priorities, reputation targets and projected outcomes into creature inspection.     | C#, HarmonyLib, the Caves of Qud mod API, XML options; .NET 10 and xUnit for isolated helper tests | The strongest distinctive piece: game integration, parsing, domain logic, configurable UX and tests.  |
| 2           | Scoundrel TUI                         | A keyboard-driven terminal adaptation of the Scoundrel card game, with illustrated cards and separated game rules. | Python 3.14, Textual, Rich, Pillow, textual-image, uv, pytest                                      | Direct evidence of terminal workflow, Python engineering and interaction design.                      |
| 3           | Omarchy System Stats                  | A Linux desktop plugin with shared CPU, RAM and GPU sampling, a native collector and a supervised service.         | QML, Quickshell, C, Linux procfs/sysfs/DRM interfaces                                              | Demonstrates Linux systems work, bounded resource use, device identity and explicit failure handling. |
| 4, optional | Blitzlesen                            | A German reading game with falling words, three difficulty levels, sound feedback and scoring.                     | React, JavaScript, Vite, Tailwind CSS, Framer Motion, canvas-confetti, Web Audio                   | Adds a compact browser interaction example without repeating a generic web app template.              |

These are historical project stacks. Do not replace technology names in case-study descriptions to make them appear newer. Apply current dependency replacement decisions to the new portfolio implementation instead.

## 1. Reputation Assistant

Suggested card copy: **See faction consequences before making a move.** A Caves of Qud mod that adds configurable priorities, reputation targets and Water Ritual or kill projections to creature inspection.

Source evidence:

- The Harmony postfix hooks `Description.GetLongDescription`, reads creature reputation relationships, sorts factions by importance and appends the tracker. [Harmony integration](https://github.com/ReynkeDeVos/CoQ_MOD_ReputationAssistant/blob/509989e53a17cf1c00fe6775edc71accb76209b8/ReputationAssistant/Scripts/ReputationAssistantPatch.cs)
- Faction resolution handles display-name aliases, markup, Unicode apostrophes and procedural factions. Repeated faction relationships are merged by internal identifier. [faction resolution](https://github.com/ReynkeDeVos/CoQ_MOD_ReputationAssistant/blob/509989e53a17cf1c00fe6775edc71accb76209b8/ReputationAssistant/Scripts/FactionResolver.cs) [relationship aggregation](https://github.com/ReynkeDeVos/CoQ_MOD_ReputationAssistant/blob/509989e53a17cf1c00fe6775edc71accb76209b8/ReputationAssistant/Scripts/FactionEntryAggregator.cs)
- The README documents in-game options, priority overrides, target sliders, compact mode and installation. It links an existing Steam Workshop listing. [project README](https://github.com/ReynkeDeVos/CoQ_MOD_ReputationAssistant/blob/509989e53a17cf1c00fe6775edc71accb76209b8/README.md)
- The isolated parser, renderer and aggregation test project targets `net10.0` and uses xUnit. This does not establish the game runtime as .NET 10. [test project](https://github.com/ReynkeDeVos/CoQ_MOD_ReputationAssistant/blob/509989e53a17cf1c00fe6775edc71accb76209b8/tests/ReputationAssistant.Tests/ReputationAssistant.Tests.csproj)

Attribution: this is a public non-fork repository. The manifest names Kawa as author, and source headers also credit Kawa. Strategic defaults derive from A-F-F-I-N-E's qudzoo reputation guide; the project should not imply those strategy recommendations were independently invented. [mod manifest](https://github.com/ReynkeDeVos/CoQ_MOD_ReputationAssistant/blob/509989e53a17cf1c00fe6775edc71accb76209b8/ReputationAssistant/manifest.json) [project README](https://github.com/ReynkeDeVos/CoQ_MOD_ReputationAssistant/blob/509989e53a17cf1c00fe6775edc71accb76209b8/README.md)

Public links: [repository](https://github.com/ReynkeDeVos/CoQ_MOD_ReputationAssistant), [Steam Workshop listing linked by the project](https://steamcommunity.com/sharedfiles/filedetails/?id=3664930126).

Existing showcase assets: `promo/assets/screenshot_v1.2.png`, `screenshot_v1.2_compact.png`, `screenshot_menu_v1.2.png`. Their filenames identify the illustrated version; the current manifest is 1.5, so do not label these screenshots as a fresh capture of the latest version.

## 2. Scoundrel TUI

Suggested card copy: **A roguelike card game, in the terminal.** Python game rules meet a keyboard-driven Textual interface and terminal image rendering.

Source evidence:

- The game module implements deck generation, room transitions, weapon restrictions, healing, avoidance and scoring separately from the Textual UI. [game rules](https://github.com/ReynkeDeVos/Scoundrel-TUI/blob/4adeb045e53cbd00991a953fe7ffeb406acd031b/src/scoundrel_tui/game.py)
- The UI defines key bindings and the artwork module supports TGP, Sixel and half-cell renderers, including cached image fitting. [terminal UI](https://github.com/ReynkeDeVos/Scoundrel-TUI/blob/4adeb045e53cbd00991a953fe7ffeb406acd031b/src/scoundrel_tui/tui.py) [image renderers](https://github.com/ReynkeDeVos/Scoundrel-TUI/blob/4adeb045e53cbd00991a953fe7ffeb406acd031b/src/scoundrel_tui/artwork.py)
- The manifest declares Python 3.14 and the dependencies above, with pytest in the development group. Tests cover rules, visual dimensions, confirmations and image assets. [Python manifest](https://github.com/ReynkeDeVos/Scoundrel-TUI/blob/4adeb045e53cbd00991a953fe7ffeb406acd031b/pyproject.toml) [tests](https://github.com/ReynkeDeVos/Scoundrel-TUI/blob/4adeb045e53cbd00991a953fe7ffeb406acd031b/tests/test_rules.py)

Attribution: the manifest names Renke Brixel. The original Scoundrel game is by Zach Gage and Kurt Bieg, not this repository's author. The README credits The Battle for Wesnoth artwork and named artists. Asset filenames also include generated-image names, so do not make an unverified blanket claim that every bundled image comes from Wesnoth. Preserve the project's game and art attribution when using its existing demo. [project README](https://github.com/ReynkeDeVos/Scoundrel-TUI/blob/4adeb045e53cbd00991a953fe7ffeb406acd031b/README.md)

Public link: [repository](https://github.com/ReynkeDeVos/Scoundrel-TUI). Existing showcase asset: `demo/scoundrel-demo.avif`.

## 3. Omarchy System Stats

Suggested card copy: **Desktop metrics with one shared sampler.** A QML plugin backed by a native C collector, with stable GPU selection and explicit unavailable states.

Source evidence:

- The manifest registers a kept-loaded service and a bar widget. The service owns collector lifecycle, protocol validation, pending commands, freshness state and restart backoff. [plugin manifest](https://github.com/ReynkeDeVos/omarchy-plugin-system-stats/blob/47de75cf1c9867368d28df2cddcffd17e91f1b75/manifest.json) [shared service](https://github.com/ReynkeDeVos/omarchy-plugin-system-stats/blob/47de75cf1c9867368d28df2cddcffd17e91f1b75/Service.qml)
- The native helper samples CPU counters and available-memory data, and integrates GPU inventory and measurement modules. It does not create another sampler for every screen. [native helper](https://github.com/ReynkeDeVos/omarchy-plugin-system-stats/blob/47de75cf1c9867368d28df2cddcffd17e91f1b75/src/system-stats-helper.c) [project README](https://github.com/ReynkeDeVos/omarchy-plugin-system-stats/blob/47de75cf1c9867368d28df2cddcffd17e91f1b75/README.md)
- GPU paths include vendor-specific interfaces with visibility and permission checks. The repository separates fixture-tested support from real-hardware confirmation. [GPU measurement](https://github.com/ReynkeDeVos/omarchy-plugin-system-stats/blob/47de75cf1c9867368d28df2cddcffd17e91f1b75/src/gpu-measurement.c) [project README](https://github.com/ReynkeDeVos/omarchy-plugin-system-stats/blob/47de75cf1c9867368d28df2cddcffd17e91f1b75/README.md)
- A public local i915 report records a permission-denied outcome and explicitly says it does not grant hardware-confirmed evidence. Do not claim all GPU paths work on all hardware. [i915 report](https://github.com/ReynkeDeVos/omarchy-plugin-system-stats/blob/47de75cf1c9867368d28df2cddcffd17e91f1b75/docs/hardware/intel-i915-comparison.md)

Attribution: a public non-fork repository; the manifest credits Reynke De Vos and the license is MIT. It is an Omarchy plugin, not authorship of Omarchy or Quickshell. [plugin manifest](https://github.com/ReynkeDeVos/omarchy-plugin-system-stats/blob/47de75cf1c9867368d28df2cddcffd17e91f1b75/manifest.json)

Public link: [repository](https://github.com/ReynkeDeVos/omarchy-plugin-system-stats). Prefer a crop of the actual widget or detail panel over a decorative fake terminal.

## 4. Blitzlesen

Suggested card copy: **Fast word recognition through play.** A small React reading game with timed choices, adjustable difficulty and audio feedback.

Source evidence: `App.jsx` renders `BlitzlesenGame`; that component implements difficulty settings, countdown, word spawning, score and feedback. The sound manager uses browser audio APIs. The package manifest confirms the historical stack. [application entry](https://github.com/ReynkeDeVos/blitzlesen-app/blob/0328951ce94013ac518d5890844afb0b5fd37420/src/App.jsx) [game implementation](https://github.com/ReynkeDeVos/blitzlesen-app/blob/0328951ce94013ac518d5890844afb0b5fd37420/src/components/BlitzlesenGame.jsx) [sound manager](https://github.com/ReynkeDeVos/blitzlesen-app/blob/0328951ce94013ac518d5890844afb0b5fd37420/src/utils/SoundManager.js) [package manifest](https://github.com/ReynkeDeVos/blitzlesen-app/blob/0328951ce94013ac518d5890844afb0b5fd37420/package.json)

Attribution: public non-fork repository. No sole-authorship or real-world learning-outcome claim is established by the code or README. Describe the implemented game rather than asserting educational effectiveness. The README links a demo, but live availability was not checked. [project README](https://github.com/ReynkeDeVos/blitzlesen-app/blob/0328951ce94013ac518d5890844afb0b5fd37420/README.md)

Public links: [repository](https://github.com/ReynkeDeVos/blitzlesen-app), [demo linked by its README](https://blitzlesen.netlify.app/).

## Other inspected candidates

| Candidate              | Verified scope                                                                                                                | Recommendation and attribution                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Elder Gym Bro App      | React/Tailwind frontend; Node.js/Express backend, MongoDB/Mongoose, custom authentication, workout progress and user profiles | Useful secondary full-stack example. A fork of `MichalWollny/ElderGymBroApp`; the README explicitly credits Michal, Sebastian, Alex and Renke. Say **team project**. Confirm Renke's specific contribution before using first-person ownership of individual features. [team credits](https://github.com/ReynkeDeVos/ElderGymBroApp/blob/d1f89d76e35022842ac6f54f023d45ddc0ff48c5/README.md) [backend manifest](https://github.com/ReynkeDeVos/ElderGymBroApp/blob/d1f89d76e35022842ac6f54f023d45ddc0ff48c5/backend/package.json) [workout tracking](https://github.com/ReynkeDeVos/ElderGymBroApp/blob/d1f89d76e35022842ac6f54f023d45ddc0ff48c5/backend/controllers/userWorkoutTrackingController.js)                                                                                |
| Pokémon Battle         | React 19, React Router, Tailwind 4/DaisyUI, Vite; Node.js/Express 5; battle and Pokédex pages                                 | Lower priority than the distinctive new work. A fork of `EinKinddesWindes/PokemonBattle`; do not imply the whole codebase was authored independently. Contribution scope is unresolved. [project README](https://github.com/ReynkeDeVos/PokemonBattle/blob/3035b910e2f1e5c8f0c703441831ef6b3567e379/README.md) [frontend manifest](https://github.com/ReynkeDeVos/PokemonBattle/blob/3035b910e2f1e5c8f0c703441831ef6b3567e379/Frontend/package.json) [backend manifest](https://github.com/ReynkeDeVos/PokemonBattle/blob/3035b910e2f1e5c8f0c703441831ef6b3567e379/Backend/package.json)                                                                                                                                                                                              |
| Name Shuffler CLI      | Node.js/JavaScript, Inquirer, Chalk, Boxen and terminal presentation; Fisher-Yates shuffle plus round-robin grouping          | Small supporting tool or archive item. README explicitly discloses partial LLM generation; retain honest provenance. Source includes deliberate presentation delays, so avoid framing it as a performance-engineering showcase. [provenance disclosure](https://github.com/ReynkeDeVos/name-shuffler-cli/blob/160f139e2a21d2183c56a16353277f6cf3904eb7/README.md) [shuffle implementation](https://github.com/ReynkeDeVos/name-shuffler-cli/blob/160f139e2a21d2183c56a16353277f6cf3904eb7/index.js)                                                                                                                                                                                                                                                                                   |
| Better Readers         | React, Vite, Tailwind, Contentful SDK and client-side book pagination                                                         | Older supplementary web example. GitHub lists contributions by both ReynkeDeVos and MichalWollny. Team-page placeholders remain, so avoid treating this as a polished recent flagship. [Contentful pagination](https://github.com/ReynkeDeVos/BetterReaders/blob/89ae0b2e69c9fd5169c250f4c2bb09060f7da46c/src/components/Contentful.jsx) [package manifest](https://github.com/ReynkeDeVos/BetterReaders/blob/89ae0b2e69c9fd5169c250f4c2bb09060f7da46c/package.json) [contributors](https://api.github.com/repos/ReynkeDeVos/BetterReaders/contributors)                                                                                                                                                                                                                              |
| Claude Partner Network | Learning notes and exercises around the Anthropic API, MCP, prompt evaluation, tool use and a React UI generator              | Evidence of exploring AI developer tools, not a proven original product. Starter/COMPLETE folder pairs, TODOs and instructional tasks make attribution ambiguous. The completed MCP example uses in-memory documents and tool/resource/prompt decorators; describe it as an experiment or learning workspace. [MCP example](https://github.com/ReynkeDeVos/Claude-Partner-Network/blob/a810e137a0e3eeefdcb69c06b0750eab4334ca2f/Projects/cli_project_COMPLETE/mcp_server.py) [instructional task](https://github.com/ReynkeDeVos/Claude-Partner-Network/blob/a810e137a0e3eeefdcb69c06b0750eab4334ca2f/Projects/queries/task.md) [UI generator exercise](https://github.com/ReynkeDeVos/Claude-Partner-Network/blob/a810e137a0e3eeefdcb69c06b0750eab4334ca2f/Projects/uigen/README.md) |

## Public inventory screening

The nine candidates above were source-inspected. Other public repositories were screened at metadata level:

- `gse8-flask-python-uv`, `gse8-flask-python`, `vite-deploy-demo-gse8`, `gse08-git-team-workflow-demo`, `handouts`, `Lectures_public`: course/demo material; useful for a deeper teaching section, lower priority for selected development work.
- `starter-react-ts-mini-project-test`, `task-harness-run-2`, `n8n-docker`, `n8n-blueprint`, `TodoList`, `WBS-todo`: public forks; lower priority without a concrete contribution story.
- `ReynkeDeVos`: profile repository rather than a software case study.
- `Portfolio`: existing site, explicitly excluded as a design reference by the user.
- `CooKoo`: an older HTML project; lower priority than the newer source-inspected pieces.

Inventory source: [GitHub repository API](https://api.github.com/users/ReynkeDeVos/repos?per_page=100). Authentication was used to verify visibility; private repository details are deliberately absent from this document.

## Evidence limits and next editorial decisions

- No download counts, user counts, adoption, performance benchmarks or business outcomes were established. Do not invent any.
- Test code was inspected, but candidate tests were not executed. Use **includes tests**, not **all tests pass**.
- These summaries establish what the public source implements, not whether every external demo or deployment currently works.
- Prefer three visible project cards with compact technology labels. Put the implementation story and additional projects behind an immediate detail view or dedicated work page.
- Keep project attribution in those details. The homepage can remain concise without implying ownership of third-party engines, games, art or team contributions.
