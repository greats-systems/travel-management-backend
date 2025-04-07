import amadeus from "../../amadeus/amadeus.js";

export default async function getFlightStatus(request, response) {
  try {
    const apiResponse = await amadeus.schedule.flights.get({
      carrierCode: request.body.carrierCode,
      flightNumber: request.body.flightNumber,
    //   origin: request.body.origin,
      scheduledDepartureDate: request.body.scheduledDepartureDate,
    });
    response.status(200).send(apiResponse.data);
  } catch (error) {
    console.log(error);
    response.status(500).send("Failed to process request");
  }
}
