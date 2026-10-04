#!/usr/bin/env bash
set -euo pipefail

build_tools_dir="$PWD/.cloudflare-build/bin"
# The font build runs through uv, which the build image doesn't ship.
bash scripts/install-build-tools.sh "$build_tools_dir"

export PATH="$build_tools_dir:$PATH"

aube install --frozen-lockfile
aubr check
aubr build
aubr test:prerender
