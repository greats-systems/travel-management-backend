import amadeus from "../../amadeus/amadeus.js";

export default async function flightDeals(request, response) {
  try{
    const apiResponse = await amadeus.shopping.flightDestinations.get(
        { origin : request.body.origin,
         maxPrice : request.body.maxPrice}
       );
       response.status(200).send(apiResponse.data);
  }
  catch(error){
    console.log(error)
    response.status(500).send('Failed to process request')
  }
}
