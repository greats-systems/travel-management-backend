import router from "../../router/router.js";
import flightDeals from "../../controllers/flight_deals/flight_deals.js";

export default(app) => {
    router.get('/flight-deals', flightDeals)
    app.use('/', router)
}