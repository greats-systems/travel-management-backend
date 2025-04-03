
import env from 'dotenv'
import Amadeus from 'amadeus';

env.config()
const amadeus = new Amadeus({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
});

/*
const AMADEUS_API_KEY = process.env.CLIENT_ID
const AMADEUS_API_SECRET = process.env.CLIENT_SECRET
*/

export default async function destinations (request, response) {
    const parameter = request.body.city
    try{
        const apiResponse = await amadeus.referenceData.locations.get({
            keyword: parameter,
            subtype: Amadeus.location.any
        })
        const data = apiResponse.result
        response.status(200).send(data.json())
    }
    catch(e){
        response.status(500).send(e)
    }
}

/*
app.get(`/city-and-airport-search/:parameter`, (req, res) => {
    const parameter = req.params.parameter;
    // Which cities or airports start with the parameter variable
    amadeus.referenceData.locations
        .get({
            keyword: parameter,
            subType: Amadeus.location.any,
        })
        .then(function (response) {
            res.send(response.result);
        })
        .catch(function (response) {
            res.send(response);
        });
});
*/