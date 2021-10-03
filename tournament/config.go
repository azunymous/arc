package tournament

import (
	"fmt"
	"github.com/goccy/go-yaml"
)

type ConfigTournaments struct {
	Tournaments struct {
		All []ConfigTournament `json:"all"`
	} `json:"tournaments"`
}
type ConfigTournament struct {
	Name       string   `json:"name"`
	Platform   string   `json:"platform"`
	Region     string   `json:"region"`
	Date       string   `json:"date"`
	TimeUTC    string   `json:"timeUTC"`
	EndDate    string   `json:"endDate"`
	EndTimeUTC string   `json:"endTimeUTC"`
	Host       string   `json:"host"`
	Details    string   `json:"details"`
	Links      []string `json:"links"`
	Tags       []string `json:"tags"`
}

func From(yamlData []byte) (ConfigTournaments, error) {
	var ts ConfigTournaments
	if err := yaml.Unmarshal(yamlData, &ts); err != nil {
		return ConfigTournaments{}, fmt.Errorf("failed to parse tournaments data: %w", err)
	}

	return ts, nil
}
