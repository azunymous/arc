package tournament

import (
	_ "embed"
	"fmt"
	"log"
	"sort"
	"time"
)

type Tournaments struct {
	Upcoming  []DayTournament `json:"upcoming"`
	Completed []DayTournament `json:"completed"`
}

type DayTournament struct {
	Name           string      `json:"name,omitempty"`
	Platform       string      `json:"platform,omitempty"`
	Region         string      `json:"region,omitempty"`
	TimeUnixSec    TimeUnixSec `json:"timeUnixSec"`
	Time           time.Time   `json:"time"`
	EndTime        time.Time   `json:"endTime"`
	EndTimeUnixSec TimeUnixSec `json:"endTimeUnixSec"`
	Host           string      `json:"host,omitempty"`
	Details        string      `json:"details,omitempty"`
	Links          []string    `json:"links,omitempty"`
	Tags           []string    `json:"tags,omitempty"`
}

type TimeUnixSec time.Time

func (t TimeUnixSec) MarshalJSON() ([]byte, error) {
	stamp := fmt.Sprintf("%d", time.Time(t).Unix())
	return []byte(stamp), nil
}

func NewTournamentsFromConfig(tournaments ConfigTournaments) *Tournaments {
	upcoming := convert(tournaments.Tournaments.All)
	t := &Tournaments{Upcoming: upcoming}
	t.CompletePassed()
	return t
}

func (t *Tournaments) CompletePassed() {
	var upcoming []DayTournament
	var completed []DayTournament
	now := time.Now()
	for _, tournament := range t.Upcoming {
		if tournament.EndTime.Before(now) {
			completed = append(completed, tournament)
		} else {
			upcoming = append(upcoming, tournament)
		}
	}
	sort.Slice(upcoming, func(i, j int) bool {
		return upcoming[i].Time.Before(upcoming[j].Time)
	})
	sort.Slice(completed, func(i, j int) bool {
		return completed[i].Time.Before(completed[j].Time)
	})
	t.Upcoming = upcoming
	t.Completed = completed
}

func convert(tournaments []ConfigTournament) []DayTournament {
	var days []DayTournament
	for _, tournament := range tournaments {
		days = append(days, convertTournament(tournament))
	}

	sort.Slice(days, func(i, j int) bool {
		return days[i].Time.After(days[j].Time)
	})
	return days
}

func convertTournament(tournament ConfigTournament) DayTournament {
	addDay := false

	parsed, err := time.Parse("2006/01/02T15:04", tournament.Date+"T"+tournament.TimeUTC)
	if err != nil {
		log.Printf("Failed to parse time: %v, continuing", err)
	}

	if tournament.EndDate == "" {
		tournament.EndDate = tournament.Date
	}

	if tournament.EndTimeUTC == "" {
		tournament.EndTimeUTC = tournament.TimeUTC
		addDay = true
	}

	parsedEnd, err := time.Parse("2006/01/02T15:04", tournament.EndDate+"T"+tournament.EndTimeUTC)
	if err != nil {
		log.Printf("Failed to parse time: %v, continuing", err)
	}
	if addDay {
		parsedEnd = parsedEnd.Add(24 * time.Hour)
	}

	return DayTournament{
		Name:           tournament.Name,
		Platform:       tournament.Platform,
		Region:         tournament.Region,
		Time:           parsed,
		TimeUnixSec:    TimeUnixSec(parsed),
		EndTime:        parsedEnd,
		EndTimeUnixSec: TimeUnixSec(parsedEnd),
		Host:           tournament.Host,
		Details:        tournament.Details,
		Links:          tournament.Links,
		Tags:           tournament.Tags,
	}
}
