import { makeShuttlePayment, makeShuttleEcocashPayment, makeRideEcocashPayment, makeParcelPayment, makeParcelEcocashPayment } from "../../controllers/paynow_payment/paynow_payment.js";
import router from "../../router/router.js";

/**
 * @swagger
 * tags:
 *   - name: Payments
 *     description: Payment processing via PayNow and EcoCash
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PaymentRequest:
 *       type: object
 *       properties:
 *         total:
 *           type: number
 *           example: 50.00
 *           description: Total amount to pay
 * 
 *     EcoCashPaymentRequest:
 *       type: object
 *       required:
 *         - phoneNumber
 *       properties:
 *         phoneNumber:
 *           type: string
 *           example: "0771234567"
 *           description: EcoCash registered phone number
 *         busFare:
 *           type: number
 *           example: 5.00
 *         rideFare:
 *           type: number
 *           example: 10.00
 *         cost:
 *           type: number
 *           example: 25.00
 * 
 *     PaymentResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         paymentUrl:
 *           type: string
 *           example: "https://www.paynow.co.zw/Payment/ConfirmPayment/12345"
 * 
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         error:
 *           type: string
 *           example: "Payment failed"
 */

/**
 * @swagger
 * /pay/shuttle:
 *   post:
 *     tags: [Payments]
 *     summary: Make shuttle payment via PayNow
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentRequest'
 *     responses:
 *       200:
 *         description: Payment initiated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentResponse'
 *       400:
 *         description: Payment failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /pay/shuttle/ecocash:
 *   post:
 *     tags: [Payments]
 *     summary: Make shuttle payment via EcoCash
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             allOf:
 *               - $ref: '#/components/schemas/EcoCashPaymentRequest'
 *               - type: object
 *                 required:
 *                   - busFare
 *                 properties:
 *                   busFare:
 *                     type: number
 *     responses:
 *       200:
 *         description: EcoCash payment initiated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentResponse'
 *       400:
 *         description: Payment failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /pay/ride/ecocash:
 *   post:
 *     tags: [Payments]
 *     summary: Make ride payment via EcoCash
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             allOf:
 *               - $ref: '#/components/schemas/EcoCashPaymentRequest'
 *               - type: object
 *                 required:
 *                   - rideFare
 *                 properties:
 *                   rideFare:
 *                     type: number
 *     responses:
 *       200:
 *         description: EcoCash payment initiated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentResponse'
 *       400:
 *         description: Payment failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /pay/parcel:
 *   post:
 *     tags: [Payments]
 *     summary: Make parcel payment via PayNow
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentRequest'
 *     responses:
 *       200:
 *         description: Payment initiated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentResponse'
 *       400:
 *         description: Payment failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /pay/parcel/ecocash:
 *   post:
 *     tags: [Payments]
 *     summary: Make parcel payment via EcoCash
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             allOf:
 *               - $ref: '#/components/schemas/EcoCashPaymentRequest'
 *               - type: object
 *                 required:
 *                   - cost
 *                 properties:
 *                   cost:
 *                     type: number
 *     responses:
 *       200:
 *         description: EcoCash payment initiated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentResponse'
 *       400:
 *         description: Payment failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 */

export default (app) => {
    router.post('/pay/shuttle', makeShuttlePayment)
    router.post('/pay/shuttle/ecocash', makeShuttleEcocashPayment)
    router.post('/pay/ride/ecocash', makeRideEcocashPayment)
    router.post('/pay/parcel', makeParcelPayment)
    router.post('/pay/parcel/ecocash', makeParcelEcocashPayment)
    app.use('/', router)
}