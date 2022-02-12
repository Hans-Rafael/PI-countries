import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postActivity } from '../actions';

import styles from './styles/Creater.module.css';
import button from './styles/images/button.png';


 
const validation = (input) => {
    let errors = {};
//!/^.{3}$/ para nameID or !input.country.length >2 
    if (!input.name) {
        errors.name = 'Name is required';
    } else if (!input.country.length  ) {//^[A-Z].{2,32}$
        errors.country = 'Must choose at least one country!'
    }
return errors;  
}
//////////// CReater function //////////////
const Creater = () => {
   

    const dispatch = useDispatch();
    const unOrdered = useSelector(state => state.countries);
    const countries = unOrdered.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (b.name > a.name) return -1;
        return 0;
    })

    const [input, setInput] = useState({
        name: "",
        difficulty: 0,
        duration: "",
        country: []
    })

    const [error, setError] = useState({});
    const [success, setSuccess] = useState(false);

    const handleChange = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setSuccess(false);
        setError({});
    }

    const handleCountries = e => {
        if (!input.country.includes(e.target.value)) {
            setInput({
                ...input,
                country: [...input.country, e.target.value]
            })
        }
    }

    const handleRemove = name => {
        setInput({
            ...input,
            country: input.country.filter(c => c !== name)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (input.name && input.difficulty && input.country.length) {
            dispatch(postActivity(input));
            setSuccess(true);
            setInput({
                name: "",
                difficulty: 1,
                duration: "",
                season: "---",
                country: []
            })
        } else {
            setError(validation({
                ...input,
                [e.target.name]: e.target.value
            }));
        }

    }

    return (
        <div className={styles.container}>
            <Link to='/home'>
                <div className={styles.butContain}>
                    <img className={styles.button} src={button} alt="" />
                </div>
            </Link>
            <h1 className={styles.title}>Activity Creater Form</h1>

            <form className={styles.form}
                onSubmit={e => handleSubmit(e)}>

                {error.name && <p className={styles.error}>{error.name}</p>}
                <input
                    className={styles.inputName}
                    onChange={e => handleChange(e)}
                    type="text"
                    value={input.name}
                    name="name"
                    placeholder="Name"
                />

                <div className={styles.diff}>
                    <label>Difficulty: {input.difficulty}</label>
                </div>
                <div className={styles.contRange}>
                    <div className={styles.min}>1</div>
                    <input
                        className={styles.inputRange}
                        type="range"
                        min='1'
                        max='5'
                        value={input.difficulty}
                        name="difficulty"
                        onChange={e => handleChange(e)}
                    />
                    <div className={styles.max}>5</div>

                </div>
                {error.difficulty && <p className={styles.error}>{error.difficulty}</p>}

                <input
                    className={styles.inputDuration}
                    type="text"
                    name="duration"
                    value={input.duration}
                    onChange={e => handleChange(e)}
                    placeholder="Duration"
                />

                <div className={styles.season}>
                    <label>Season: </label>
                    <select name="season" onChange={e => handleChange(e)}>
                        <option selected disabled>---</option>
                        <option value="Summer">Summer</option>
                        <option value="Autumn">Autumn</option>
                        <option value="Winter">Winter</option>
                        <option value="Spring">Spring</option>
                    </select>
                </div>

                <div className={styles.countries}>
                    <label>Country/ies: </label>
                    <select name="country" onChange={e => handleCountries(e)}>
                        <option selected disabled>---</option>
                        {countries.map(c => (
                            <option key={c.id} value={c.name}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </div>
                {error.country && <p className={styles.error}>{error.country}</p>}

                <div className={styles.selectedCountries}>{
                    input.country.length
                        ? input.country.map(c => (
                            <div className={styles.selCountryCard} key={c}>
                                <p>{c}</p>
                                <span
                                    className={styles.delete}
                                    onClick={() => handleRemove(c)}
                                >+</span>
                            </div>
                        ))
                        : null
                }</div>

                <button className={styles.submit}
                    type="submit">Create Activity
                </button>

                {success
                    ? <p className={styles.success}>
                        Activity Succesfully Created!
                    </p>
                    : null}

            </form>
        </div>
    )
}

export default Creater;
