import axios from 'axios';

export function getCountries() {
    return async function (dispatch) {
        let json = await axios.get("/countries");
        return dispatch({
            type: 'GET_COUNTRIES',
            payload: json.data

        })
    }

}

export const filterContinent = (payload) => {
    return {
        type: 'FILTER_CONTINENT',
        payload: payload
    }
}

export const getActivities = () => {
    return async function (dispatch) {
        let json = await axios.get("/activities");
        return dispatch({
            type: 'GET_ACTIVITIES',
            payload: json.data

        })
    }
}

export const filterActivity = (payload) => {
    return {
        type: 'FILTER_ACTIVITY',
        payload: payload
    }
}

export const orderName = (payload) => {
    return {
        type: 'ORDER_NAME',
        payload: payload
    }
}

export const orderPopulation = (payload) => {
    return {
        type: 'ORDER_POPULATION',
        payload: payload
    }
}

export const postActivity = (form) => {
    return async function (dispatch) {
 /*var respuesta*/ let json = await axios.post("/activities", form);
        return dispatch({
            type: 'POST_ACTIVITY',
            payload: json.data //respuesta

        })
    }
}

export const deleteActivity = (id) => {
    return async function (dispatch) {
        let json = await axios.delete("/activities/" + id);
        return dispatch({
            type: 'DELETE_ACTIVITY',
            payload: json.data

        })
    }
}
export const getName = (name) => {
    return async (dispatch) => {
        try{
            let json = await axios.get("/countries?name=" + name);
            return dispatch({
                type: 'GET_NAME',
                payload: json.data
            })
        } catch (e) {
            console.log(e);
        }
    }
}

export const getDetail = (id) => {
    return async (dispatch) => {
        try{
            let json = await axios.get(`/countries/${id}`);
            return dispatch({
                type: 'GET_DETAIL',
                payload: json.data
            })
        } catch (e) {
            console.log(e);
        }
    }
}