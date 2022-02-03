import React from 'react';
import { Link } from 'react-router-dom';

//Imagen de la bandera flag
//Nombre pais name
//Continente continent

/* export default function CardPais({ name, continent, flag, id }) {
    //const CardPais = (props) => {
    return (
        <Link to={'/country-details/' + id} >
            <div>
                <img src={flag} alt="flag img not found" width="200px" height="250px" />
                <h3>{name}</h3>
                <h5>{continent}</h5>
            </div>
        </Link>
    );
 }*/

 const CardPais = (data) => {
    const {name, continent, flag, id} = data;

    return (
        <Link 
            to={'/country-details/' + id}
        >
            <img 
                //className={styles.flag}
                src={flag} 
                alt="flag img not found" 
                width="200px" height="250px"
                />
            <div >
                <h2>{name}</h2>
                <h2>{continent}</h2>
            </div>
        </Link>
    )
}

export default CardPais;


