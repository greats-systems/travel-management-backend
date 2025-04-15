import { getFlightInterestAnalyticsData } from "../../../controllers/dashboard/flights/flight_analytics.js";
import router from '../../../router/router.js'

export default(app) => {
    router.get('/analytics/flight-interest', getFlightInterestAnalyticsData)
    app.use('/', router)
}