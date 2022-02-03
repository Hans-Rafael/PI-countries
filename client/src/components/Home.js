import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { render } from 'react-dom';
import { getCountries,filterContinent,getActivities,filterActivity,
        orderName,orderPopulation } from '../actions';
import { Link } from 'react-router-dom';
import CardPais from './CardPais';
import SearchBar from './SearchBar';
import Pagination from './Pagination';



const Home = () => {

    const dispatch = useDispatch();
    const Countries = useSelector(state => state.countries);
    const activities = useSelector(state => state.activities);

    useEffect(() => {
        dispatch(getCountries());
        dispatch(getActivities());
    }, [dispatch])

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(getCountries());
        dispatch(getActivities());
    }

    ////pagino///
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const indexOfLastCountry = currentPage * postsPerPage;
    const indexOfFirstCountry = indexOfLastCountry - postsPerPage;
    const currentCountries = Countries.slice(indexOfFirstCountry, indexOfLastCountry);

    const paginate = pageNumber => { setCurrentPage(pageNumber) };

    //ordeno y filtro////

    const [filter, setFilter] = useState({
        nameOrder: 'alphabetical',
        continent: 'Mainland',
        population: 'population',
        activity: 'activities',
    });

    const handleContinent = (e) => {
        dispatch(filterContinent(e.target.value));
        setFilter({
            ...filter, continent: e.target.value,
            activity: 'activities', nameOrder: 'alphabetical', population: 'population',
        });
        setCurrentPage(1);
    }

    const handleAlphabetical = (e) => {
        dispatch(orderName(e.target.value));
        setFilter({
            ...filter, nameOrder: e.target.value, population: 'Population'
        });
        setCurrentPage(1);
    }
    const handlePopulation = (e) => {
        dispatch(orderPopulation(e.target.value));
        setFilter({
            ...filter, population: e.target.value, nameOrder: 'alphabetical'
        });
        setCurrentPage(1);
    }
    const handleActivity = (e) => {
        dispatch(filterActivity(e.target.value));
        setFilter({
            ...filter, activity: e.target.value, nameOrder: 'alphabetical', population: 'population',
            continent: 'Mainland',
        });
        setCurrentPage(1);
    }



    ////////imput/////////////////
    return (
        <div>
            <nav>
                <div>
                    <SearchBar setCurrentPage={setCurrentPage} />
                    <div onClick={e => handleClick(e)}>
                       {/*  <img   alt="img reload" /> */}
                    </div>
                </div>
                <div>
                    <select onChange={e => handleContinent(e)} value={render.continent}>
                        <option value="worldwide">worldwide</option>
                        <option value="Africa">Africa</option>
                        <option value="Americas">Americas</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Antartic">Antartic</option>
                        <option value="Oceania">Australia</option>
                    </select>
                    <select onChange={e => handleAlphabetical(e)} value={render.nameOrder}>
                        <option select disable>Alphabetic</option>
                        <option value="A-Z"> A to Z</option>
                        <option value="Z-A"> Z to A</option>
                    </select>

                    <select onchange={e => handleActivity(e)} value={render.activity}>
                        <option select disable>Activity</option>
                        {activities.map(activity => (
                            <option key={activity.id} value={activity.name}>{activity.name}</option>
                        ))}
                    </select>
                    <select onChange={e => handlePopulation(e)} value={render.population}>
                        <option select disable>Population</option>
                        <option value="ascending">Ascending</option>
                        <option value="descending">Descending</option>
                    </select>
                </div>

                    <div>
                        <Link to="/create-activity">
                            Create Activity
                        </Link>
                    </div>
            </nav>

            <div >
                {currentCountries.length ?
                    currentCountries.map(country => (
                        <div key={country.id}>
                            <CardPais
                                name={country.name}
                                id={country.id}
                                continent={country.continent}
                                flag={country.flag} />
                        </div>
                    ))
                    : <h2>No countries found</h2>
                }

            </div>

            < Pagination 
            postsPerPage={postsPerPage}
            totalPosts={Countries.length}
            paginate={paginate} 
            filter={filter}
            />
        </div>
    );
}
   
export default Home;