import React, {useEffect, useState} from 'react'
import eventHtml from '../public/events.html'
import Tournaments from "../components/tournaments";

const Events = () => {

    const [selectedTab, setSelectedTab] = useState("0");

    useEffect(() => {
        const TABS = [...document.querySelectorAll('#tabs li')];
        const CONTENT = [...document.querySelectorAll('#tab-content section')];
        const ACTIVE_CLASS = 'is-active';
        const HIDDEN_CLASS = 'is-hidden';

        function initTabs() {
            TABS.forEach((tab) => {
                tab.addEventListener('click', (e) => {
                    let selected = tab.getAttribute('data-tab');
                    setSelectedTab(selected)
                    updateActiveTab(tab);
                    updateActiveContent(selected);
                })
            })
        }

        function updateActiveTab(selected) {
            TABS.forEach((tab) => {
                if (tab && tab.classList.contains(ACTIVE_CLASS)) {
                    tab.classList.remove(ACTIVE_CLASS);
                }
            });
            selected.classList.add(ACTIVE_CLASS);
        }

        function updateActiveContent(selected) {
            CONTENT.forEach((item) => {
                let data = item.getAttribute('data-content');
                if (data !== selected) {
                    item.classList.add(HIDDEN_CLASS);
                }
                if (data === selected) {
                    item.classList.remove(HIDDEN_CLASS);
                }
            });
        }

        initTabs();
    })


    function tabs() {
        return <div className="tabs is-centered" id="tabs">
            <ul>
                <li className="is-active" data-tab="1">
                    <a>
                                            <span className="icon is-small"><i className="fas fa-image"
                                                                               aria-hidden="true"></i></span>
                        <span>Current & Upcoming</span>
                    </a>
                </li>
                <li data-tab="2">
                    <a>
                                            <span className="icon is-small"><i className="fas fa-music"
                                                                               aria-hidden="true"></i></span>
                        <span>Completed</span>
                    </a>
                </li>
            </ul>
        </div>;
    }

    return (
        <main>
            <div className="columns">

                <div className="column">
                    <div className="container">
                        <h1 className="title">
                            Events
                        </h1>

                        <div className="content">
                            {tabs()}

                            <Tournaments selected={selectedTab}/>
                        </div>
                    </div>

                </div>
            </div>
            <div>
            </div>
        </main>
    )
}

export default Events;
