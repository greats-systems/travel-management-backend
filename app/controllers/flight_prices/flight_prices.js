import amadeus from "../../amadeus/amadeus.js";

const commonParams = (body) => ({
  originLocationCode: body.origin,
  destinationLocationCode: body.destination,
  departureDate: body.departureDate,
  adults: body.adults,
  currencyCode: "USD"
});

export default async function getFlightPrices(request, response) {
  try {
    const params = {
      ...commonParams(request.body),
      ...(request.body.returnDate && { returnDate: request.body.returnDate }),
      ...(request.body.travelClass && { travelClass: request.body.travelClass })
    };

    const apiResponse = await amadeus.shopping.flightOffersSearch.get(params);
    response.status(200).json(apiResponse.data);
  } catch (error) {
    console.error("Error fetching flight prices:", error);
    response.status(500).json({ 
      error: "Failed to fetch flight prices",
      details: error.message 
    });
  }
}