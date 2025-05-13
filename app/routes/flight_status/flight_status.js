import router from "../../router/router.js";
import getFlightStatus from "../../controllers/flight_status/flight_status.js";

/**
 * @swagger
 * tags:
 *   - name: Flight Status
 *     description: Real-time flight status and schedule information
 */

/**
 * @swagger
 * /flight/status:
 *   get:
 *     tags: [Flight Status]
 *     summary: Get flight status information
 *     description: Retrieve real-time status and schedule for a specific flight
 *     parameters:
 *       - in: query
 *         name: carrierCode
 *         required: true
 *         schema:
 *           type: string
 *           example: "AA"
 *         description: 2-letter IATA airline code
 *       - in: query
 *         name: flightNumber
 *         required: true
 *         schema:
 *           type: string
 *           example: "100"
 *         description: Flight number
 *       - in: query
 *         name: scheduledDepartureDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *           example: "2023-12-15"
 *         description: Scheduled departure date in YYYY-MM-DD format
 *     responses:
 *       200:
 *         description: Successful response with flight status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/FlightStatus'
 *       400:
 *         description: Missing or invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing required parameter: carrierCode"
 *       404:
 *         description: Flight not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to retrieve flight status"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FlightStatus:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           example: "flight-status"
 *         id:
 *           type: string
 *           example: "AA100-20231215"
 *         scheduledDeparture:
 *           type: string
 *           format: date-time
 *           example: "2023-12-15T08:00:00"
 *         estimatedDeparture:
 *           type: string
 *           format: date-time
 *           example: "2023-12-15T08:15:00"
 *         departureTerminal:
 *           type: string
 *           example: "5"
 *         departureGate:
 *           type: string
 *           example: "B12"
 *         arrivalTerminal:
 *           type: string
 *           example: "2"
 *         aircraft:
 *           type: object
 *           properties:
 *             code:
 *               type: string
 *               example: "777"
 *         status:
 *           type: string
 *           enum: [SCHEDULED, DELAYED, CANCELLED, DEPARTED, ARRIVED]
 *           example: "DELAYED"
 */

export default (app) => {
  router.get("/flight/status", getFlightStatus);
  app.use("/", router);
};
