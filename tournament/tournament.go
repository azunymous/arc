package tournament

import (
	"fmt"
	"github.com/goccy/go-yaml"
)

type Tournaments struct {
	Tournaments struct {
		All map[string][]Tournament `json:"all"`
	} `json:"tournaments"`
}
type Tournament struct {
	Name     string   `json:"name"`
	Platform string   `json:"platform"`
	Region   string   `json:"region"`
	TimeUTC  string   `json:"timeUTC"`
	Host     string   `json:"host"`
	Details  string   `json:"details"`
	Links    []string `json:"links"`
	Tags     []string `json:"tags"`
}

func From(yamlData []byte) (Tournaments, error) {
	var ts Tournaments
	if err := yaml.Unmarshal(yamlData, &ts); err != nil {
		return Tournaments{}, fmt.Errorf("failed to parse tournaments data: %w", err)
	}

	return ts, nil
}
