import supabase from "../../db/supabase.js";

async function createFlightInterest(request, response) {
    supabase.from('FlightInterest').insert({
        'origin' : request.body.origin,
        'destination' : request.body.destination,
        'departure_date' : request.body.departureDate,
        'return_date' : request.body.returnDate,
        'one_way' : request.body.oneWay,
        'adults' : request.body.adults,
        'user_id' : request.body.userID,
    })
    .then((data) => {
        response.status(200).send(data.statusText)
    })
    .catch((eror) => {
        response.status(500).send(eror)
    })
}

async function createShuttleInterest(request, response){
    supabase.from('ShuttleInterest').insert({
        'origin': request.body.origin,
        'destination': request.body.destination,
        'departure_date': request.body.departureDate,
        'user_id': request.body.userID
    })
    .then((data) => {
        response.status(200).send(data.statusText)
    })
    .catch((error) => {
        response.status(500).send(error)
    })
}

export { createFlightInterest, createShuttleInterest }