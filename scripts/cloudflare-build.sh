#!/usr/bin/env bash
set -euo pipefail

build_tools_dir="$PWD/.cloudflare-build/bin"
bash scripts/install-aube.sh "$build_tools_dir"

# The font build runs through uv, which the build image doesn't ship.
uv_version="$(awk '$1 == "uv" { print $2 }' .tool-versions)"
python3 -m pip install --quiet --target "$build_tools_dir/uv" "uv==${uv_version:?No uv version in .tool-versions}"

export PATH="$build_tools_dir:$build_tools_dir/uv/bin:$PATH"

aube install --frozen-lockfile
aubr check
aubr build
