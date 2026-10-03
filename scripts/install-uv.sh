#!/usr/bin/env bash
set -euo pipefail

# CI and the Cloudflare build pin a release so its checksum can be verified;
# local mise installs the latest uv.
uv_version="0.12.22"
uv_sha256="b9980552309f09c15172b8be828555e375097f16deb459795ce7bfd200380f0b"
install_dir="${1:?Pass the binary installation directory}"

mkdir -p "$install_dir"
archive="$(mktemp)"
trap 'rm -f "$archive"' EXIT
curl --fail --location --retry 3 --silent --show-error \
  "https://github.com/astral-sh/uv/releases/download/$uv_version/uv-x86_64-unknown-linux-gnu.tar.gz" \
  --output "$archive"
printf '%s  %s\n' "$uv_sha256" "$archive" | sha256sum --check --status
tar -xzf "$archive" -C "$install_dir" --strip-components 1 \
  uv-x86_64-unknown-linux-gnu/uv uv-x86_64-unknown-linux-gnu/uvx
