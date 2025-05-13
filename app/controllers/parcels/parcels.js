import supabase from "../../db/supabase.js";
import env from "dotenv";
import fetch from "node-fetch";

env.config();

// Helper function for consistent error responses
const handleError = (response, status, message, error = null) => {
  if (error) console.error(message, error);
  return response.status(status).json({
    success: false,
    message,
    ...(error && { error: error.message }),
  });
};

// Helper function for successful responses
const handleSuccess = (response, data, status = 200) => {
  return response.status(status).json({
    success: true,
    data,
  });
};

async function createParcelShipment(request, response) {
  try {
    const { data, error } = await supabase.from("ParcelShipment").insert({
      user_id: request.body.userID,
      name: request.body.name,
      description: request.body.description,
      length: request.body.length,
      width: request.body.width,
      height: request.body.height,
      mass_kg: request.body.mass,
      quantity: request.body.quantity,
      origin: request.body.origin,
      destination: request.body.destination,
      departure_date: request.body.departureDate,
      shipping_company_id: request.body.companyID,
      courier_name: request.body.courierName,
      shipping_cost: request.body.shippingCost,
      status: "In transit",
    });

    if (error) throw error;

    return handleSuccess(response, data, 201);
  } catch (error) {
    return handleError(response, 500, "Failed to create shipment", error);
  }
}

async function viewParcelShipments(request, response) {
  try {
    const { data, error } = await supabase
      .from("ParcelShipment")
      .select("*")
      .eq("user_id", request.body.userID)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return handleSuccess(response, data);
  } catch (error) {
    return handleError(response, 500, "Failed to fetch shipments", error);
  }
}

async function viewShippingCompanies(_, response) {
  try {
    const { data, error } = await supabase.from("ShippingCompany").select("*");

    if (error) throw error;

    return handleSuccess(response, data);
  } catch (error) {
    return handleError(
      response,
      500,
      "Failed to fetch shipping companies",
      error
    );
  }
}

async function calculateDistance(request, response) {
  try {
    // Validate input
    const { originLat, originLong, destinationLat, destinationLong } =
      request.body;
    if (!originLat || !originLong || !destinationLat || !destinationLong) {
      return handleError(
        response,
        400,
        "Missing required coordinates in request body"
      );
    }

    const apiKey = process.env.OPENROUTESERVICE_API_KEY;
    if (!apiKey) {
      return handleError(
        response,
        500,
        "Server configuration error: Missing API key"
      );
    }

    const baseUrl =
      "https://api.openrouteservice.org/v2/directions/driving-car";
    const coordinates = `start=${originLong},${originLat}&end=${destinationLong},${destinationLat}`;
    const url = `${baseUrl}?api_key=${apiKey}&${coordinates}`;

    const apiResponse = await fetch(url);

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      console.error("OpenRouteService API error:", errorData);
      return handleError(
        response,
        apiResponse.status,
        "Routing service failed",
        errorData
      );
    }

    const data = await apiResponse.json();

    if (!data.features || data.features.length === 0) {
      return handleError(response, 404, "No route found");
    }

    const route = data.features[0];
    const distance = route.properties.segments[0].distance; // in meters
    const duration = route.properties.segments[0].duration; // in seconds

    return handleSuccess(response, {
      distance: {
        meters: distance,
        kilometers: distance / 1000,
        miles: distance / 1609.34,
      },
      duration: {
        seconds: duration,
        minutes: duration / 60,
        hours: duration / 3600,
      },
      geometry: route.geometry,
    });
  } catch (error) {
    return handleError(response, 500, "Routing calculation failed", error);
  }
}

async function calculateShippingCost(request, response) {
  try {
    const {
      length,
      width,
      height,
      mass,
      quantity,
      originLat,
      originLong,
      destinationLat,
      destinationLong,
    } = request.body;

    // Validate required fields
    if (
      !length ||
      !width ||
      !height ||
      !mass ||
      !quantity ||
      !originLat ||
      !originLong ||
      !destinationLat ||
      !destinationLong
    ) {
      return handleError(
        response,
        400,
        "Missing required fields in request body"
      );
    }

    const baseCost = 5.0;
    const weightFactor = 0.5;
    const distanceFactor = 0.1;
    const volumeDivisor = 5000;

    const volume = length * width * height;
    const dimWeightKg = volume / volumeDivisor;
    const chargeableWeight = Math.max(mass, dimWeightKg);

    // Create mock request for calculateDistance
    const mockRequest = {
      body: {
        originLat,
        originLong,
        destinationLat,
        destinationLong,
      },
    };
    const mockResponse = {
      json: (data) => data,
      status: () => mockResponse,
    };

    const distanceData = await calculateDistance(mockRequest, mockResponse);
    if (!distanceData.success) {
      throw new Error("Failed to calculate distance");
    }

    const distanceKm = distanceData.data.distance.kilometers;
    const cost =
      (baseCost +
        chargeableWeight * weightFactor +
        distanceKm * distanceFactor) *
      quantity;

    return handleSuccess(response, {
      cost,
      chargeableWeight,
      distanceKm,
    });
  } catch (error) {
    return handleError(
      response,
      500,
      "Failed to calculate shipping cost",
      error
    );
  }
}

export {
  createParcelShipment,
  viewParcelShipments,
  viewShippingCompanies,
  calculateDistance,
  calculateShippingCost,
};
