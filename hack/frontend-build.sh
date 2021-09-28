#!/usr/bin/env bash
set -o pipefail
cd "$(dirname "$0")" || exit

cd ../frontend/
VERSION=0.0.1-debug
docker build  . -t gcr.io/arc-red/arc-red:${VERSION}
docker push gcr.io/arc-red/arc-red:${VERSION}
