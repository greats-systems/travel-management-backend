import router from "../../router/router.js";
import getDestinations from "../../controllers/destinations/destinations.js";

export default (app) => {
    router.get('/destinations', getDestinations)
    app.use('/', router)
}