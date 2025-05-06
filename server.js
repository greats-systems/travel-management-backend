import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import env from 'dotenv';

// Route Imports (Grouped by Functionality)
// Core
import root from './app/routes/root.js';

// Profiles
import profiles from './app/routes/profiles/profiles.js';
import profile_searches from './app/routes/profiles/profile_searches.js';
import profile_bookings from './app/routes/profiles/profile_bookings.js';
import driver_journeys from './app/routes/profiles/driver_journeys.js';

// Flights
import prices from './app/routes/prices/prices.js';
import flight_deals from './app/routes/flight_deals/flight_deals.js';
import flight_status from './app/routes/flight_status/flight_status.js';
import booking from './app/routes/booking/booking.js';

// Shuttles & Rides
import shuttles from './app/routes/shuttles/shuttles.js';
import rides from './app/routes/rides/rides.js';

// Analytics
import flight_analytics from './app/routes/dashboard/flights/flight_analytics.js';
import shuttle_analytics from './app/routes/dashboard/shuttles/shuttle_analytics.js';

// Payments & Services
import paynow_payment from './app/routes/paynow_payment/paynow_payment.js';
import parcels from './app/routes/parcels/parcels.js';

// Config
env.config();

const app = express();
const PORT = process.env.PORT || 5000; // Fallback to 5000 if not in .env

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: ['http://localhost:4200', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// Attach Routes (Original Style)
root(app);

// Profiles
profiles(app);
profile_searches(app);
profile_bookings(app);
driver_journeys(app);

// Flights
prices(app);
flight_deals(app);
flight_status(app);
booking(app);

// Shuttles & Rides
shuttles(app);
rides(app);

// Analytics
flight_analytics(app);
shuttle_analytics(app);

// Payments & Services
paynow_payment(app);
parcels(app);

// Basic Error Handling (Optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));