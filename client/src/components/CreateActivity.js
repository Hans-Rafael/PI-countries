import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postActivity } from '../actions';

//import style from './CreateActivity.module.css';
/* import meditation from './s/images/meditation.png'
import relax from './s/images/relax.png'
import button from './s/images/button.png'; */

const validation = (input) => {
    let errors = {};

    if (!input.name) {
        return errors.name = 'Name field is required'
    }
    if (!input.difficulty || input.difficulty < 1 || input.difficulty > 5) {
        return errors.difficulty = 'Set your difficulty between 1 and 5'
    }
    if (!input.countryId.length) {
        return errors.country = 'Must choose at least one country!'
    }
    if (!input.duration) {
        return errors.duration = 'Set your duration'
    }
    if (!input.season.length) {
        return errors.season = 'Must choose at least one season!'
    }
}

const CreateActivity = () => {

    const dispatch = useDispatch();
    const unOrder = useSelector(state => state.countries);
    const countries = unOrder.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (b.name > a.name) return -1;
        return 0;
    })

    const [input, setInput] = useState({
        name: "",
        difficulty: "",//1-5 
        duration: 0,
        season: "",
        countryId: [],
    })

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setSuccess(false);
        setErrors({});
    }

    const handleCountry = (e) => {
        if (!input.countryId.includes(e.target.value)) {
            setInput({
                ...input,
                countryId: [...input.countryId, e.target.value]
            })
        } /* else {
            setInput({
                ...input,
                countryId: input.countryId.filter(id => id !== e.target.value)
            })
        } */
    }
    const hanndleRemove = (name) => {
        setInput({
            ...input,
            countryId: input.countryId.filter(id => id !== name)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (input.name && input.countryId.length) {
            dispatch(postActivity(input));
            setSuccess(true);
            setInput({
                name: "",
                difficulty: "",
                duration: 0,
                season: "***",
                countryId: [],
            })
        } else {
            setErrors(validation({
                ...input, [e.target.name]: e.target.value
            }));
        }
    }

    return (
        <div >
            <Link to='/home'>
                <div >
                    <img  alt=" imagen del boton" />
                </div>
            </Link>
            <h1 >Tourist activity creation form</h1>

            {/*  <form onSubmit={handleSubmit}> */}
            <form  onSubmit={e => handleSubmit(e)}>

                {errors.name && <p >{errors.name}</p>}
                <input
                    
                    onChange={e => handleChange(e)}
                    type="text"
                    value={input.name}
                    name="name"
                    placeholder="Name"
                />

                <div >
                    <label>Difficulty:{input.difficulty} </label>
                </div>
                <div >
                    <div >0</div>
                    <input
                        
                        type='range'
                        min='1'
                        max='5'
                        value={input.difficulty}
                        name='difficulty'
                        onChange={e => handleChange(e)}
                    />
                    <div >5</div>

                </div>
                {errors.difficulty && <p >{errors.difficulty}</p>}

                <input
                    
                    type="number"
                    name="duration"
                    value={input.duration}
                    onChange={e => handleChange(e)}
                    placeholder="Duration"
                />

                <div >
                    <label>Season:</label>
                    <select name="season" onChange={e => handleChange(e)}>
                        <option selected disables >***</option>
                        <option value="Winter">Winter</option>
                        <option value="Summer">Summer</option>
                        <option value="Fall">Fall</option>
                        <option value="Spring">Spring</option>
                    </select>
                </div>

                <div >
                    <label>CountryId</label>
                    <select name="countryId" onChange={e => handleCountry(e)}>
                        <option selected disables >***</option>
                        {countries.map(country => (
                            <option key={country.id} value={country.id}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                </div>

                {errors.country && <p>
                    {errors.country}</p>}

                <div >{
                    input.countryId.length ?
                        input.countryId.map(id => (
                            <div key={id} >
                                <p>{countries.find(country => country.id === id).name}{id}</p>
                                <span onClick={() => hanndleRemove(id)}> X</span>
                            </div>
                        ))
                        : null
                }</div>

                <button type="submit" > Submit Activity</button>

                {success ?
                    <div >
                        Activity created successfully!
                    </div>
                    : null
                }
            </form>
        </div>
    )
}

//export default CreateActivity;