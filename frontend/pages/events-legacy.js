import React, {useEffect} from 'react'
import eventHtml from '../public/events.html'

const EventsLegacy = () => {
    useEffect(() => {
        const TABS = [...document.querySelectorAll('#tabs li')];
        const CONTENT = [...document.querySelectorAll('#tab-content section')];
        const ACTIVE_CLASS = 'is-active';
        const HIDDEN_CLASS = 'is-hidden';

        function initTabs() {
            TABS.forEach((tab) => {
                tab.addEventListener('click', (e) => {
                    let selected = tab.getAttribute('data-tab');
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


    return (
        <main>
            <div className="columns">

                <div className="column">
                    <div className="container">
                        <h1 className="title">
                            Events
                        </h1>

                        <div className="content">
                            {/*TODO Replace with API call and JSX*/}
                            <div dangerouslySetInnerHTML={{__html: eventHtml}}/>
                        </div>
                    </div>

                </div>
            </div>
            <div>
            </div>
        </main>
    )
}

export default EventsLegacy;
