import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import env from 'dotenv'

import profiles from './app/routes/profiles/profiles.js'

import prices from './app/routes/prices/prices.js'
import flight_deals from './app/routes/flight_deals/flight_deals.js'
import flight_status from './app/routes/flight_status/flight_status.js'
import booking from './app/routes/booking/booking.js'

env.config()

const app = express()
const PORT = 5000

app.use(bodyParser.json())
app.use(cors({origin: 'http://localhost:4200'}))

profiles(app)

prices(app)
flight_deals(app)
flight_status(app)
booking(app)


app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))