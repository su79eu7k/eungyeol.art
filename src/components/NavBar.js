import React from 'react'
import { NavLink } from 'react-router-dom'

function NavBar() {
    return (
        <header id='nav-bar'>
            <div id='logo'>
                EunGyeol.art
            </div>
            <nav id='nav'>
                <ul>
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li><NavLink to='/about'>About</NavLink></li>
                    <li><NavLink to='/arts'>Gallery</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default NavBar
