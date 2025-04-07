import router from "../../router/router.js";
import getFlightPrices from "../../controllers/prices/prices.js";

export default(app) => {
    router.get('/flight/prices', getFlightPrices)
    app.use('/', router)
}