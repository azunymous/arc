#!/usr/bin/env bash
set -o pipefail
cd "$(dirname "$0")" || exit

cd ..
VERSION=0.0.1
go install github.com/google/ko@latest
KO_DOCKER_REPO=gcr.io/arc-red/arc-red ko publish ./cmd/arc --bare -t ${VERSION}
