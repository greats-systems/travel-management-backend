import router from "../../router/router.js";
import getFlightStatus from "../../controllers/flight_status/flight_status.js";

export default (app) => {
  router.get("/flight/status", getFlightStatus);
  app.use("/", router);
};
