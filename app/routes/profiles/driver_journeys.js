import router from "../../router/router.js";
import journeyController from "../../controllers/profiles/driver_journeys.js";

export default(app) => {
    router.post('/journey/create', journeyController.createJourney)
    router.get('/journeys/:userID', journeyController.getJourneys)
    router.get('/journey/active/:userID', journeyController.getActiveJourneys)
    router.get('/journey/route', journeyController.getRoute)
    router.get('/passenger-demand', journeyController.getPassengerDemand)
    router.patch('/journey/active/:userID/update', journeyController.updateJourney)

    app.use('/', router)
}