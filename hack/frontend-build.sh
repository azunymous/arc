#!/usr/bin/env bash
set -o pipefail
cd "$(dirname "$0")" || exit

cd ../frontend/
VERSION=0.0.1
docker build  . -t gcr.io/arc-red/arc-red-frontend:${VERSION}
docker push gcr.io/arc-red/arc-red-frontend:${VERSION}
