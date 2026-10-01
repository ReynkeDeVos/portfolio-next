#!/usr/bin/env bash
set -euo pipefail

aube_version="2.6.1"
aube_sha256="364b4cf201970cd5c943390dd3e736b4256b14a0ac52d304f8fb4acfd6a1fbd3"
build_tools_dir="$PWD/.cloudflare-build/bin"

if [[ "$(node -p 'require("./package.json").packageManager')" != "aube@$aube_version" ]]; then
  echo "Update the Cloudflare build's Aube version and checksum to match package.json." >&2
  exit 1
fi

mkdir -p "$build_tools_dir"
archive="$(mktemp)"
trap 'rm -f "$archive"' EXIT

curl --fail --location --retry 3 --silent --show-error \
  "https://github.com/aubepkg/aube/releases/download/v$aube_version/aube-v$aube_version-x86_64-unknown-linux-gnu.tar.gz" \
  --output "$archive"
printf '%s  %s\n' "$aube_sha256" "$archive" | sha256sum --check --status
tar -xzf "$archive" -C "$build_tools_dir" aube aubr aubx

export PATH="$build_tools_dir:$PATH"

aube install --frozen-lockfile
aubr check
aubr build
