import { createFlightInterest, createShuttleInterest } from "../../controllers/profiles/profile_searches.js";
import router from "../../router/router.js";

export default(app)=>{
    router.post('/profile/flight-interest/create', createFlightInterest)
    router.post('/profile/shuttle-interest/create', createShuttleInterest)
    app.use('/', router)
}