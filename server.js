import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './swagger.js';

// Route Imports (Grouped by functionality)
import root from './app/routes/root.js';
// Profiles
import profiles from './app/routes/profiles/profiles.js';
import profileSearches from './app/routes/profiles/profile_searches.js';
import profileBookings from './app/routes/profiles/profile_bookings.js';
import driverJourneys from './app/routes/profiles/driver_journeys.js';
// Flights
import prices from './app/routes/flight_prices/flight_prices.js';
import flightDeals from './app/routes/flight_deals/flight_deals.js';
import flightStatus from './app/routes/flight_status/flight_status.js';
import booking from './app/routes/flight_booking/flight_booking.js';
// Shuttles & Rides
import shuttles from './app/routes/shuttles/shuttles.js';
import rides from './app/routes/rides/rides.js';
// Analytics
import flightAnalytics from './app/routes/dashboard/flights/flight_analytics.js';
import shuttleAnalytics from './app/routes/dashboard/shuttles/shuttle_analytics.js';
// Payments & Services
import paynowPayment from './app/routes/paynow_payment/paynow_payment.js';
import parcels from './app/routes/parcels/parcels.js';

// Initialize environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware Setup
app.use(bodyParser.json());
app.use(
  cors({
    origin: ['http://localhost:4200', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// API Documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Route Registration
const registerRoutes = () => {
  // Core
  root(app);
  
  // Profiles
  profiles(app);
  profileSearches(app);
  profileBookings(app);
  driverJourneys(app);
  
  // Flights
  prices(app);
  flightDeals(app);
  flightStatus(app);
  booking(app);
  
  // Shuttles & Rides
  shuttles(app);
  rides(app);
  
  // Analytics
  flightAnalytics(app);
  shuttleAnalytics(app);
  
  // Payments & Services
  paynowPayment(app);
  parcels(app);
};

registerRoutes();

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: err.message || 'An unexpected error occurred'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API documentation available at http://localhost:${PORT}/api-docs`);
});