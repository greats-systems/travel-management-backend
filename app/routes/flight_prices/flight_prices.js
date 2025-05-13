import router from "../../router/router.js";
import getFlightPrices from "../../controllers/flight_prices/flight_prices.js";

export default (app) => {
  /**
   * @swagger
   * tags:
   *   name: Flight Prices
   *   description: Flight pricing and availability
   */

  /**
   * @swagger
   * /flight/prices:
   *   post:
   *     tags: [Flight Prices]
   *     summary: Get flight prices and availability
   *     description: Retrieves flight offers with pricing information
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/FlightPriceRequest'
   *     responses:
   *       200:
   *         description: Successful response
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/FlightPriceResponse'
   *       400:
   *         description: Invalid request
   *       401:
   *         description: Unauthorized
   *       500:
   *         description: Server error
   */
  router.post("/flight/prices", getFlightPrices);
  app.use("/", router);
};
