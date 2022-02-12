 import axios from 'axios';

export function getCountries (){
    return async (dispatch)=>{
        let json = await axios("http://localhost:3001/countries");
        return dispatch({
            type: 'GET_COUNTRIES',
            payload: json.data
        })
    }
}

export const filterContinent = payload =>{
    return {
        type: 'FILTER_CONTINENT',
        payload
    }
}

export const getActivities = () =>{
    return async (dispatch)=>{
        try{
        let json = await axios("http://localhost:3001/activity");
        return dispatch({
            type: "GET_ACT",
            payload: json.data
        })
        }catch(err){
            console.log(err)
        }
    }
}

export const filterActivity = payload =>{
    return {
        type: "FILTER_ACT",
        payload
    }
}
//form or payload
export const postActivity = (form)=>{
    return async (dispatch)=>{
        const response = await axios.post('http://localhost:3001/activity', form);
        return dispatch({
            type: 'POST_ACT',
            payload: response
        })
    }
}

export const orderName = payload =>{
    return {
        type: "ORDER_NAME",
        payload
    }
}

export const orderPopulation = payload =>{
    return {
        type: "ORDER_POPULATION",
        payload
    }
}

export const getName = name => {
    return async (dispatch)=>{
        try {
            let json = await axios(`http://localhost:3001/countries?name=${name}`);
            return dispatch({
                type: 'GET_NAME',
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    } 
}


export const getDetail = id =>{
   // console.log('ESToy en GET Action DEtalil ', id);////
    return async dispatch =>{
        try {
            let json = await axios( `http://localhost:3001/countries/${id}`);
            return dispatch({
                type: 'GET_DETAIL',
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}  