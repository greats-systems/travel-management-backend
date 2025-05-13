import router from "../../router/router.js";
import journeyController from "../../controllers/profiles/driver_journeys.js";

/**
 * @swagger
 * tags:
 *   - name: Driver Journeys
 *     description: Manage driver journeys and route information
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RideJourney:
 *       type: object
 *       properties:
 *         journey_id:
 *           type: integer
 *         origin:
 *           type: string
 *         destination:
 *           type: string
 *         current_location_lat:
 *           type: number
 *           format: float
 *         current_location_long:
 *           type: number
 *           format: float
 *         status:
 *           type: string
 *           enum: [in progress, complete]
 *         user_id:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 * 
 *     RouteResponse:
 *       type: object
 *       properties:
 *         geometry:
 *           type: object
 *         distance:
 *           type: number
 *         duration:
 *           type: number
 *         waypoints:
 *           type: array
 *           items:
 *             type: object
 * 
 *     PassengerDemand:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         origin:
 *           type: string
 *         destination:
 *           type: string
 *         user_id:
 *           type: string
 *         Profiles:
 *           type: object
 *           properties:
 *             first_name:
 *               type: string
 *             last_name:
 *               type: string
 * 
 *     JourneyCreateRequest:
 *       type: object
 *       required:
 *         - origin
 *         - destination
 *         - currentLocationLat
 *         - currentLocationLong
 *         - userID
 *       properties:
 *         origin:
 *           type: string
 *         destination:
 *           type: string
 *         currentLocationLat:
 *           type: number
 *           format: float
 *         currentLocationLong:
 *           type: number
 *           format: float
 *         userID:
 *           type: string
 * 
 *     JourneyUpdateRequest:
 *       type: object
 *       required:
 *         - status
 *         - userID
 *       properties:
 *         status:
 *           type: string
 *           enum: [in progress, complete]
 *         userID:
 *           type: string
 * 
 *     RouteRequest:
 *       type: object
 *       properties:
 *         originLat:
 *           type: number
 *           format: float
 *         originLong:
 *           type: number
 *           format: float
 *         destinationLat:
 *           type: number
 *           format: float
 *         destinationLong:
 *           type: number
 *           format: float
 * 
 *     PassengerDemandRequest:
 *       type: object
 *       required:
 *         - origin
 *         - destination
 *       properties:
 *         origin:
 *           type: string
 *         destination:
 *           type: string
 */

/**
 * @swagger
 * /journey/create:
 *   post:
 *     tags: [Driver Journeys]
 *     summary: Create a new ride journey
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JourneyCreateRequest'
 *     responses:
 *       201:
 *         description: Journey created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RideJourney'
 *       400:
 *         description: User already has an active journey
 *       500:
 *         description: Failed to create journey
 */

/**
 * @swagger
 * /journeys/{userID}:
 *   get:
 *     tags: [Driver Journeys]
 *     summary: Get all journeys for a driver
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of driver journeys
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RideJourney'
 *       500:
 *         description: Failed to fetch journeys
 */

/**
 * @swagger
 * /journey/active/{userID}:
 *   get:
 *     tags: [Driver Journeys]
 *     summary: Get active journey for a driver
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Active journey information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 hasActiveRideJourney:
 *                   type: boolean
 *                 activeRideJourney:
 *                   $ref: '#/components/schemas/RideJourney'
 *       500:
 *         description: Failed to fetch active journey
 */

/**
 * @swagger
 * /journey/route:
 *   get:
 *     tags: [Driver Journeys]
 *     summary: Get route between two points
 *     parameters:
 *       - in: query
 *         name: originLat
 *         required: true
 *         schema:
 *           type: number
 *           format: float
 *       - in: query
 *         name: originLong
 *         required: true
 *         schema:
 *           type: number
 *           format: float
 *       - in: query
 *         name: destinationLat
 *         required: true
 *         schema:
 *           type: number
 *           format: float
 *       - in: query
 *         name: destinationLong
 *         required: true
 *         schema:
 *           type: number
 *           format: float
 *     responses:
 *       200:
 *         description: Route information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RouteResponse'
 *       400:
 *         description: Missing required coordinates
 *       500:
 *         description: Failed to calculate route
 */

/**
 * @swagger
 * /passenger-demand:
 *   get:
 *     tags: [Driver Journeys]
 *     summary: Get passenger demand for a route
 *     parameters:
 *       - in: query
 *         name: origin
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: destination
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of passenger demand
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PassengerDemand'
 *       500:
 *         description: Failed to fetch passenger demand
 */

/**
 * @swagger
 * /journey/active/{userID}/update:
 *   patch:
 *     tags: [Driver Journeys]
 *     summary: Update journey status
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JourneyUpdateRequest'
 *     responses:
 *       200:
 *         description: Journey updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RideJourney'
 *       500:
 *         description: Failed to update journey
 */

export default(app) => {
    router.post('/journey/create', journeyController.createRideJourney)
    router.get('/journeys/:userID', journeyController.getActiveRideJourneys)
    router.get('/journey/active/:userID', journeyController.getRideJourneys)
    router.get('/journey/route', journeyController.getRoute)
    router.get('/passenger-demand', journeyController.getPassengerDemand)
    router.patch('/journey/active/:userID/update', journeyController.updateRideJourney)

    app.use('/', router)
}