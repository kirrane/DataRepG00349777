import React, { useState, useEffect } from 'react';
import classes from './Edit.module.css';
import axios from 'axios';

const Edit = (props) => {
    const [updatedData, setUpdatedData] = useState(null);
    const [data, setData] = useState({});
    useEffect(() => {
        axios.get('http://localhost:3001/api/games/' + props.location.pathname.slice(6))
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => console.log(err))
        return () => setData({})
    }, [props.location.pathname]);

    const clickHandler = (e, obj) => {
        console.log('handler')
        e.preventDefault();
        const arr = Object.values(obj);
        let set = true;
        for (let i = 0; i < arr.length - 1; i++) {
            if (!arr[i]) {
                set = false;
                return;
            }
        }
        if (set) {
            setUpdatedData(obj);
        }
    }

    useEffect(() => {
        if (updatedData) {
            axios.put('http://localhost:3001/api/games/' + props.location.pathname.slice(6), updatedData)
                .then((res) => { props.history.push('/games') })
                .catch((err) => console.log(err));
        }
        return () => setUpdatedData(null);
    }, [updatedData, props.location.pathname, props.history])

    return (
        <div className={classes.FormContainer}>
            <h3>Leave blank if no change is required</h3>
            <form className={classes.Form}>
                <input className={classes.Input} name='name' type='text' onChange={(e) => data.name = e.target.value} defaultValue={data.name} />
                <input className={classes.Input} name='developer' type='text' onChange={(e) => data.developer = e.target.value} defaultValue={data.developer} />
                <input className={classes.Input} name='release' type='text' onChange={(e) => data.release = e.target.value} defaultValue={data.release} />
                <input className={classes.Input} name='requirements' type='text' onChange={(e) => data.requirements = e.target.value} defaultValue={data.requirements} />
                <textarea name='desc' type='text' rows='5' cols='10' onChange={(e) => data.desc = e.target.value} defaultValue={data.desc} />
                <button className={classes.Button} onClick={(e) => clickHandler(e, data)} >Done</button>
            </form>
        </div>
    )
}

export default Edit;