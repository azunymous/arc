#!/usr/bin/env bash
set -o pipefail
cd "$(dirname "$0")" || exit

cd ..
go run ./cmd/tournamentgen ./config/tournaments.yaml ./frontend/public/events.html
