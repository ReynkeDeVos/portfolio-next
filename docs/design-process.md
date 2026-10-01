# Design draft

The current reviewable draft is on `design/material-expressive`. The visual
layout, Material role palette and portrait affordance were delegated to local
Claude Code using Opus 5.5 at Medium effort. The owner requested Opus 5.5 for
all future design work. Fable 5.1 could not run because the provider required
usage credits; it contributed no design work.

The first viewport presents Renke Brixel, software development, Hamburg, core
technical strengths, current employment and contact links beside selected work.
Teaching is supporting career context. No job-search claim is added.

The owner requested Material 3 Expressive and a compact personal portfolio.
Language and theme controls sit at the bottom of the profile, rather than in a
full-width header. Warm cream and sand take inspiration from daisyUI's
Caramellatte theme, with restrained sage and copper accents. Dark mode uses
warm charcoal and related accents. daisyUI is not a dependency.

Tailwind supplies layout, state and motion utilities. Editable shadcn components
supply tabs and the portrait dialog. Custom CSS defines Material tokens, type
roles, the self-hosted font and native animation keyframes. Content switches
immediately; the tab indicator and portrait frame follow independently.

The portrait opens the owner's selected larger photo. The visible photo title
is omitted, while a screen-reader label and keyboard focus behavior remain.
The owner rejected photo scaling and circular-outline hover treatments. The
current affordance is designed by Opus: the scalloped frame gently expands
while the photograph retains its visual scale. A detached icon badge was also
rejected.

English and German routes are prerendered. The old site's design is not reused.
The current draft remains subject to owner review and has not been deployed.

The owner approved Work, Career, Skills, Workflow ordering, with Work initially
open. The indicator restores silently on language changes and reloads. The
photo viewer's close action is now on its own row, independently chosen by
Opus after the owner asked for a clearer close action in both themes. Design
handoffs communicate the owner's desired result and leave the visual solution
to Opus. Technical checks validate the result without choosing the treatment.

Opus added a bilingual portfolio-build section at the end of Workflow. It
connects the curiosity claim to actual implementation choices, including mise,
Nub and aube. Cloudflare is described as a prepared target, not a deployment.
The same refinement adds one shared green keyboard-focus treatment. Grouped
controls use an inset ring, stretched project links outline their whole item,
and the portrait ring clears the expanded frame. Mouse presentation is
unchanged. The owner explicitly requested removing the skip-to-content link
after trying the keyboard navigation; it is absent from the final draft.

After the owner rejected underlines, Opus 5.5 at Medium effort aligned all
text links. The owner then requested normal on-surface text color and
stationary ArrowUpRight icons, matching the contact buttons. The final
treatment has no underlines or moving arrows and retains green keyboard focus. Employer and documentation
links share the inline treatment; project links retain their whole-item hit
area. Long institution names wrap on small screens. The owner supplied the
employer destinations from the old portfolio. Contact buttons and language
controls retain their component-specific presentation.

Opus rewrote the portfolio-build explanations in both languages for a
technical lead, using the actual renderer, client-import graph, theme store
and caching configuration. The owner added ultrarunning to the existing
profile chips without requesting a new visual treatment.

Opus added the owner-requested bilingual portrait hint, using two curved lines
on a sage band inside the lower rim and a smiling emoji. The owner cancelled
hover rotation; only the approved zoom and section-change rotation remain.
Opus replaced the transparent outlined AI, teaching and supporting-project
containers with opaque surface-container fills in both themes.

The final production Chromium pass covered all four sections at 1280px and
390px, in English and German and both themes: 32 view combinations, with no
horizontal overflow or JavaScript exceptions. Project order matched the owner’s
selection throughout. The new supporting surfaces are opaque and sampled
body text reached at least 7.92:1 contrast. Eight portrait states showed the
hint, preserved the green focus ring, opened the photo and returned focus
after Escape. Reduced-motion transitions were zero-duration and no hover
rotation was present. These are local checks, not deployed performance metrics.
