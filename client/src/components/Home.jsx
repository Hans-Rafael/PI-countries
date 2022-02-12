import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    getCountries, filterContinent, filterActivity,
    orderName, orderPopulation, getActivities
} from '../actions';
import CountryCard from './CountryCard';
import Paging from './Paging';

import Search from './Search';
import refresh from './styles/images/refresh64.png';
import styles from './styles/Home.module.css';



const Home = () => {
    //Hooks de redux para traer los estados
    const dispatch = useDispatch();
    const countries = useSelector(state => state.renderCountries);
    const activities = useSelector(state => state.activities);
    //
    const [checked, setChecked] = useState(
        localStorage.getItem("theme") === "dark" ? true : false
    );


    /////// PAGINADO ////////////////////////////////////////////

    const [currPage, setCurrPage] = useState(1);//pagina actual en 1
    const countriesOnPage = 10; //la cantidad de paises que se muestran por pagina
    const indxLastCountry = currPage * countriesOnPage; //indice del ultimo pais que se muestra
    const indxFirstCountry = indxLastCountry - countriesOnPage; //indice del primer pais que se muestra

    const currCountries = countries.slice(indxFirstCountry, indxLastCountry); //paises que se muestran en la pagina actual


    const pages = (pagNum) => {
        setCurrPage(pagNum);
    }

    useEffect(() => {
        dispatch(getCountries());
        dispatch(getActivities());
    }, [dispatch])

    const handleClick = e => {
        e.preventDefault();
        dispatch(getCountries());
        dispatch(getActivities());
    }
    ///
    useEffect(() => {
        document
            .getElementsByTagName("HTML")[0]
            .setAttribute("data-theme", localStorage.getItem("theme"));
    }, [checked]);
    //////////ORDENADORES Y FILTERS////////////////////////////

    const [render, setRender] = useState({
        alpha: 'Alphabetic',
        continent: 'All',
        population: 'Population',
        act: 'Activities'
    });

    const handleContinent = (e) => {
        dispatch(filterContinent(e.target.value));
        setRender({
            ...render, continent: e.target.value,
            act: 'Activities', alpha: 'Alphabetic', population: 'Population'
        });
        setCurrPage(1);
    }

    const handleAlphabet = e => {
        dispatch(orderName(e.target.value))
        setRender({ ...render, alpha: e.target.value, population: 'Population' });
        setCurrPage(1);
    }

    const handlePop = e => {
        dispatch(orderPopulation(e.target.value))
        setRender({ ...render, population: e.target.value, alpha: 'Alphabetic' });
        setCurrPage(1);
    }

    const handleActivity = e => {
        dispatch(filterActivity(e.target.value));
        setRender({
            ...render, act: e.target.value,
            continent: 'All', population: 'Population',
            alpha: 'Alphabetic'
        });
        setCurrPage(1);
    }
    //
    const toggleThemeChange = () => {
        if (checked === false) {
            localStorage.setItem("theme", "dark");
            setChecked(true);
        } else {
            localStorage.setItem("theme", "light");
            setChecked(false);
        }
    };

    ////////// Input ////////////

    return (
        
            <div className={styles.home}>
                <nav className={styles.navbar}>
                    <div className={styles.searchSection}>
                        <Search />

                        <div onClick={e => handleClick(e)}
                            className={styles.butContain}>
                            <img className={styles.button} src={refresh} alt="" />
                        </div>
                        <div>Reload</div>
                    </div>

                    <div className={styles.sortSection}>
                        <select onChange={e => handleContinent(e)} value={render.continent}  >
                            <option value="wrld">Continets</option>     {/* //All */}
                            <option value="Americas">Americas</option>
                            <option value="Africa">Africa</option>
                            <option value="Asia">Asia</option>
                            <option value="Antarctic">Antartic</option>
                            <option value="Europe">Europe</option>
                            <option value="Oceania">Oceania</option>
                        </select>

                        <select onChange={e => handleActivity(e)} value={render.act} >
                            <option selected disabled>Activities</option>
                            {activities.map(act => (
                                <option key={act} value={act}>
                                    {act}
                                </option>
                            ))}
                        </select>

                        <select onChange={e => handleAlphabet(e)} value={render.alpha}>
                            <option selected disabled>Alphabetic</option>
                            <option value="A-Z">A to Z</option>
                            <option value="Z-A">Z to A</option>
                        </select>

                        <select onChange={e => handlePop(e)} value={render.population}>
                            <option selected disabled>Population</option>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>
                    {/* <div>
                    <button> Day/Night   </button>
                </div> */}

                    <div className={styles.createSection}>
                        <Link className={styles.create} to='/activity'>
                            Create Activity
                        </Link>
                    </div>
                </nav>

                <div className={styles.cardsContainer} >
                    {currCountries.length ? currCountries.map(c => (
                        <div className={styles.card} key={c.id}>
                            <CountryCard
                                id={c.id}
                                name={c.name}
                                continent={c.continent}
                                image={c.flag} />
                        </div>
                    ))
                        : <h2>Country not found</h2>
                    }

                </div>
                <div className={styles.title}>
                    Page:  {currPage}
                </div>

                {/* // renderizo la paginacion */}

                <Paging
                    countriesOnPage={countriesOnPage}
                    countries={countries.length}
                    pages={pages}
                    currPage={currPage}
                />
            </div>
        
    )
}

export default Home
