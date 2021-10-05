import React from 'react'
import Link from 'next/link'

const Home = () => {
    return (
        <main>
            <div className="columns">
                <div className="column  is-one-fifth has-text-centered">
                    <aside className="menu">
                        <p className="menu-label">
                            Quick Shortcuts
                        </p>
                        <ul className="menu-list">
                            <li><a href="https://meltyblood.typelumina.com/en/">Official Site</a></li>
                            <li><a href="https://wiki.gbl.gg/w/Melty_Blood/MBTL">Mizuumi Wiki</a></li>
                            <li><a href="http://lumina.melty.games/">Match Database</a></li>
                            <li><Link href="/events">Events</Link></li>
                        </ul>
                        <p className="menu-label">
                            Fun
                        </p>
                        <ul className="menu-list">
                            <li><a href="https://meltycolors.art/">Melty Colors</a></li>
                        </ul>
                        <p className="menu-label">
                            Other
                        </p>
                        <ul className="menu-list">
                            <li><a href="https://play.meltyblood.club">MBAACC</a></li>
                        </ul>
                    </aside>
                </div>
                <div className="column  is-four-fifths">
                    <div className="container">
                        <section className="section">
                            <h1 className="title">
                                arc.red
                            </h1>
                            <p className="subtitle">
                                Catalogue for <strong>MBTL</strong>
                            </p>
                        </section>
                        <div className="columns">
                            <div className="column is-three-quarters">
                                Check the quick links on the right, look at the <Link href="/events">events</Link> page
                                or visit the full <Link href="/resources">list of resources</Link>.
                            </div>
                            <div className="column is-one-quarter">
                                {/*TODO Fix resolution*/}
                                {/*<figure className="image ml-auto is-flex is-justify-content-right ">*/}
                                {/*    <img src="/img/red-arc-chara-img.png"/>*/}
                                {/*</figure>*/}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div>
            </div>
        </main>
    )
}

export default Home;
