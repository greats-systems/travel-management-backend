import amadeus from "../../amadeus/amadeus.js";

const findSelectedOffer = (offers, flightId) => {
  const selectedOffer = offers.find(o => o.id === flightId);
  if (!selectedOffer) {
    throw { status: 404, message: 'Selected flight offer not found' };
  }
  return selectedOffer;
};

const priceFlightOffer = async (offer) => {
  const pricingData = {
    data: {
      type: 'flight-offers-pricing',
      flightOffers: [offer]
    }
  };
  return await amadeus.shopping.flightOffers.pricing.post(JSON.stringify(pricingData));
};

const createBooking = async (pricedOffer, travelers) => {
  const bookingData = {
    data: {
      type: 'flight-order',
      flightOffers: [pricedOffer],
      travelers: travelers
    }
  };
  return await amadeus.booking.flightOrders.post(JSON.stringify(bookingData));
};

const handleBookingError = (error) => {
  console.error('Booking error:', error);

  if (error.response?.result?.errors?.length > 0) {
    const errorDetail = error.response.result.errors[0].detail;
    
    if (errorDetail === "No fare applicable") {
      return { status: 404, message: 'This flight is full' };
    }
    if (errorDetail.startsWith("Could not sell segment")) {
      return { status: 404, message: 'No more seats at this price. Would you like to book another flight?' };
    }
    if (errorDetail.includes('Itinerary schedule change detected')) {
      return { status: 404, message: 'Flight schedule has changed. Please book a different flight' };
    }
  }

  return { 
    status: error.status || 500, 
    message: error.message || 'Failed to process booking request'
  };
};

export default async function bookFlight(request, response) {
  try {
    // 1. Search for flight offers
    console.log('Looking for offers')
    const searchResponse = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: request.body.origin,
      destinationLocationCode: request.body.destination,
      departureDate: request.body.departureDate,
      returnDate: request.body.returnDate,
      adults: request.body.adults,
      travelClass: request.body.travelClass,
      currencyCode: "USD"
    });

    // 2. Find and validate selected offer
    console.log('Validating selected offer')
    const selectedOffer = findSelectedOffer(searchResponse.data, request.body.flightId);

    // 3. Price the selected offer
    console.log('Calculating price')
    const pricedResponse = await priceFlightOffer(selectedOffer);

    // 4. Create booking
    console.log('Creating booking')
    const bookingResponse = await createBooking(
      pricedResponse.data.flightOffers[0],
      request.body.passengers
    );

    console.log('Done!\n')

    return response.status(200).json({
      booking: bookingResponse.data,
      pricedOffer: pricedResponse.data
    });

  } catch (error) {
    const { status, message } = handleBookingError(error);
    return response.status(status).json({ error: message });
  }
}