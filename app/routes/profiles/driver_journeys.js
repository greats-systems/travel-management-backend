import router from "../../router/router.js";
import journeyController from "../../controllers/profiles/driver_journeys.js";

export default(app) => {
    router.post('/journey/create', journeyController.createRideJourney)
    router.get('/journeys/:userID', journeyController.getActiveRideJourneys)
    router.get('/journey/active/:userID', journeyController.getRideJourneys)
    router.get('/journey/route', journeyController.getRoute)
    router.get('/passenger-demand', journeyController.getPassengerDemand)
    router.patch('/journey/active/:userID/update', journeyController.updateRideJourney)

    app.use('/', router)
}