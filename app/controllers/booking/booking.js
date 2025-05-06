import amadeus from "../../amadeus/amadeus.js";

export default async function bookFlight(request, response) {
  try {
    // 1. Search for flight offers
    const searchResponse = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: request.body.origin,
      destinationLocationCode: request.body.destination,
      departureDate: request.body.departureDate,
      returnDate: request.body.returnDate,
      adults: request.body.adults,
      travelClass: request.body.travelClass,
      currencyCode: "USD"
    });

    // 2. Find selected offer
    const selectedOffer = searchResponse.data.find(o => o.id === request.body.flightId);
    if (!selectedOffer) {
      return response.status(404).json({ error: 'No flight offers available' });
    }

    console.log('Selected offer:', selectedOffer);

    // 3. Price the selected offer
    const pricedResponse = await amadeus.shopping.flightOffers.pricing.post(
      JSON.stringify({
        data: {
          type: 'flight-offers-pricing',
          flightOffers: [selectedOffer] 
        }
      })
    );

    console.log('Priced flight offer:', pricedResponse.data);

    // 4. Create booking
    const bookingResponse = await amadeus.booking.flightOrders.post(
      JSON.stringify({
        data: {
          type: 'flight-order',
          flightOffers: [pricedResponse.data.flightOffers[0]],
          travelers: request.body.passengers
        }
      })
    );

    return response.status(200).json(bookingResponse.data);

  } catch (error) {
    console.error('Booking error:', error);

    // Handle specific error cases
    if (error.response?.result?.errors?.length > 0) {
      const errorDetail = error.response.result.errors[0].detail;
      
      switch (true) {
        case errorDetail === "No fare applicable":
          return response.status(404).json({ error: 'This flight is full' });
          
        case errorDetail.startsWith("Could not sell segment"):
          return response.status(404).json({ 
            error: 'No more seats at this price. Would you like to book another flight?' 
          });
          
        case errorDetail.includes('Itinerary schedule change detected'):
          return response.status(404).json({ 
            error: 'Flight schedule has changed. Please book a different flight' 
          });
      }
    }

    // Generic error response
    return response.status(500).json({ 
      error: 'Failed to process booking request',
      details: error.message 
    });
  }
}