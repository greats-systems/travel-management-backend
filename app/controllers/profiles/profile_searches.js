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
        'current_location_lat': request.body.currentLocationLat,
        'current_location_long': request.body.currentLocationLong
    })
    .then((data) => {
        if(data.status == 201){
            response.status(201).send(data.statusText)
        }     
        else{
            response.status(data.status).send(data.error.message)
        }
    })
    .catch((error) => {
        console.log(error)
        response.status(500).send(error)
    })
}

async function createShuttleInterest(request, response){
    supabase.from('ShuttleInterest').insert({
        'origin': request.body.origin,
        'destination': request.body.destination,
        'departure_date': request.body.departureDate,
        'user_id': request.body.userID,
        'current_location_lat': request.body.currentLocationLat,
        'current_location_long': request.body.currentLocationLong
    })
    .then((data) => {
        response.status(201).send(data.statusText)
    })
    .catch((error) => {
        response.status(500).send(error)
    })
}

export { createFlightInterest, createShuttleInterest }