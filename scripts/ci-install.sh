#!/usr/bin/env bash
set -euo pipefail

install_log=$(mktemp)
trap 'rm -f "$install_log"' EXIT

for attempt in 1 2 3; do
  if npm ci --prefer-offline --no-audit --no-fund --fetch-retries=3 2>&1 | tee "$install_log"; then
    exit 0
  else
    install_status=${PIPESTATUS[0]}
  fi

  # Body-stream failures can occur after npm's request retry has finished.
  if [ "$attempt" -eq 3 ] || ! grep -Eq \
    '^npm (error|ERR!) code (ECONNRESET|ETIMEDOUT|EAI_AGAIN|ENETUNREACH|ECONNREFUSED)$' "$install_log"; then
    exit "$install_status"
  fi

  printf 'Retrying npm ci after a network failure (attempt %s of 3).\n' "$((attempt + 1))"
  sleep "$((attempt * 10))"
done
