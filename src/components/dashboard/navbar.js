import React from 'react'
import './dashboard.css'

function Navbar() {
    return (
        <nav className="navbar navbar-dark sticky-top flex-md-nowrap p-0 mb-0">
            {/* <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="/">The Weekly Edge</a> */}
            <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse" data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
        </nav>
    )
}

export default Navbar;