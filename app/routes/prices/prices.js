import router from "../../router/router.js";
import getPrices from "../../controllers/prices/prices.js";

export default(app) => {
    router.get('/prices', getPrices)
    app.use('/', router)
}