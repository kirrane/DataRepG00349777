import React from 'react';
import classes from './Toolbar.module.css';
import { NavLink } from 'react-router-dom';

const toolbar = () => {
    return (
        <header className={classes.Toolbar}>
            <h2>Game Space</h2>
            <nav>
                <ul>
                    <li><NavLink to='/games' activeClassName={classes.active} >Home</NavLink></li>
                    <li><NavLink to='/create' activeClassName={classes.active} >Create</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default toolbar;