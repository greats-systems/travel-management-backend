import supabase from '../../db/supabase.js'
import env from 'dotenv'
import axios from 'axios'
import fetch from 'node-fetch';

env.config()

async function createParcelShipment(request, response) {
    await supabase.from('ParcelShipment').insert({
        'user_id': request.body.userID,
        'name': request.body.name,
        'description': request.body.description,
        'length': request.body.length,
        'width':request.body.width,
        'height': request.body.height,
        'mass_kg': request.body.mass,
        'quantity': request.body.quantity,
        'origin': request.body.origin,
        'destination': request.body.destination,
        'departure_date': request.body.departureDate,
        'shipping_company_id': request.body.companyID,
        'courier_name': request.body.courierName,
        'shipping_cost': request.body.shippingCost,
        'status': 'In transit'
    })
    .then(data => {
        response.status(201).send(data.statusText)
    })
    .catch(error => {
        response.status(500).send(error)
    })
}

async function viewParcelShipments(request, response) {
    await supabase.from('ParcelShipment')
    .select('*')
    .eq('user_id', request.body.userID)
    .order('created_at', {ascending: false})
    .then(data => {
        response.status(200).send(data.data)
    })
    .catch(error => {
        response.status(500).send(error)
    })
}

async function viewShippingCompanies(_, response) {
    await supabase.from('ShippingCompany')
    .select('*')
    .then(data => {
        response.status(200).send(data.data)
    })
    .catch(error => {
        response.status(500).send(error)
    })
}

async function calculateDistance(request, response) {
    try {
        // Validate input
        if (!request.body.originLat || !request.body.originLong || 
            !request.body.destinationLat || !request.body.destinationLong) {
            return response.status(400).json({ 
                error: 'Missing required coordinates in request body' 
            });
        }

        const apiKey = process.env.OPENROUTESERVICE_API_KEY; // Recommended env var name
        if (!apiKey) {
            return response.status(500).json({ 
                error: 'Server configuration error: Missing API key' 
            });
        }

        const baseUrl = 'https://api.openrouteservice.org/v2/directions/driving-car';
        const coordinates = `start=${request.body.originLong},${request.body.originLat}&end=${request.body.destinationLong},${request.body.destinationLat}`;
        const url = `${baseUrl}?api_key=${apiKey}&${coordinates}`;

        const apiResponse = await fetch(url);
        
        if (!apiResponse.ok) {
            const errorData = await apiResponse.json();
            console.error('OpenRouteService API error:', errorData);
            return response.status(apiResponse.status).json({
                error: 'Routing service failed',
                details: errorData.error || errorData
            });
        }

        const data = await apiResponse.json();
        
        // Extract relevant route information
        if (!data.features || data.features.length === 0) {
            return response.status(404).json({ error: 'No route found' });
        }

        const route = data.features[0];
        const distance = route.properties.segments[0].distance; // in meters
        const duration = route.properties.segments[0].duration; // in seconds

        response.status(200).json({
            distance: {
                meters: distance,
                kilometers: distance / 1000,
                miles: distance / 1609.34
            },
            duration: {
                seconds: duration,
                minutes: duration / 60,
                hours: duration / 3600
            },
            geometry: route.geometry // Optional: includes the route path
        });

    } catch (error) {
        console.error('Routing calculation failed:', error);
        response.status(500).json({ 
            error: 'Internal server error',
            details: error.message 
        });
    }
}

export { createParcelShipment, viewParcelShipments, viewShippingCompanies, calculateDistance }