import router from "../../router/router.js";
import { createFlightBooking, getFlightBooking } from "../../controllers/profiles/profile_bookings.js";

export default(app)=>{
    router.post('/flight/booking/create', createFlightBooking)
    router.get('/flight/bookings', getFlightBooking)
    app.use('/', router)
}