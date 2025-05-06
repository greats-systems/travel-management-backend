import supabase from "../../db/supabase.js";

// Helper function for error handling
const handleError = (response, error, context = 'operation') => {
  console.error(`Error in ${context}:`, error);
  return response.status(500).json({
    success: false,
    error: error.message || `Failed to complete ${context}`
  });
};

// Helper function for successful responses
const successResponse = (response, data, status = 200) => {
  return response.status(status).json({
    success: true,
    data
  });
};

// RideJourney Controller
const journeyController = {
  async createRideJourney(request, response) {
    try {
      // Check for existing active journey
      const { data: activeRideJourneys, error: checkError } = await supabase
        .from('RideJourney')
        .select('journey_id')
        .eq('user_id', request.body.userID)
        .neq('status', 'complete');

      if (checkError) throw checkError;
      
      if (activeRideJourneys?.length > 0) {
        return response.status(400).json({
          success: false,
          error: 'You already have an active journey',
        });
      }

      // Create new journey
      const { data, error } = await supabase
        .from('RideJourney')
        .insert({
          origin: request.body.origin,
          destination: request.body.destination,
          current_location_lat: request.body.currentLocationLat,
          current_location_long: request.body.currentLocationLong,
          status: 'in progress',
          user_id: request.body.userID
        })
        .select();

      if (error) throw error;

      return successResponse(response, data[0], 201);
    } catch (error) {
      return handleError(response, error, 'creating journey');
    }
  },

  async getRideJourneys(request, response) {
    try {
      const { data, error } = await supabase
        .from('RideJourney')
        .select('*')
        .eq('user_id', request.params.userID);

      if (error) throw error;
      return successResponse(response, data);
    } catch (error) {
      return handleError(response, error, 'fetching journeys');
    }
  },

  async getActiveRideJourneys(request, response) {
    try {
      const { data, error } = await supabase
        .from('RideJourney')
        .select('*')
        .eq('user_id', request.params.userID)
        .neq('status', 'complete');

      if (error) throw error;
      
      return successResponse(response, {
        hasActiveRideJourney: data.length > 0,
        activeRideJourney: data.length > 0 ? data[0] : null
      });
    } catch (error) {
      return handleError(response, error, 'fetching active journeys');
    }
  },

  async updateRideJourney(request, response) {
    try {
      const { data, error } = await supabase
        .from('RideJourney')
        .update({ status: request.body.status })
        .eq('user_id', request.body.userID)
        .select();

      if (error) throw error;
      return successResponse(response, data);
    } catch (error) {
      return handleError(response, error, 'updating journey');
    }
  },

  async getRoute(request, response) {
    try {
      // Validate input
      const requiredParams = ['originLat', 'originLong', 'destinationLat', 'destinationLong'];
      const missingParams = requiredParams.filter(param => !request.query[param]);
      
      if (missingParams.length > 0) {
        return response.status(400).json({ 
          success: false,
          error: `Missing required coordinates: ${missingParams.join(', ')}`
        });
      }

      const coordinates = `${request.query.originLong},${request.query.originLat};${request.query.destinationLong},${request.query.destinationLat}`;
      const url = `http://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`;

      const apiResponse = await fetch(url);
      const data = await apiResponse.json();
      
      if (!apiResponse.ok) {
        throw new Error(data.error || 'Routing service failed');
      }

      // Transform OSRM response
      const transformedResponse = {
        geometry: data.routes[0].geometry,
        distance: data.routes[0].distance,
        duration: data.routes[0].duration,
        waypoints: data.waypoints
      };

      return successResponse(response, transformedResponse);
    } catch (error) {
      return handleError(response, error, 'calculating route');
    }
  },

  async getPassengerDemand(request, response) {
    try {
      const { data, error } = await supabase
        .from('ShuttleInterest')
        .select('*, Profiles(first_name, last_name)')
        .eq('origin', request.body.origin)
        .eq('destination', request.body.destination);

      if (error) throw error;
      return successResponse(response, data);
    } catch (error) {
      return handleError(response, error, 'fetching passenger demand');
    }
  }
};

export default journeyController;