import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import env from 'dotenv'

import prices from './app/routes/prices/prices.js'

env.config()

const app = express()
const PORT = 5000

app.use(bodyParser.json())
app.use(cors({origin: 'http://localhost:4200'}))

import Amadeus from 'amadeus';
const amadeus = new Amadeus({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
});
app.get(`/city-and-airport-search/:parameter`, (req, res) => {
    const parameter = req.body.parameter;
    // Which cities or airports start with the parameter variable
    amadeus.referenceData.locations
        .get({
            keyword: parameter,
            subType: Amadeus.location.any,
        })
        .then(function (response) {
            res.status(200).send(response.result);
        })
        .catch(function (response) {
            res.status(500).send(response);
        });
});

app.get(`/`, (_, res) => {
    res.status(200).send('Welcome')
})

prices(app)

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))