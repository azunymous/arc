import React, {useEffect} from "react";
import Link from 'next/link'

export default function Navbar({children}) {

    useEffect(() => {
        // Get all "navbar-burger" elements
        const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

        // Check if there are any navbar burgers
        if ($navbarBurgers.length > 0) {
            // Add a click event on each of them
            $navbarBurgers.forEach(el => {
                el.addEventListener('click', () => {

                    // Get the target from the "data-target" attribute
                    const target = el.dataset.target;
                    const $target = document.getElementById(target);

                    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                    el.classList.toggle('is-active');
                    $target.classList.toggle('is-active');

                });
            });
        }
    });


    return (
        <>
            <nav className="navbar is-black" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link href="/">
                        <div className="navbar-item is-clickable">
                            arc.red
                            {/*<img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>*/}
                        </div>
                    </Link>

                    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false"
                       data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <Link href={"/intro"}>
                            <div className="navbar-item is-clickable">
                                Intro
                            </div>
                        </Link>

                        <Link href={"/resources"}>
                            <div className="navbar-item is-clickable">
                                Resources
                            </div>
                        </Link>


                        <Link href={"/events"}>
                            <div className="navbar-item is-clickable">
                                Events
                            </div>
                        </Link>


                    <Link href={"/about"}>
                        <div className="navbar-item is-clickable">
                            About
                        </div>
                    </Link>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <a className="button is-primary" href="/board">
                                    <strong>Board</strong>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main>{children}</main>
            <br/>
        </>
    )

}