import router from "../../router/router.js";
import { createFlightBooking, getFlightBooking, createShuttleBooking, getShuttleBooking } from "../../controllers/profiles/profile_bookings.js";

/**
 * @swagger
 * tags:
 *   - name: Profile Bookings
 *     description: Manage flight and shuttle bookings for user profiles
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FlightBooking:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         amadeus_id:
 *           type: string
 *         user_id:
 *           type: string
 *         queueing_office_id:
 *           type: integer
 *         itineraries:
 *           type: array
 *           items:
 *             type: object
 *         travelers:
 *           type: array
 *           items:
 *             type: object
 *         price:
 *           type: number
 *         departure_date:
 *           type: string
 *           format: date
 *         created_at:
 *           type: string
 *           format: date-time
 * 
 *     ShuttleBooking:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         user_id:
 *           type: string
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         phone_number:
 *           type: string
 *         email:
 *           type: string
 *         origin:
 *           type: string
 *         destination:
 *           type: string
 *         departure_date:
 *           type: string
 *           format: date
 *         departure_time:
 *           type: string
 *         arrival_time:
 *           type: string
 *         amount_paid:
 *           type: number
 *         status:
 *           type: string
 *           enum: [pending, confirmed, cancelled]
 *         company_name:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 * 
 *     FlightBookingRequest:
 *       type: object
 *       required:
 *         - amadeusID
 *         - userID
 *         - itineraries
 *         - travelers
 *         - price
 *         - departureDate
 *       properties:
 *         amadeusID:
 *           type: string
 *         userID:
 *           type: string
 *         queueingOfficeId:
 *           type: integer
 *         itineraries:
 *           type: array
 *           items:
 *             type: object
 *         travelers:
 *           type: array
 *           items:
 *             type: object
 *         price:
 *           type: number
 *         departureDate:
 *           type: string
 *           format: date
 * 
 *     ShuttleBookingRequest:
 *       type: object
 *       required:
 *         - userID
 *         - firstName
 *         - lastName
 *         - phoneNumber
 *         - origin
 *         - destination
 *         - departureDate
 *         - departureTime
 *         - amountPaid
 *       properties:
 *         userID:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         email:
 *           type: string
 *         origin:
 *           type: string
 *         destination:
 *           type: string
 *         departureDate:
 *           type: string
 *           format: date
 *         departureTime:
 *           type: string
 *         arrivalTime:
 *           type: string
 *         amountPaid:
 *           type: number
 *         companyName:
 *           type: string
 */

/**
 * @swagger
 * /flight/booking/create:
 *   post:
 *     tags: [Profile Bookings]
 *     summary: Create a new flight booking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FlightBookingRequest'
 *     responses:
 *       201:
 *         description: Flight booking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FlightBooking'
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /flight/bookings/{userID}:
 *   get:
 *     tags: [Profile Bookings]
 *     summary: Get flight bookings for a user
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of flight bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FlightBooking'
 *       400:
 *         description: Invalid user ID
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /shuttle/booking/create:
 *   post:
 *     tags: [Profile Bookings]
 *     summary: Create a new shuttle booking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShuttleBookingRequest'
 *     responses:
 *       201:
 *         description: Shuttle booking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShuttleBooking'
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /shuttle/bookings/{userID}:
 *   get:
 *     tags: [Profile Bookings]
 *     summary: Get shuttle bookings for a user
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of shuttle bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ShuttleBooking'
 *       400:
 *         description: Invalid user ID
 *       500:
 *         description: Internal server error
 */

export default(app) => {
    router.post('/flight/booking/create', createFlightBooking)
    router.get('/flight/bookings/:userID', getFlightBooking)
    router.post('/shuttle/booking/create', createShuttleBooking)
    router.get('/shuttle/bookings/:userID', getShuttleBooking)

    app.use('/', router)
}