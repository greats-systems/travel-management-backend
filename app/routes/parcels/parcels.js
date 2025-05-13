import router from '../../router/router.js'
import { createParcelShipment, viewParcelShipments, viewShippingCompanies, calculateDistance, calculateShippingCost } from '../../controllers/parcels/parcels.js'

/**
 * @swagger
 * tags:
 *   - name: Parcel Shipping
 *     description: Parcel shipment management and tracking
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ParcelShipment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         user_id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         length:
 *           type: number
 *           format: float
 *         width:
 *           type: number
 *           format: float
 *         height:
 *           type: number
 *           format: float
 *         mass_kg:
 *           type: number
 *           format: float
 *         quantity:
 *           type: integer
 *         origin:
 *           type: string
 *         destination:
 *           type: string
 *         departure_date:
 *           type: string
 *           format: date-time
 *         shipping_company_id:
 *           type: integer
 *         courier_name:
 *           type: string
 *         shipping_cost:
 *           type: number
 *           format: float
 *         status:
 *           type: string
 *           enum: [In transit, Delivered, Cancelled]
 *         created_at:
 *           type: string
 *           format: date-time
 * 
 *     ShippingCompany:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         logo_url:
 *           type: string
 *         contact_number:
 *           type: string
 *         email:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 * 
 *     RouteDistance:
 *       type: object
 *       properties:
 *         distance:
 *           type: object
 *           properties:
 *             meters:
 *               type: number
 *             kilometers:
 *               type: number
 *             miles:
 *               type: number
 *         duration:
 *           type: object
 *           properties:
 *             seconds:
 *               type: number
 *             minutes:
 *               type: number
 *             hours:
 *               type: number
 *         geometry:
 *           type: object
 * 
 *     ShippingCost:
 *       type: object
 *       properties:
 *         cost:
 *           type: number
 *         chargeableWeight:
 *           type: number
 *         distanceKm:
 *           type: number
 */

/**
 * @swagger
 * /parcel-shipments/create:
 *   post:
 *     tags: [Parcel Shipping]
 *     summary: Create a new parcel shipment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userID
 *               - name
 *               - length
 *               - width
 *               - height
 *               - mass
 *               - quantity
 *               - origin
 *               - destination
 *               - departureDate
 *               - companyID
 *             properties:
 *               userID:
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               length:
 *                 type: number
 *               width:
 *                 type: number
 *               height:
 *                 type: number
 *               mass:
 *                 type: number
 *               quantity:
 *                 type: integer
 *               origin:
 *                 type: string
 *               destination:
 *                 type: string
 *               departureDate:
 *                 type: string
 *                 format: date
 *               companyID:
 *                 type: integer
 *               courierName:
 *                 type: string
 *               shippingCost:
 *                 type: number
 *     responses:
 *       201:
 *         description: Shipment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ParcelShipment'
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Failed to create shipment
 */

/**
 * @swagger
 * /parcel-shipments:
 *   get:
 *     tags: [Parcel Shipping]
 *     summary: Get all parcel shipments for a user
 *     parameters:
 *       - in: query
 *         name: userID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of parcel shipments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ParcelShipment'
 *       400:
 *         description: Missing user ID
 *       500:
 *         description: Failed to fetch shipments
 */

/**
 * @swagger
 * /shipping-companies:
 *   get:
 *     tags: [Parcel Shipping]
 *     summary: Get all shipping companies
 *     responses:
 *       200:
 *         description: List of shipping companies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ShippingCompany'
 *       500:
 *         description: Failed to fetch companies
 */

/**
 * @swagger
 * /parcel-shipments/distance:
 *   get:
 *     tags: [Parcel Shipping]
 *     summary: Calculate distance between two points
 *     parameters:
 *       - in: query
 *         name: originLat
 *         required: true
 *         schema:
 *           type: number
 *       - in: query
 *         name: originLong
 *         required: true
 *         schema:
 *           type: number
 *       - in: query
 *         name: destinationLat
 *         required: true
 *         schema:
 *           type: number
 *       - in: query
 *         name: destinationLong
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Distance calculation result
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RouteDistance'
 *       400:
 *         description: Missing coordinates
 *       500:
 *         description: Failed to calculate distance
 */

/**
 * @swagger
 * /parcel-shipments/cost:
 *   post:
 *     tags: [Parcel Shipping]
 *     summary: Calculate shipping cost
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - length
 *               - width
 *               - height
 *               - mass
 *               - quantity
 *               - originLat
 *               - originLong
 *               - destinationLat
 *               - destinationLong
 *             properties:
 *               length:
 *                 type: number
 *               width:
 *                 type: number
 *               height:
 *                 type: number
 *               mass:
 *                 type: number
 *               quantity:
 *                 type: integer
 *               originLat:
 *                 type: number
 *               originLong:
 *                 type: number
 *               destinationLat:
 *                 type: number
 *               destinationLong:
 *                 type: number
 *     responses:
 *       200:
 *         description: Cost calculation result
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShippingCost'
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Failed to calculate cost
 */

export default (app) => {
    router.post('/parcel-shipments/create', createParcelShipment)
    router.get('/parcel-shipments', viewParcelShipments)
    router.get('/shipping-companies', viewShippingCompanies)
    router.get('/parcel-shipments/distance', calculateDistance)
    router.post('/parcel-shipments/cost', calculateShippingCost)

    app.use('/', router)
}