import amadeus from "../../amadeus/amadeus.js";

export default async function bookFlight(request, response) {
  var selectedOffer
  try {
    // const { flightId, passengers, payment } = request.body
    const search = await await amadeus.shopping.flightOffersSearch.get({
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
    selectedOffer = search.data.find(o => o.id === request.body.flightId)
    console.log(`Offer:\n${selectedOffer}`)
    const pricedResponse = await amadeus.shopping.flightOffers.pricing.post(
        JSON.stringify({
            data:{
                type: 'flight-offers-pricing',
                flightOffers: [selectedOffer] 
            }
        })
    )
    console.log(`Flight offers:\n${pricedResponse.data}`)
    const bookingResponse = await amadeus.booking.flightOrders.post(
        JSON.stringify({
            data: {
                type: 'flight-order',
                flightOffers: [pricedResponse.data.flightOffers[0]],
                travelers: request.body.passengers

            }
        })
    )
    response.status(200).send(bookingResponse.data)

  } catch (error) {    
    if(error.response.result.errors[0].detail==="No fare applicable"){
      console.log(error)
      response.status(404).send('This flight is full')
    }
    else if(error.response.result.errors[0].title===`SEGMENT SELL FAILURE`){
      response.status(404).send('There are no more flights available at this price. Would you like to book another one?')
    }
    else if (selectedOffer == null){
      response.status(404).send('No flight offers available')
    }
    else if(error.response.result.errors[0].detail==='Itinerary schedule change detected between segments requested and actual segment sell is exceeding 15 minutes'){
      response.status(404).send('This flight\s booking schedlue has changed. Kindly book a different flight')
    }
    else {
      console.log(error)
      response.status(500).send("Failed to process request");
    }
  }
}
