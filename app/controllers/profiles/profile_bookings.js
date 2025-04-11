import supabase from "../../db/supabase.js";

async function createFlightBooking(request, response) {
  supabase
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
    .order("departure_date", {ascending: false})
    .then((data) => {
      console.log(data.data)
      response.status(200).send(data);
    })
    .catch((error) => {
      response.status(500).send(error);
    });
}

async function getFlightBooking(request, response) {
  supabase
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

export { createFlightBooking, getFlightBooking };
