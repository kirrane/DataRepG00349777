import React, { useEffect, useState } from 'react';
import classes from './Form.module.css';
import axios from 'axios';

const Form = (props) => {
    const [newGame, setNewGame] = useState(null);
    // const [name, setName] = useState(null);
    const info = {
        name: null,
        developer: null,
        release: null,
        desc: null,
        requirements: null,
        cover: null
    }

    const clickHandler = (e, obj) => {
        e.preventDefault();
        const arr = Object.values(info);
        let set = true;
        for (let i = 0; i < arr.length; i++) {
            if (!arr[i]) {
                set = false;
                return;
            }
        }
        if (set) {
            const keys = Object.keys(obj);
            let formData = new FormData();
            for (let i = 0; i < keys.length; i++) {
                formData.append(keys[i], obj[keys[i]])
            }
            setNewGame(formData);
        }
    }
    useEffect(() => {
        if (newGame) {
            axios.post('http://localhost:3001/api/games', newGame)
                .then((res) => { props.history.push('/games') })
                .catch((err) => console.log(err))
        }
        return () => setNewGame(null);
    }, [newGame, props.history])
    return (
        <div className={classes.FormContainer}>
            <h3>Add a new game</h3>
            <form className={classes.Form} encType="multipart/form-data" >
                <input className={classes.Input} name='name' type='text' onChange={(e) => info.name = e.target.value} required placeholder='Name' />
                <input className={classes.Input} name='developer' type='text' onChange={(e) => info.developer = e.target.value} required placeholder='Developer' />
                <input className={classes.Input} name='release' type='text' onChange={(e) => info.release = e.target.value} required placeholder='Release Date' />
                <input className={classes.Input} name='requirements' type='text' onChange={(e) => info.requirements = e.target.value} required placeholder='Basic Requirements i.e. cpu,ram,graphics Card' />
                <textarea name='desc' type='text' rows='5' cols='10' required onChange={(e) => info.desc = e.target.value} placeholder='A brief description of the game....' />
                <label className={classes.Upload} >
                    <input className={classes.input} name='cover' type='file' onChange={(e) => info.cover = e.target.files[0]} required accept="image/png,image/jpeg" />
                    <span>+</span>
                </label>
                {/* {name && <label>{name}</label>} */}
                <button className={classes.Button} onClick={(e) => { clickHandler(e, info) }} >Create</button>
            </form>
        </div>
    )
}

export default Form;