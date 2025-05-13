import router from "../../router/router.js";
import ridesController from "../../controllers/rides/rides.js";

/**
 * @swagger
 * tags:
 *   - name: Rides
 *     description: Ride booking and management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Ride:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         user_id:
 *           type: string
 *         origin:
 *           type: string
 *         destination:
 *           type: string
 *         driver_id:
 *           type: string
 *         amount_paid:
 *           type: number
 *           format: float
 *         created_at:
 *           type: string
 *           format: date-time
 *         status:
 *           type: string
 *           enum: [pending, confirmed, completed, cancelled]
 * 
 *     RideBookingRequest:
 *       type: object
 *       required:
 *         - userID
 *         - origin
 *         - destination
 *         - amountPaid
 *       properties:
 *         userID:
 *           type: string
 *         origin:
 *           type: string
 *         destination:
 *           type: string
 *         driverID:
 *           type: string
 *         amountPaid:
 *           type: number
 *           format: float
 * 
 *     RideSearchRequest:
 *       type: object
 *       required:
 *         - origin
 *         - destination
 *       properties:
 *         origin:
 *           type: string
 *         destination:
 *           type: string
 * 
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Ride'
 * 
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         error:
 *           type: string
 *           example: "Failed to fetch rides"
 */

/**
 * @swagger
 * /ride/book:
 *   post:
 *     tags: [Rides]
 *     summary: Book a new ride
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RideBookingRequest'
 *     responses:
 *       200:
 *         description: Ride booked successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Failed to book ride
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /rides:
 *   get:
 *     tags: [Rides]
 *     summary: Search for available rides
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
 *         description: List of available rides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Missing origin or destination
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Failed to fetch rides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /ride/{userID}:
 *   get:
 *     tags: [Rides]
 *     summary: Get rides for a specific user
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of user's rides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       500:
 *         description: Failed to fetch rides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

export default(app) => {
    router.post('/ride/book', ridesController.bookRide)
    router.get('/rides', ridesController.getRides)
    router.get('/ride/:userID', ridesController.getRide)

    app.use('/', router)
}