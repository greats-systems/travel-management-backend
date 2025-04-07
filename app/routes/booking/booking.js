import bookFlight from "../../controllers/booking/booking.js";
import router from '../../router/router.js'

export default(app) => {
    router.post('/flight/book', bookFlight)
    app.use('/', router)
}