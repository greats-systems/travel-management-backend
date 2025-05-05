import { createProfile, createDriverProfile } from "../../controllers/profiles/profiles.js";
import router from "../../router/router.js";

export default(app)=> {
    router.post('/profile/create', createProfile)
    router.post('/profile/driver/create', createDriverProfile)
    app.use('/', router)
}