import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
export default function NavBar(props)  {
    return (
        <nav className="nav" id="nav">
            <div className="nav-bar" id="nav-bar">
                <Link to="/" className="nav-bar left">
                    <img className="img logo" id="img-logo" src="logo.jpg" width="70px" />
                    <h id="chutter">HUTTER</h>
                </Link>

                <div className="nav-bar right">
                    <ul className="menu">
                        <li> <Link to="/" className="menu-item">Home</Link>
                            </li>
                        <li><Link to="/about" className="menu-item">About</Link></li>
                        <li>
                            <a href="#" className="menu-item drop" id="menu-item-dropt">Movies
                            <ul className="dropdown movies" id="dropdown-movies">
                                    <li className="dropdown item"><a href="#" className="type">Poppular</a></li>
                                    <li className="dropdown item"><a href="#" className="type">Now Playing</a></li>
                                    <li className="dropdown item"><a href="#" className="type">Upcoming</a></li>
                                    <li className="dropdown item"><a href="#" className="type">Top Rates</a></li>
                                </ul>
                            </a>
                        </li>
                    </ul>
                    <form className="nav-bar form-search">
                        <div className="search-wrap">
                            <input type="text" className="input-search" placeholder="Search for a movie, tv show, person..."
                                value={props.value}
                                onChange={props.handleChange} />
                        </div>
                        <button type="submit" className="button-search" onClick={props?.onSubmit}>
                            <div className="gg-search"></div>
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    )
}
