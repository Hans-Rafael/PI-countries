import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/CountryCard.module.css'; ///////important


    
export default function CountryCard ({name, image, continent, id}){

    return (
        <Link className={styles.container}
            to={`/countries/${id}`} /* -details */
        >
            <img 
                className={styles.flag}
                src={image} 
                alt="country-flag" 
                />
            <div className={styles.description}>
                <h2>{name}</h2>
                <p>{continent}</p>
            </div>
        </Link>
    )
}


