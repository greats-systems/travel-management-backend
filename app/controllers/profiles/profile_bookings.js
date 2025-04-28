import supabase from "../../db/supabase.js";

async function createFlightBooking(request, response) {
  await supabase
    .from("FlightBooking")
    .insert({
      "amadeus_id": request.body.amadeusID,
      "user_id": request.body.userID,
      "queueing_office_id": request.body.queueingOfficeId,
      "itineraries": request.body.itineraries,
      "travelers": request.body.travelers,
      "price": request.body.price,
      "departure_date":request.body.departureDate
    })
    .then((data) => {
      console.log(data.data)
      response.status(201).send(data.statusText);
    })
    .catch((error) => {
      response.status(500).send(error);
    });
}

async function getFlightBooking(request, response) {
  await supabase
    .from("FlightBooking")
    .select("*")
    .eq("user_id", request.body.userID)
    .then((data) => {
      response.status(200).send(data.data);
    })
    .catch((error) => {
      response.status(500).send(error);
    });
}

async function createShuttleBooking(request, response){
  await supabase.from('ShuttleBooking').insert({
    'user_id': request.body.userID,
    'first_name': request.body.firstName,
    'last_name': request.body.lastName,
    'phone_number': request.body.phoneNumber,
    'email': request.body.email,
    'origin': request.body.origin,
    'destination': request.body.destination,
    'departure_date': request.body.departureDate,
    'amount_paid': request.body.amountPaid,
    'status': 'pending'
  })
  .then((data) => {
    if(data.statusText=='Created'){
      response.status(201).send(data.statusText)
    }
    else {
      response.status(400).send(data.error)
    }
  })
  .catch((error) => {
    response.status(500).send(error)
  })
}

async function getShuttleBooking(request, response){
  await supabase
  .from('ShuttleBooking')
  .select('*, ShuttleServiceCompany(name), ShuttleRoutes(origin, destination, departure_time, arrival_time)')
  .eq('user_id', request.body.userID)
  .then((data) => {
    response.status(200).send(data.data)
  })
  .catch((error) => {
    response.status(500).send(error)
  })
}

export { createFlightBooking, getFlightBooking, createShuttleBooking, getShuttleBooking };
