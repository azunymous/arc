#!/usr/bin/env bash
set -o pipefail
cd "$(dirname "$0")" || exit

cd ../frontend/
yarn dev
