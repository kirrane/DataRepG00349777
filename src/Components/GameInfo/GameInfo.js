import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import classes from './GameInfo.module.css';
import axios from 'axios';

const GameInfo = (props) => {
    const [data, setData] = useState(null);
    const [del, setDel] = useState(false);
    const clickHandler = () => {
        setDel(true);
    }
    //Following useEffects have dependencies and these will run whenever there's a changed in the dependency array elements
    useEffect(() => {
        axios.get('http://localhost:3001/api/games/' + props.location.pathname.slice(6))
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => console.log(err))
        return () => setData(null)
    }, [props.location.pathname]);
    useEffect(() => {
        if (del) {
            axios.delete('http://localhost:3001/api/games/' + props.location.pathname.slice(6))
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => console.log(err));
        }
        return () => {
            setDel(false)
        }
    }, [del, props.location.pathname]);
    return (
        data && <div className={classes.Info}>
            <div className={classes.controls}>
                {/* Link is modified 'a' tag which does not causes page to reload, hence is used for single page applications */}
                <Link to={'/edit/' + data._id} className={classes.Button}>Edit</Link>
                <Link to='/games' className={classes.Button} onClick={props.clicked} >Back</Link>
                <button className={classes.Button} onClick={clickHandler} >Delete</button>
            </div>
            <div className={classes.GameInfo}>
                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <td>{data.name}</td>
                        </tr>
                        <tr>
                            <th>Release Date</th>
                            <td>{data.release}</td>
                        </tr>
                        <tr>
                            <th>Developer</th>
                            <td>{data.developer}</td>
                        </tr>
                        <tr>
                            <th>Requirements</th>
                            <td>{data.requirements}</td>
                        </tr>
                        <tr>
                            <th>Description</th>
                            <td>{data.desc}</td>
                        </tr>
                    </tbody>
                </table>
                <img src={'http://localhost:3001/' + data.cover} alt='' />
            </div>
            {del && <Redirect to='/games' />}
        </div>

    )
}

export default GameInfo;