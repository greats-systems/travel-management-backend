import { getShuttleInterestAnalyticsData, getShuttleInterestRawData, getPendingBookings } from "../../../controllers/dashboard/shuttles/shuttle_analytics.js";
import router from '../../../router/router.js'

export default(app) => {
    router.get('/data/shuttle-interest', getShuttleInterestRawData)
    router.get('/analytics/shuttle-interest', getShuttleInterestAnalyticsData)
    router.get('/bookings/pending', getPendingBookings)
    app.use('/', router)
}