import supabase from "../../db/supabase.js";

async function registerBus(request, response) {
  await supabase
    .from("Bus")
    .insert({
      reg_number: request.bod.regNumber,
      total_seats: request.body.totalSeats,
      companyID: request.body.companyID,
    })
    .then((data) => {
      response.status(201).send(data.statusText);
    })
    .catch((error) => {
      response.status(500).send(error);
    });
}

async function getShuttleCompanies(_, response) {
  await supabase
    .from("ShuttleServiceCompanies")
    .select()
    .then((data) => {
      response.status(200).send(data.data);
    })
    .catch((error) => {
      response.status(500).send(error);
    });
}

async function getShuttleCompany(request, response) {
  await supabase
    .from("ShuttleServiceCompany")
    .select()
    .eq("name", request.body.companyName)
    .then((data) => {
      response.status(200).send(data.data);
    })
    .catch((error) => {
      response.status(500).send(error);
    });
}

async function getShuttleRoutes(request, response) {
  await supabase
    .from("ShuttleRoutes")
    .select("*, ShuttleServiceCompany(company_id, name)")
    .eq("origin", request.body.origin)
    .eq("destination", request.body.destination)
    .then((data) => {
      console.log(data.data[0]["ShuttleServiceCompany"]["name"]);
      response.status(200).send(data.data);
    })
    .catch((error) => {
      response.status(500).send(error);
    });
}

async function getAvailableSeats(request, response) {
  await supabase
    .from("Seat")
    .select("*")
    .eq("bus_id", request.body.busID)
    .eq("is_available", true)
    .order("number", { ascending: true })
    .then((data) => {
      response.status(200).send(data.data);
    })
    .catch((error) => {
      response.status(500).send(error);
    });
}

export {
  registerBus,
  getShuttleCompanies,
  getShuttleCompany,
  getShuttleRoutes,
  getAvailableSeats,
};
