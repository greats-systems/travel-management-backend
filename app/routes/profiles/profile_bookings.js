import router from "../../router/router.js";
import { createFlightBooking } from "../../controllers/profiles/profile_bookings.js";

export default(app)=>{
    router.post('/flight/booking/create', createFlightBooking)
    app.use('/', router)
}