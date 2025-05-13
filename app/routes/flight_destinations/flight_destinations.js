import router from "../../router/router.js";
import getDestinations from "../../controllers/destinations/destinations.js";

/**
 * @swagger
 * tags:
 *   - name: Destinations
 *     description: Destination search and location information
 */

/**
 * @swagger
 * /destinations:
 *   get:
 *     tags: [Destinations]
 *     summary: Search for destinations
 *     description: Retrieve location information based on city keywords
 *     parameters:
 *       - in: query
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *         description: City name or keyword to search for
 *         example: "Paris"
 *     responses:
 *       200:
 *         description: Successful response with destination data
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
 *                       id:
 *                         type: string
 *                         example: "PARI"
 *                       type:
 *                         type: string
 *                         example: "location"
 *                       subtype:
 *                         type: string
 *                         example: "city"
 *                       name:
 *                         type: string
 *                         example: "PARIS"
 *                       detailedName:
 *                         type: string
 *                         example: "Paris, FR"
 *                       iataCode:
 *                         type: string
 *                         example: "PAR"
 *                       address:
 *                         type: object
 *                         properties:
 *                           countryCode:
 *                             type: string
 *                             example: "FR"
 *       400:
 *         description: Bad request - missing or invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing required parameter: city"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch destination data"
 */

export default (app) => {
    router.get('/destinations', getDestinations)
    app.use('/', router)
}