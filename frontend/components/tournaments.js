import React, {useEffect} from "react";
import {useState} from "react";
import Moment from "react-moment";

export default function Tournaments({selected}) {
    // TODO fix the following env loading
    const API_URI = process.env.API_URI || "https://api.arc.red";

    const [events, setEvents] = useState(null);
    const [err, setErr] = useState("");

    useEffect(() => {
        Moment.startPooledTimer();
        fetch(API_URI + "/events")
            .then(results => results.json())
            .then(data => {
                setEvents(data)
            }).catch((err) => {
            setErr("Failed to fetch events. Try refreshing the page after a bit.");
            console.log(err)
        });
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

        return events.upcoming.map((dayTournament) => {
            return (
                <>
                    {displayDayTournaments(dayTournament)}
                </>
            )
        })

    }

    function displayCompleted() {
        if (events.completed === null) {
            return <p>No completed events</p>
        }
        return events.completed.map((dayTournament) => {
            return (
                <>
                    {displayDayTournaments(dayTournament)}
                </>
            )
        })
    }

    function displayDayTournaments(dayTournament) {
        const calendarStrings = {
            lastDay: '[Yesterday at] LT',
            sameDay: '[Today at] LT',
            nextDay: '[Tomorrow at] LT',
            lastWeek: '[last] dddd [at] LT',
            nextWeek: 'dddd [at] LT',
            sameElse: 'L [at] LT'
        };
        return (
            <>
                <h3>
                    <Moment unix local withTitle calendar={calendarStrings}>
                        {dayTournament.timeUnixSec}
                    </Moment>
                </h3>
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
                <strong>Host: <a
                    href={"https://twitter.com/" + dayTournament.host}>{dayTournament.host}</a></strong> - <Moment unix
                                                                                                                   local
                                                                                                                   fromNow>
                {dayTournament.timeUnixSec}
            </Moment>
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
                <h2>Current & Upcoming</h2>
                {displayUpcoming()}
            </section>
        )
    }
}