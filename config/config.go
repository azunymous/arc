package config

import _ "embed"

//go:embed tournaments.yaml
var tournaments []byte

func Tournaments() []byte {
	return tournaments
}
