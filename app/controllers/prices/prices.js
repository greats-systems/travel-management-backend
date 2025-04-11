import amadeus from "../../amadeus/amadeus.js";

export default async function getFlightPrices(request, response) {
  if (request.body.returnDate != null) {
    try {
      const apiResponse = await amadeus.shopping.flightOffersSearch.get({
        originLocationCode: request.body.origin,
        destinationLocationCode: request.body.destination,
        departureDate: request.body.departureDate,
        returnDate: request.body.returnDate,
        adults: request.body.adults,
        // children: request.body.children,
        // infants: request.body.infants,
        travelClass: request.body.travelClass,
        currencyCode: "USD"
        // max: 1,
      });
      response.status(200).send(apiResponse.data);
    } catch (error) {
      console.error("Error:", error);
    }
  } else {
    try {
      const apiResponse = await amadeus.shopping.flightOffersSearch.get({
        originLocationCode: request.body.origin,
        destinationLocationCode: request.body.destination,
        departureDate: request.body.departureDate,
        adults: request.body.adults,
        currencyCode: "USD"
        // max: 1,
      });
      // console.log(apiResponse.data)
      response.status(200).send(apiResponse.data);
    } catch (error) {
      console.error("Error:", error);
      response.status(500).send(error)
    }
  }
}
