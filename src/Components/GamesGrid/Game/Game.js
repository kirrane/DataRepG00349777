import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Game.module.css';

const game = (props) => {
    return (
        <div className={classes.Game}>
            <img src={props.src} alt='' />
            <Link to={'/game/' + props.id}>{props.name}</Link>
        </div>
    )
}

export default game;