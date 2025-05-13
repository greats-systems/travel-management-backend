
import amadeus from '../../amadeus/amadeus.js'

export default async function getDestinations (request, response) {
    const parameter = request.body.city
    try{
        const apiResponse = await amadeus.referenceData.locations.get({
            keyword: parameter,
            subtype: amadeus.location.any
        })
        const data = apiResponse.result
        response.status(200).send(data.json())
    }
    catch(e){
        response.status(500).send(e)
    }
}
