package tournament

import (
	_ "embed"
	"fmt"
	"html/template"
	"io"
	"log"
	"sort"
	"time"
)

type Tournaments struct {
	Upcoming  []Day           `json:"upcoming,omitempty"`
	Completed []DayTournament `json:"completed"`
}

type Day struct {
	Date           string          `json:"date,omitempty"`
	DayTournaments []DayTournament `json:"dayTournaments,omitempty"`
}
type DayTournament struct {
	Name        string      `json:"name,omitempty"`
	Platform    string      `json:"platform,omitempty"`
	Region      string      `json:"region,omitempty"`
	TimeUTC     string      `json:"timeUtc,omitempty"`
	TimeUnixSec TimeUnixSec `json:"timeUnixSec"`
	Time        time.Time   `json:"time"`
	Host        string      `json:"host,omitempty"`
	Details     string      `json:"details,omitempty"`
	Links       []string    `json:"links,omitempty"`
	Tags        []string    `json:"tags,omitempty"`
}

type TimeUnixSec time.Time

func (t TimeUnixSec) MarshalJSON() ([]byte, error) {
	stamp := fmt.Sprintf("%d", time.Time(t).Unix())
	return []byte(stamp), nil
}

//go:embed html.gohtml
var tmpl string

func NewTournamentsFromConfig(tournaments ConfigTournaments) *Tournaments {
	upcoming := convert(tournaments.Tournaments.All)
	t := &Tournaments{Upcoming: upcoming}
	t.CompletePassed()
	return t
}

func (t *Tournaments) GenerateHTML(w io.Writer) error {
	return template.Must(template.New("tournaments").Parse(tmpl)).Execute(w, t)
}

func (t *Tournaments) CompletePassed() {
	var completed []DayTournament
	now := time.Now()
	for _, day := range t.Upcoming {
		for _, tournament := range day.DayTournaments {
			if tournament.Time.Before(now) {
				completed = append(completed, tournament)
			}
		}
	}
	sort.Slice(completed, func(i, j int) bool {
		return completed[i].Time.After(completed[i].Time)
	})
	t.Completed = append(t.Completed, completed...)
}

func convert(daily map[string][]ConfigTournament) []Day {
	var days []Day
	for date, tournaments := range daily {
		day := Day{
			Date: date,
		}

		for _, tournament := range tournaments {
			day.DayTournaments = append(day.DayTournaments, convertTournament(date, tournament))
		}
		days = append(days, day)
	}

	sort.Slice(days, func(i, j int) bool {
		return days[i].Date < days[j].Date
	})
	return days
}

func convertTournament(date string, tournament ConfigTournament) DayTournament {
	parsed, err := time.Parse("2006/01/02T15:04", date+"T"+tournament.TimeUTC)
	if err != nil {
		log.Printf("Failed to parse time: %v, continuing", err)
	}
	return DayTournament{
		Name:        tournament.Name,
		Platform:    tournament.Platform,
		Region:      tournament.Region,
		Time:        parsed,
		TimeUTC:     tournament.TimeUTC,
		TimeUnixSec: TimeUnixSec(parsed),
		Host:        tournament.Host,
		Details:     tournament.Details,
		Links:       tournament.Links,
		Tags:        tournament.Tags,
	}
}
