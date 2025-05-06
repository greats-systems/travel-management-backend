import router from "../../router/router.js";
import { createFlightBooking, getFlightBooking, createShuttleBooking, getShuttleBooking } from "../../controllers/profiles/profile_bookings.js";

export default(app)=>{
    router.post('/flight/booking/create', createFlightBooking)
    router.get('/flight/bookings/:userID', getFlightBooking)
    router.post('/shuttle/booking/create', createShuttleBooking)
    router.get('/shuttle/bookings/:userID', getShuttleBooking)
    app.use('/', router)
}