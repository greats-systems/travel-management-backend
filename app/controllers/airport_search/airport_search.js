import Amadeus from 'amadeus'

const amadeus = new Amadeus({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
})

exports.searchAirportCity = async (request, response) => {
    const parameter = request.params.parameter
    amadeus.referenceData.locations.get({
        keyword: parameter,
        subType: Amadeus.location.any,
    })
    .then((response) => {
        response.status(200).send(response.result)
    })
    .catch((error) => {
        response.status(500).send(error)
    })

}