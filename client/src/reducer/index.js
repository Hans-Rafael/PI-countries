const initialState = {
    renderCountries: [],
    countries: [],
    detail: [],
    activities: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_COUNTRIES':
            return {
                ...state,
                renderCountries: action.payload,
                countries: action.payload
            }

        case 'FILTER_CONTINENT':
            const allCountries = state.countries;
            const filtered = action.payload === 'continet' ? allCountries
                : allCountries.filter(c => c.continent === action.payload)
            return {
                ...state,
                renderCountries: filtered
            }

        case 'GET_ACT':
            const allActNames = action.payload.map(e => e.name);
            const actSet = new Set(allActNames);
            return {
                ...state,
              activities: [...actSet]
               
            }


        case 'FILTER_ACT':
            const all = state.countries;
            const filter = all.filter(country => {
                let countryAct = country.activities.map(el => el.name);
                return countryAct.includes(action.payload) ? country
                    : null
            })
            return {
                ...state,
                renderCountries: filter
            }

        case 'ORDER_NAME':
            const showing = state.renderCountries;
            const orderedName = action.payload === 'A-Z'
                ? showing.sort((a, b) => {
                    if (a.name > b.name) return 1;
                    if (b.name > a.name) return -1;
                    return 0;
                })
                : action.payload === 'Z-A'
                    ? showing.sort((a, b) => {
                        if (a.name > b.name) return -1;
                        if (b.name > a.name) return 1;
                        return 0;
                    })
                    : showing
                ;
            return {
                ...state,
                renderCountries: orderedName
            }

        case 'ORDER_POPULATION':
            const rendering = state.renderCountries;
            const orderedPop = action.payload === 'asc'
                ? rendering.sort((a, b) => {
                    if (a.population > b.population) return 1;
                    if (b.population > a.population) return -1;
                    return 0;
                })
                : rendering.sort((a, b) => {
                    if (a.population > b.population) return -1;
                    if (b.population > a.population) return 1;
                    return 0;
                });
            return {
                ...state,
                renderCountries: orderedPop
            }

        case 'GET_NAME':
            return {
                ...state,
                renderCountries: action.payload
            }

        case 'GET_DETAIL':
            return {
                ...state,
                detail: action.payload
            }

        case 'POST_ACT':
            return {
                ...state,
                activities: [...state.activities, action.payload]
            }

        default:
            return state;
    }
}

export default rootReducer;