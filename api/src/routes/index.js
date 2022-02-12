const { Router, response } = require('express');
const axios = require('axios');
const { Op, where } = require('sequelize');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Country, Activity } = require('../db');
const router = Router();

//creo database contry con info from api

const apiInfo = async () => {
    const api = await axios.get('https://restcountries.com/v3.1/all');
    const info = await api.data.map(country => {
        Country.findOrCreate({
            where: {
                id: country.cca3,
                name: country.name.common,
                flag: country.flags.png,
                continent: country.region,
                subregion: (country.subregion ? country.subregion : typeof country.subregion),// country.subregion,
                capital: country.capital ? country.capital[0] : 'There is not a Capital',//country.capital,
                area: country.area,
                population: country.population
            }
        })
    })
}

// creo dabatase activity
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

//GET /countries?name="..."
router.get('/countries', async (req, res) => {
    const { name } = req.query;
    if (name) {
        const dbCountry = await Country.findAll({
            where: { name: { [Op.iLike]: `%${name}%` } }
        })

        return res.send(dbCountry)
    }

    let dbCountries = await dbInfo();

    if (dbCountries.length) {
        res.send(dbCountries);

    } else {
        const info = await getApi();
        info.forEach(c => {
            Country.findOrCreate({
                where: {
                    id: c.id,
                    name: c.name,
                    image: c.image,
                    continent: c.continent,
                    capital: c.capital,
                    subregion: c.subregion,
                    area: c.area,
                    population: c.population,
                }
            })
        })

        dbCountries = await getDB();
        res.json(dbCountries);
    }
});

//[ ] GET /countries/{idPais}: 
//Devuelve toda la información de un país.

router.get("/countries/:id", async (req, res) => {
    const countryId = req.params.id;
    console.log(countryId);

    const countryById = await Country.findByPk(countryId, {
        include: {
            model: Activity,
        },
    });

    return res.send(countryById);
});

// .post  '/activity'
//////////////////////////////////

router.post("/activity", async (req, res) => {
    const { name, difficulty, duration, season, countryId } = req.body
    try {
        /* if (!name || !countryId || countryId.length() !== 3 || difficulty % 2 !== 0 || difficulty < 1 || difficulty > 5 || !season) {
           return res.status(400).send('Error: Missing parameters or wrong format,countryId most be 3 country first leters, difficulty must be an even number between 1 and 5, season must be a string');
       }  */

        const activityCreated = await Activity.create({
            name: name.toLowerCase(),
            difficulty: difficulty, //.toString(),//un string entro 1-5
            duration: parseInt(duration),
            season: season.toLowerCase() // summer, fall, winter, spring
        })
        const countryDb = await Country.findAll({
            where: { id: countryId.toUpperCase() } // 3 letras upercase

        })
        activityCreated.addCountry(countryDb)
        res.send("Creacion Exitosa")
    }

    catch (error) {
        console.error(error);
        res.send(error);
    }
})

//////////////////////////////////


// get /activity

router.get('/activity', async function (req, res) {
    try {
        const activities = await Activity.findAll()
        res.send(activities)
    } catch (error) {
        //next(error)
        console.log(error)
    }
})



apiInfo();
module.exports = router;
