import { makePayment, makeEcocashPayment } from "../../controllers/paynow_payment/paynow_payment.js";
import router from "../../router/router.js";

export default (app) => {
    router.post('/pay', makePayment)
    router.post('/pay/ecocash', makeEcocashPayment)
    app.use('/', router)
}