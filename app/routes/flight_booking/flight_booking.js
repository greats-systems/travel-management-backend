import bookFlight from "../../controllers/flight_booking/flight_booking.js";
import router from "../../router/router.js";

export default (app) => {
 /**
 * @swagger
 * tags:
 *   - name: Flight Booking
 *     description: Flight reservation and management
 */

/**
 * @swagger
 * /flight/book:
 *   post:
 *     tags: [Flight Booking]
 *     summary: Book a flight
 *     description: |
 *       Performs a complete flight booking flow:
 *       1. Searches for available flight offers
 *       2. Validates the selected offer
 *       3. Prices the selected offer
 *       4. Creates the booking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FlightBookingRequest'
 *     responses:
 *       200:
 *         description: Flight booked successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FlightBookingResponse'
 *       400:
 *         description: Invalid request parameters
 *       404:
 *         description: Flight not available (with specific reason)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   examples:
 *                     - "This flight is full"
 *                     - "No more seats at this price"
 *                     - "Flight schedule has changed"
 *       500:
 *         description: Internal server error
 */
router.post('/flight/book', bookFlight)

/**
 * @swagger
 * components:
 *   schemas:
 *     FlightBookingRequest:
 *       type: object
 *       required:
 *         - origin
 *         - destination
 *         - departureDate
 *         - flightId
 *         - passengers
 *       properties:
 *         origin:
 *           type: string
 *           example: "NYC"
 *           description: IATA code of origin airport
 *         destination:
 *           type: string
 *           example: "LON"
 *           description: IATA code of destination airport
 *         departureDate:
 *           type: string
 *           format: date
 *           example: "2023-12-25"
 *         returnDate:
 *           type: string
 *           format: date
 *           example: "2024-01-05"
 *         adults:
 *           type: integer
 *           example: 1
 *           minimum: 1
 *         travelClass:
 *           type: string
 *           enum: [ECONOMY, PREMIUM_ECONOMY, BUSINESS, FIRST]
 *           example: "ECONOMY"
 *         flightId:
 *           type: string
 *           description: ID of selected flight offer
 *           example: "1"
 *         passengers:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Passenger'
 * 
 *     Passenger:
 *       type: object
 *       required:
 *         - type
 *         - firstName
 *         - lastName
 *         - dateOfBirth
 *         - gender
 *       properties:
 *         type:
 *           type: string
 *           enum: [ADULT, CHILD, INFANT]
 *           example: "ADULT"
 *         firstName:
 *           type: string
 *           example: "John"
 *         lastName:
 *           type: string
 *           example: "Doe"
 *         dateOfBirth:
 *           type: string
 *           format: date
 *           example: "1980-01-01"
 *         gender:
 *           type: string
 *           enum: [M, F]
 *           example: "M"
 * 
 *     FlightBookingResponse:
 *       type: object
 *       properties:
 *         booking:
 *           type: object
 *           properties:
 *             data:
 *               type: object
 *               description: Complete booking details from Amadeus API
 *         pricedOffer:
 *           type: object
 *           properties:
 *             data:
 *               type: object
 *               description: Priced flight offer details
 */
  app.use("/", router);
};
