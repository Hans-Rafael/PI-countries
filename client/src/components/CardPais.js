import React from 'react';
import { Link } from 'react-router-dom';

//Imagen de la bandera flag
//Nombre pais name
//Continente continent

export default function CardPais({ name, continent, flag, id }) {
    return (
        <Link to={'/country-details/' + id} >
            <div>
                <img src={flag} alt="flag img not found" width="200px" height="250px" />
                <h3>{name}</h3>
                <h5>{continent}</h5>
            </div>
        </Link>
    );
}

