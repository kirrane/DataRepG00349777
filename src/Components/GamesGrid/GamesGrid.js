import React, { useState, useEffect } from 'react';
import classes from './GamesGrid.module.css';
import Game from './Game/Game';
import axios from 'axios';

const GamesGrid = () => {
    //setting local state for api requested data
    const [data, setData] = useState(null);
    //useEffect will only run when the component is mounted
    //because its dependency array is empty
    useEffect(() => {
        axios.get('http://localhost:3001/api/games')
            .then((res) => {
                setData(res.data);
                console.log(res.data.length)
            })
            .catch((err) => console.log(err))
    }, []);
    return (
        data && <div className={classes.GamesDisplay}>
            <h3>We have all the data that you need on the latest games</h3>
            <div className={classes.GamesGrid}>
                {/* data is the array of api data, mapping it on Game component */}
                {data.map(d => {
                    let src = 'http://localhost:3001/' + d.cover;
                    return <Game src={src} key={d._id} id={d._id} name={d.name} />
                })}
            </div>
        </div>
    )
}

export default GamesGrid;