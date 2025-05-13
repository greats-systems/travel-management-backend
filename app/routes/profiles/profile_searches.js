import { createFlightInterest, createShuttleInterest } from "../../controllers/profiles/profile_searches.js";
import router from "../../router/router.js";

/**
 * @swagger
 * tags:
 *   - name: Profile Interests
 *     description: Manage user travel interest preferences. Useful when analyzing flight query patterns
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FlightInterestRequest:
 *       type: object
 *       required:
 *         - origin
 *         - destination
 *         - departureDate
 *         - userID
 *         - currentLocationLat
 *         - currentLocationLong
 *       properties:
 *         origin:
 *           type: string
 *           example: "Harare"
 *           description: Full name for the origin city
 *         destination:
 *           type: string
 *           example: "Dubai"
 *           description: Full name for the destination city
 *         departureDate:
 *           type: string
 *           format: date
 *           example: "2023-12-15"
 *         returnDate:
 *           type: string
 *           format: date
 *           example: "2023-12-22"
 *         oneWay:
 *           type: boolean
 *           example: false
 *         adults:
 *           type: integer
 *           example: 2
 *           minimum: 1
 *         userID:
 *           type: string
 *           example: "user123"
 *         currentLocationLat:
 *           type: number
 *           format: float
 *           example: 40.7128
 *         currentLocationLong:
 *           type: number
 *           format: float
 *           example: -74.0060
 * 
 *     ShuttleInterestRequest:
 *       type: object
 *       required:
 *         - origin
 *         - destination
 *         - departureDate
 *         - userID
 *         - currentLocationLat
 *         - currentLocationLong
 *       properties:
 *         origin:
 *           type: string
 *           example: "New York"
 *         destination:
 *           type: string
 *           example: "Boston"
 *         departureDate:
 *           type: string
 *           format: date
 *           example: "2023-12-15"
 *         userID:
 *           type: string
 *           example: "user123"
 *         currentLocationLat:
 *           type: number
 *           format: float
 *           example: 40.7128
 *         currentLocationLong:
 *           type: number
 *           format: float
 *           example: -74.0060
 * 
 *     InterestResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Interest created successfully"
 */

/**
 * @swagger
 * /profile/flight-interest/create:
 *   post:
 *     tags: [Profile Interests]
 *     summary: Create flight interest preference
 *     description: Register a user's interest in a specific flight route
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FlightInterestRequest'
 *     responses:
 *       201:
 *         description: Flight interest created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InterestResponse'
 *       400:
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing required fields"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to create flight interest"
 */

/**
 * @swagger
 * /profile/shuttle-interest/create:
 *   post:
 *     tags: [Profile Interests]
 *     summary: Create shuttle interest preference
 *     description: Register a user's interest in a specific shuttle route
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShuttleInterestRequest'
 *     responses:
 *       201:
 *         description: Shuttle interest created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InterestResponse'
 *       400:
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing required fields"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to create shuttle interest"
 */

export default(app)=>{
    router.post('/profile/flight-interest/create', createFlightInterest)
    router.post('/profile/shuttle-interest/create', createShuttleInterest)
    app.use('/', router)
}