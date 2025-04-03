// Load .env file
import Amadeus from 'amadeus';
import env from 'dotenv'

env.config()

// Initialize Amadeus with .env variables
const amadeus = new Amadeus({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});


async function getFlightPrices() {
  try {
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: 'HRE',
      destinationLocationCode: 'DXB',
      departureDate: '2025-04-03',
      adults: 1
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

getFlightPrices();

/*
async function searchLocations(keyword) {
  try {
    const response = await amadeus.referenceData.locations.get({
      keyword: keyword,
      subType: 'AIRPORT,CITY', // Can also use Amadeus.location.any
    });
    return response.result;
  } catch (error) {
    console.error("Location search error:", error);
    throw error;
  }
}

// Example usage
searchLocations("New York").then(console.log);
*/