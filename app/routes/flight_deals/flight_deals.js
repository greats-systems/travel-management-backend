import router from "../../router/router.js";
import flightDeals from "../../controllers/flight_deals/flight_deals.js";

/**
 * @swagger
 * tags:
 *   - name: Flight Deals
 *     description: Discover flight deals and destination offers
 */

/**
 * @swagger
 * /flight-deals:
 *   get:
 *     tags: [Flight Deals]
 *     summary: Get flight deals from an origin
 *     description: Retrieve discounted flight destinations based on origin and maximum price
 *     parameters:
 *       - in: query
 *         name: origin
 *         required: true
 *         schema:
 *           type: string
 *           example: "NYC"
 *         description: IATA code of origin airport (e.g., JFK, LAX)
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: integer
 *           example: 500
 *         description: Maximum price for flight deals in USD
 *     responses:
 *       200:
 *         description: Successful response with flight deals
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         example: "flight-destination"
 *                       origin:
 *                         type: string
 *                         example: "NYC"
 *                       destination:
 *                         type: string
 *                         example: "MIA"
 *                       departureDate:
 *                         type: string
 *                         format: date
 *                         example: "2023-12-15"
 *                       returnDate:
 *                         type: string
 *                         format: date
 *                         example: "2023-12-22"
 *                       price:
 *                         type: object
 *                         properties:
 *                           total:
 *                             type: string
 *                             example: "350.00"
 *       400:
 *         description: Bad request - missing or invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing required parameter: origin"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch flight deals"
 */

export default (app) => {
    router.get('/flight-deals', flightDeals)
    app.use('/', router)
}