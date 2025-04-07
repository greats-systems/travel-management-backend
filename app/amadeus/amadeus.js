import Amadeus from "amadeus";
import env from "dotenv";

env.config();

// Initialize Amadeus with .env variables
const amadeus = new Amadeus({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

export default amadeus