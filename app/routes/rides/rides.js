import router from "../../router/router.js";
import ridesController from "../../controllers/rides/rides.js";

export default(app) => {
    router.post('/ride/book', ridesController.bookRide)
    router.get('/rides', ridesController.getRides)
    router.get('/ride/:userID', ridesController.getRide)
    /*
    router.get('/journeys/:userID', ridesController.getActiveRideJourneys)
    router.get('/journey/active/:userID', ridesController.getRideJourneys)
    router.get('/journey/route', ridesController.getRoute)
    router.get('/passenger-demand', ridesController.getPassengerDemand)
    router.patch('/journey/active/:userID/update', ridesController.updateRideJourney)
    */
    app.use('/', router)
}