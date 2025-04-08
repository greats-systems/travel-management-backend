import supabase from "../../db/supabase.js";

async function createFlightBooking(request, response){
    supabase.from('FlightBooking').insert({
        "amadeus_id" : request.body.amadeusID,
        "user_id" : request.body.userID,
        "queueing_office_id" : request.body.queueingOfficeId,
        "itineraries" : request.body.itineraries,
        "travelers":request.body.travelers,
        "price" : request.body.price
    }).then((data)=>{
        response.status(200).send(data)
    }).catch((error)=>{
        response.status(500).send(error)
    })
}

export { createFlightBooking }