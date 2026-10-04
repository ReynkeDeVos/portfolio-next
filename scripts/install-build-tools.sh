#!/usr/bin/env bash
set -euo pipefail

# CI and the Cloudflare build pin the release so its checksum can be verified.
aube_version="2.6.1"
aube_sha256="364b4cf201970cd5c943390dd3e736b4256b14a0ac52d304f8fb4acfd6a1fbd3"
install_dir="${1:?Pass the binary installation directory}"

if [[ "$(node -p 'require("./package.json").packageManager')" != "aube@$aube_version" ]]; then
  echo "Update scripts/install-build-tools.sh to match package.json's Aube version." >&2
  exit 1
fi

mkdir -p "$install_dir"
archive="$(mktemp)"
trap 'rm -f "$archive"' EXIT

# Downloads the release archive, verifies its checksum and extracts the binaries.
curl --fail --location --retry 3 --silent --show-error --output "$archive" \
  "https://github.com/aubepkg/aube/releases/download/v$aube_version/aube-v$aube_version-x86_64-unknown-linux-gnu.tar.gz"
printf '%s  %s\n' "$aube_sha256" "$archive" | sha256sum --check --status
tar -xzf "$archive" -C "$install_dir" aube aubr aubx
