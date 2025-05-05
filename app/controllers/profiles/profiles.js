import supabase from "../../db/supabase.js";

async function createProfile(request, response) {
  await supabase
    .from("Profiles")
    .insert({
      "id": request.body.id,
      "first_name": request.body.firstName,
      "last_name": request.body.lastName,
      "email": request.body.email,
      "phone": request.body.phone,
      "role": request.body.role,
    })
    .then((data) => {
      response.status(201).send(data);
    })
    .catch((error) => {
      console.log(`Failed to create profile: ${error}`);
      response.status(500).send(error);
    });
}

async function createDriverProfile(request, response){
  await supabase
    .from("DriverProfiles")
    .insert({
      "user_id": request.body.userID,
      "date_of_birth": request.body.dob,
      "license_class": request.body.licenseClass,
      "vehicle_reg_number": request.body.vehicleRegNumber,
    })
    .then((data) => {
      response.status(200).send(data);
    })
    .catch((error) => {
      console.log(`Failed to create profile: ${error}`);
      response.status(500).send(error);
    });
}

export { createProfile, createDriverProfile };
