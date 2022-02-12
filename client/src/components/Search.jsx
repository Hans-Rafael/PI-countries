import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getName } from '../actions';
import styles from './styles/Search.module.css';

export default function Search({setCurrPage}) {

    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleChange = e =>{
        e.preventDefault();
        setName(e.target.value);
        dispatch(getName(e.target.value)); //because this no need submit botton
       
    }
    
    /* // no need a submit button
        const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(getName(name));
        setName('');
        setCurrPage(1)
    }   
  */
    return (
        <div className={styles.container}>
            <input className={styles.input}
                type="text" 
                placeholder='Search'
                onChange={e => handleChange(e)}
                value={name}
            />
              {/* <button type='submit' onClick={e => handleSubmit(e)}> Search </button>  */} {/*NO NEEDED*/}
        </div>
    )
}


