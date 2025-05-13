import router from "../router/router.js";

export default (app) => {
  router.get("/", (_, response) => {
    response.status(200).send("Welcome to the Wild Encounter Travels backend");
  });
  app.use("/", router);
};
