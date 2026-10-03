# Content-based font subsets

`aubr dev` and `aubr build` run `aubr fonts:build` before Vite. The generator
uses FontTools 4.66.1 and Brotli 1.2.0, pinned in the script and its uv lockfile.
Install uv using the version in `mise.toml` (not `.tool-versions`, which
Cloudflare's asdf would fail on); uv supplies Python 3.11 or
later and caches the script's isolated environment. CI and the Cloudflare build
install the checksum-verified uv binary with `scripts/install-uv.sh`, like Aube;
the Cloudflare build image has no uv.

The generator reads text-bearing source files under `src/` in both languages,
including JSX, UI dictionaries, CSS and JSON. It excludes generated files.
Scanning source instead of a rendered page includes dialogs, errors, alternate
sections and conditional copy. It deliberately retains characters found in
comments and code too, rather than trying to infer which strings can render.
HTML entities and JavaScript/CSS character escapes are decoded. Composed and
decomposed accented letters and upper/lowercase forms are included.

Printable ASCII, nonbreaking space and German letters are always requested.
This covers the decoded email address, numbers and native English/German date
formatting. FontTools retains the intersection with each upstream Latin font's
character map. Emoji and characters absent from the original fonts continue
to use the system fallback; subsetting does not expand the upstream coverage.
If a new language needs Latin Extended or another script, update the input
fonts as well as the content.

Each font keeps its complete weight axis, hinting and all applicable OpenType
features, including kerning and ligatures. Character subsetting is the only
change to the typography. Licenses and font names are retained; upstream
license files are copied to `public/fonts/` for distribution alongside the
fonts. FontTools' safe default optimizations remain enabled. Hint removal and
weight-axis trimming are not used.

Generated WOFF2 files and `fonts.css` live in the ignored `src/generated/fonts/`
directory. The stylesheet supplies the actual supported Unicode ranges. The
root route preloads these same files; Vite fingerprints the assets normally.
Never edit the generated files. After changing copy during a running dev
session, run `aubr fonts:build` or restart `aubr dev` to refresh the subsets.
Every production build regenerates them before compilation, so new content
cannot ship with fonts from an earlier build.

`aubr fonts:test` verifies decoded text and newly added characters, reproducible
WOFF2 generation, preserved variable axes and licenses, OpenType feature tags,
and unchanged glyph outlines and advance widths at weights 400, 500, 600 and 650. It runs as part of `aubr test` and `aubr check`; `aubr check` generates the
fonts first, because linting resolves `fonts.css` through `src/styles.css`. Generation also reopens
each WOFF2 file and verifies that all requested, originally supported
characters survived.

Sources:

- [FontTools subsetting options and safe defaults](https://fonttools.readthedocs.io/en/latest/subset/index.html)
- [FontTools WOFF2 support](https://fonttools.readthedocs.io/en/latest/ttLib/woff2.html)
- [uv script dependencies and locks](https://docs.astral.sh/uv/guides/scripts/)
