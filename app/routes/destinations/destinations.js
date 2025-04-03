import router from "../../router/router.js";
import destinations from "../../controllers/destinations/destinations.js";

export default (app) => {
    router.get('/destinations', destinations)
    app.use('/', router)
}