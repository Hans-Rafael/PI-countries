import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../actions';///3 nuevos
//import {Creater} from './Creater';
//import axios from 'axios';

import styles from './styles/Creater.module.css';
import button from './styles/images/button.png';

const Details = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const detail = useSelector((state) => state.detail)
    console.log('soy el params de DEtails components:', params);// recive el id del pais

    useEffect(() => {
        dispatch(getDetail(params.id));     // .id 
    }, [dispatch, params.id]);


    console.log('ARRAY detail.Activities en DEtails componets: ', detail.activities);

    return (
        <div >
             {/* <div className={styles.container}>
                <Link to='/home'>
                    <div className={styles.butContain}>
                        <img className={styles.button} src={button} alt=" img button not found" />
                    </div>
                </Link>
            </div>  */}

            
            <h2>{detail.name}</h2>
            <div >
                <img src={detail.flag} alt="Flag" />
            </div>
            <h3>Code: {detail.id}</h3>
            <h3>Capital: {
                detail.capital !== 'undefined'
                    ? detail.capital
                    : '-'
            }</h3>
            <h3>Subregion: {
                detail.subregion !== 'undefined'
                    ? detail.subregion
                    : '-'
            }</h3>
            <h3>Area: {detail.area} Km2</h3>
            <h3>Population: {detail.population}</h3>
            <h3>Activities: </h3>
             <ul>{detail.activities?.length?
                detail.activities.map(act => (
                    <li key={act.id}>
                        {`${act.name} - `}
                        {act.duration ? ` ${act.duration} - ` : null}
                        {act.season ? ` ${act.season} - ` : null}
                        Difficulty: {act.difficulty}
                    </li>
                ))
                : 'No activities for this country'
            }</ul> 
        </div>

    )


}


export default Details;