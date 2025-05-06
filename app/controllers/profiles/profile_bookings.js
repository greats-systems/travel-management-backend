import supabase from "../../db/supabase.js";

// Helper function for consistent error responses
const handleResponse = (response, data, successStatus = 200) => {
  if (data.error) {
    console.error('Database error:', data.error);
    return response.status(400).json({ error: data.error.message });
  }
  return response.status(successStatus).json(data.data);
};

async function createFlightBooking(request, response) {
  try {
    const { data, error } = await supabase
      .from("FlightBooking")
      .insert({
        amadeus_id: request.body.amadeusID,
        user_id: request.body.userID,
        queueing_office_id: request.body.queueingOfficeId,
        itineraries: request.body.itineraries,
        travelers: request.body.travelers,
        price: request.body.price,
        departure_date: request.body.departureDate
      })
      .select();

    return handleResponse(response, { data, error }, 201);
  } catch (error) {
    console.error('Unexpected error:', error);
    return response.status(500).json({ error: 'Internal server error' });
  }
}

async function getFlightBooking(request, response) {
  try {
    const { data, error } = await supabase
      .from("FlightBooking")
      .select("*")
      .eq("user_id", request.params.userID)
      .order("created_at", {ascending: false});

    return handleResponse(response, { data, error });
  } catch (error) {
    console.error('Unexpected error:', error);
    return response.status(500).json({ error: 'Internal server error' });
  }
}

async function createShuttleBooking(request, response) {
  try {
    const { data, error } = await supabase
      .from('ShuttleBooking')
      .insert({
        user_id: request.body.userID,
        first_name: request.body.firstName,
        last_name: request.body.lastName,
        phone_number: request.body.phoneNumber,
        email: request.body.email,
        origin: request.body.origin,
        destination: request.body.destination,
        departure_date: request.body.departureDate,
        departure_time: request.body.departureTime,
        arrival_time: request.body.arrivalTime,
        amount_paid: request.body.amountPaid,
        status: 'pending',
        company_name: request.body.companyName
      })
      .select();

    return handleResponse(response, { data, error }, 201);
  } catch (error) {
    console.error('Unexpected error:', error);
    return response.status(500).json({ error: 'Internal server error' });
  }
}

async function getShuttleBooking(request, response) {
  try {
    const { data, error } = await supabase
      .from('ShuttleBooking')
      .select('*')
      .eq('user_id', request.params.userID)
      .order("created_at", {ascending: false});;

    return handleResponse(response, { data, error });
  } catch (error) {
    console.error('Unexpected error:', error);
    return response.status(500).json({ error: 'Internal server error' });
  }
}

export { 
  createFlightBooking, 
  getFlightBooking, 
  createShuttleBooking, 
  getShuttleBooking 
};