package tournament

import (
	_ "embed"
	"html/template"
	"io"
	"log"
	"sort"
	"time"
)

type TournamentsTemplater struct {
	Upcoming  []Day
	Completed []DayTournament
}

type Day struct {
	Date           string
	DayTournaments []DayTournament
}
type DayTournament struct {
	Name     string
	Platform string
	Region   string
	TimeUTC  string
	Time     time.Time
	Host     string
	Details  string
	Links    []string
	Tags     []string
}

//go:embed html.gohtml
var tmpl string

func (t *TournamentsTemplater) CompletePassed() {
	var completed []DayTournament
	now := time.Now()
	for _, day := range t.Upcoming {
		for _, tournament := range day.DayTournaments {
			if tournament.Time.After(now) {
				completed = append(completed, tournament)
			}
		}
	}
	sort.Slice(completed, func(i, j int) bool {
		return completed[i].Time.After(completed[i].Time)
	})
	t.Completed = append(t.Completed, completed...)
}

func (t *TournamentsTemplater) Generate(w io.Writer) error {
	return template.Must(template.New("tournaments").Parse(tmpl)).Execute(w, t)
}

func NewTemplater(tournaments Tournaments) *TournamentsTemplater {
	upcoming := convert(tournaments.Tournaments.All)
	return &TournamentsTemplater{Upcoming: upcoming}
}

func convert(daily map[string][]Tournament) []Day {
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

func convertTournament(date string, tournament Tournament) DayTournament {
	parsed, err := time.Parse("2006/01/02T15:04", date+"T"+tournament.TimeUTC)
	if err != nil {
		log.Printf("Failed to parse time: %v, continuing", err)
	}
	return DayTournament{
		Name:     tournament.Name,
		Platform: tournament.Platform,
		Region:   tournament.Region,
		TimeUTC:  tournament.TimeUTC,
		Time:     parsed,
		Host:     tournament.Host,
		Details:  tournament.Details,
		Links:    tournament.Links,
		Tags:     tournament.Tags,
	}
}
