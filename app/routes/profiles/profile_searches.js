import { createFlightInterest } from "../../controllers/profiles/profile_searches.js";
import router from "../../router/router.js";

export default(app)=>{
    router.post('/profile/searches/create', createFlightInterest)
    app.use('/', router)
}