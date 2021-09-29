import React, {useEffect} from "react";
import {useState} from "react";

export default function Tournaments({selected}) {
    // TODO fix the following env loading
    const API_URI = process.env.API_URI || "https://api.arc.red";

    const [events, setEvents] = useState(null);
    const [err, setErr] = useState("");

    useEffect(() => {
        console.log(process.env)
        fetch(API_URI + "/events")
            .then(results => results.json())
            .then(data => {
                setEvents(data)
            }).catch((err) => {setErr("Failed to fetch events. Try refreshing the page after a bit."); console.log(err)});
    }, []); //

    if (err !== "" || events === null) {
        return (
            <>{err}</>
        )
    }

    function displayUpcoming() {
        if (events.upcoming === null) {
            return <p>No upcoming events</p>
        }

        return events.upcoming.map((tourney) => {
            return (
                <>
                    <h3>{tourney.date}</h3>
                    {tourney.dayTournaments.map((dayTournament) => {
                        return displayDayTournaments(dayTournament)
                    })}
                </>
            )
        })

    }

    function displayCompleted() {
        if (events.completed === null) {
            return <p>No completed events</p>
        }
        return events.completed.map((tournaments) => {
            return (
                <>
                    {tournaments.map((dayTournament) => {
                        return displayDayTournaments(dayTournament)
                    })}
                </>
            )
        })
    }

    function displayDayTournaments(dayTournament) {
        return (
            <>
                <h4>{dayTournament.name}</h4>
                <div className="field is-grouped is-grouped-multiline">
                    <div className="control">
                        <div className="tags has-addons">
                            <span className="tag is-dark">region</span>
                            <span className="tag is-link">{dayTournament.region}</span>
                        </div>
                    </div>
                    <div className="control">
                        <div className="tags has-addons">
                            <span className="tag is-dark">platform</span>
                            <span className="tag is-info">{dayTournament.platform}</span>
                        </div>
                    </div>
                    {dayTournament.tags.map((tag) => {
                        return (
                            <div className="control">
                                <span className="tag">{tag}</span>
                            </div>
                        )
                    })}
                </div>
                <strong>Time (UTC): {dayTournament.timeUtc}</strong> <br/>
                <strong>Host: <a href={"https://twitter.com/" + dayTournament.host}>{dayTournament.host}</a></strong>
                <p>{dayTournament.details}</p>
                <strong>Links:</strong>
                {dayTournament.links.map((link) => {
                    return (
                        <p><a href={"\"" + link + "\""}>{link}</a></p>
                    )
                })}


            </>
        )
    }

    if (selected === "2") {
        return (
            <section data-content="2">
                <h2>Completed</h2>
                {displayCompleted()}
            </section>
        )
    } else {
        return (
            <section data-content="1">
                <h2>Upcoming</h2>
                {displayUpcoming()}
            </section>
        )
    }
}