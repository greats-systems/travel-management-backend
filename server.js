import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import env from 'dotenv'

// Entry point
import root from './app/routes/root.js'

// User registration handler
import profiles from './app/routes/profiles/profiles.js'

// User search interest handler
import profile_searches from './app/routes/profiles/profile_searches.js'

// Flight prices and bookings handlers
import prices from './app/routes/prices/prices.js'
import flight_deals from './app/routes/flight_deals/flight_deals.js'
import flight_status from './app/routes/flight_status/flight_status.js'
import booking from './app/routes/booking/booking.js'
import profile_bookings from './app/routes/profiles/profile_bookings.js'
import shuttles from './app/routes/shuttles/shuttles.js'
import flight_analytics from './app/routes/dashboard/flights/flight_analytics.js'
import paynow_payment from './app/routes/paynow_payment/paynow_payment.js'

env.config()

const app = express()
const PORT = 5000

app.use(bodyParser.json())
app.use(cors({
    origin: [
        'http://localhost:4200',
        'http://localhost:3000',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))

root(app)

profiles(app)
profile_searches(app)
profile_bookings(app)

shuttles(app)

prices(app)
flight_deals(app)
flight_status(app)
booking(app)

flight_analytics(app)

paynow_payment(app)


app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))