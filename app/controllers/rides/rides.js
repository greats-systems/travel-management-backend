import supabase from "../../db/supabase.js";

// Helper function for error handling
const handleError = (response, error, context = "operation") => {
  console.error(`Error in ${context}:`, error);
  return response.status(500).json({
    success: false,
    error: error.message || `Failed to complete ${context}`,
  });
};

// Helper function for successful responses
const successResponse = (response, data, status = 200) => {
  return response.status(status).json({
    success: true,
    data,
  });
};

// RideJourney Controller
const ridesController = {
  async getRides(request, response) {
    try {
      const { data, error } = await supabase
        .from("RideJourney")
        .select()
        .eq("origin", request.body.origin)
        .eq("destination", request.body.destination);
      if (error) throw error;
      return successResponse(response, data)
    } catch (error) {
        return handleError(response, error, 'fetching rides')
    }
  },

  async getRide(request, response) {
    try {
        const { data, error } = await supabase
        .from("RideJourney")
        .select()
        .eq("user_id", request.params.userID)
      if (error) throw error;
      return successResponse(response, data)
    } catch (error) {
        return handleError(response, error, 'fetching ride')
    }
  },

  async bookRide(request, response) {
    try {
        const { data, error } = await supabase
        .from("RideJourney")
        .insert({
            user_id: request.body.userID,
            origin: request.body.origin,
            destination: request.body.destination,
            driver_id: request.body.driverID,
            amount_paid: request.body.amountPaid
        })
      if (error) throw error;
      return successResponse(response, data)
    } catch (error) {
        return handleError(response, error, 'booking ride')
    }
  },
};

export default ridesController;
