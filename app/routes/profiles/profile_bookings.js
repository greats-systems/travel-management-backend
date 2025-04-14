import router from "../../router/router.js";
import { createFlightBooking, getFlightBooking, createShuttleBooking, getShuttleBooking } from "../../controllers/profiles/profile_bookings.js";

export default(app)=>{
    router.post('/flight/booking/create', createFlightBooking)
    router.get('/flight/bookings', getFlightBooking)
    router.post('/shuttle/booking/create', createShuttleBooking)
    router.get('/shuttle/bookings', getShuttleBooking)
    app.use('/', router)
}