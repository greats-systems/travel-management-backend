import Amadeus from "amadeus";
import env from "dotenv";

env.config();

// Initialize Amadeus with .env variables
const amadeus = new Amadeus({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

export default async function getPrices(request, response) {
  try {
    const apiResponse = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: request.body.origin,
      destinationLocationCode: request.body.destination,
      departureDate: request.body.departureDate,
      adults: request.body.adults,
      max: 30
    });
    response.status(200).send(apiResponse.data);
  } catch (error) {
    console.error("Error:", error);
  }
}
