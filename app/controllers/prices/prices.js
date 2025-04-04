import Amadeus from "amadeus";
import env from "dotenv";

env.config();

// Initialize Amadeus with .env variables
const amadeus = new Amadeus({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

export default async function getPrices(request, response) {
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
        // travelClass: request.body.cabin,
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
        // max: 1,
      });
      response.status(200).send(apiResponse.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }
}
