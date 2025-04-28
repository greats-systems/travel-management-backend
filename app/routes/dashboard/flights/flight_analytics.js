import { getFlightInterestAnalyticsData, getFlightInterestRawData } from "../../../controllers/dashboard/flights/flight_analytics.js";
import router from '../../../router/router.js'

export default(app) => {
    router.get('/data/flight-interest', getFlightInterestRawData)
    router.get('/analytics/flight-interest', getFlightInterestAnalyticsData)
    app.use('/', router)
}