import { createProfile } from "../../controllers/profiles/profiles.js";
import router from "../../router/router.js";

export default(app)=> {
    router.post('/profile/create', createProfile)
    app.use('/', router)
}