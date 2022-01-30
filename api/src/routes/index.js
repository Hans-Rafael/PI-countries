const { Router, response } = require('express');
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Country, Activity } = require('../db');
const router = Router();

// Configurar los routers https://restcountries.com/v3.1/name/{name}
// Ejemplo: router.use('/auth', authRouter);//https://restcountries.com/v3.1/all
const apiInfo = async () => {
    const api = await axios.get('https://restcountries.com/v3.1/all');
    const info = await api.data.map(country => {
        return {
            id: country.cioc,
            name: country.name.common,
            flag: country.flags.png,
            continent: country.region,
            subregion: country.subregion,
            capital: country.capital,
            area: country.area,
            population: country.population,
        }
    });
    return (info);
};
const dbInfo = async () => {
    return await Country.findAll({
        include: {
            model: Activity,
            attributes: ['name', 'difficulty', 'duration', 'season'],
            through: {
                attributes: [],
            }
        }
    })
};
const AllInfo = async () => {
    const api = await apiInfo();
    const db = await dbInfo();
    const infoTotal = api.concat(db);
    return infoTotal;
};
//console.log('info de la api :'+ apiInfo());
//GET /countries?name="..."
router.get('/countries', async (req, res) => {
    const name = req.query.name;
    let countriesTotal = await apiInfo();
    if (name) {
        countriesTotal = countriesTotal.filter(country => country.name.toLowerCase().includes(name.toLowerCase()));
        countriesTotal ?
            res.status(200).json(countriesTotal) :
            res.status(404).json({ message: 'No se encontraron países con ese nombre' });
    }
    else {
        res.status(200).json(countriesTotal);
    }
});

//[ ] GET /countries/{idPais}:  
router.get('/countries/:id', async (req, res) => {
    const { id } = req.params;
    const dbCountry = await Country.findAll({
        where: { id: id.toUpperCase() },
        include: {
            model: Activity,
            attributes: ['name', 'difficulty', 'duration', 'season', 'id'],
            through: {
                attributes: []
            }
        }
    })

    dbCountry.length
        ? res.status(200).send(dbCountry)
        : res.status(404).send('Country not found')

});

router.post('/activity',async (req,res) => { 
    let{
        name,
        difficulty,
        duration,
        season,
    } = req.body;
    let activityCreated = await Activity.create({
        name,
        difficulty,
        duration,
        season,
    });
    let dbCountry = await Country.findAll({
        where: { name: country },
    })
    activityCreated.addCountry(dbCountry);
    res.status(200).send('activity Created');
} )


module.exports = router;
