#!/usr/bin/env bash
set -euo pipefail

# CI and the Cloudflare build pin releases so their checksums can be verified;
# local mise installs the latest uv.
aube_version="2.6.1"
aube_sha256="364b4cf201970cd5c943390dd3e736b4256b14a0ac52d304f8fb4acfd6a1fbd3"
uv_version="0.12.22"
uv_sha256="b9980552309f09c15172b8be828555e375097f16deb459795ce7bfd200380f0b"
install_dir="${1:?Pass the binary installation directory}"

if [[ "$(node -p 'require("./package.json").packageManager')" != "aube@$aube_version" ]]; then
  echo "Update scripts/install-build-tools.sh to match package.json's Aube version." >&2
  exit 1
fi

mkdir -p "$install_dir"
archive="$(mktemp)"
trap 'rm -f "$archive"' EXIT

# Downloads a release archive, verifies its checksum and extracts the given tar arguments.
fetch_tool() {
  local url="$1" sha256="$2"
  shift 2
  curl --fail --location --retry 3 --silent --show-error "$url" --output "$archive"
  printf '%s  %s\n' "$sha256" "$archive" | sha256sum --check --status
  tar -xzf "$archive" -C "$install_dir" "$@"
}

fetch_tool "https://github.com/aubepkg/aube/releases/download/v$aube_version/aube-v$aube_version-x86_64-unknown-linux-gnu.tar.gz" \
  "$aube_sha256" aube aubr aubx
fetch_tool "https://github.com/astral-sh/uv/releases/download/$uv_version/uv-x86_64-unknown-linux-gnu.tar.gz" \
  "$uv_sha256" --strip-components 1 uv-x86_64-unknown-linux-gnu/uv uv-x86_64-unknown-linux-gnu/uvx
