import { makeShuttlePayment, makeShuttleEcocashPayment, makeParcelPayment, makeParcelEcocashPayment } from "../../controllers/paynow_payment/paynow_payment.js";
import router from "../../router/router.js";

export default (app) => {
    router.post('/pay/shuttle', makeShuttlePayment)
    router.post('/pay/shuttle/ecocash', makeShuttleEcocashPayment)
    router.post('/pay/parcel', makeParcelPayment)
    router.post('/pay/parcel/ecocash', makeParcelEcocashPayment)
    app.use('/', router)
}