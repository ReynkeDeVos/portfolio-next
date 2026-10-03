#!/usr/bin/env bash
set -euo pipefail

build_tools_dir="$PWD/.cloudflare-build/bin"
bash scripts/install-aube.sh "$build_tools_dir"
# The font build runs through uv, which the build image doesn't ship.
bash scripts/install-uv.sh "$build_tools_dir"

export PATH="$build_tools_dir:$PATH"

aube install --frozen-lockfile
aubr check
aubr build
