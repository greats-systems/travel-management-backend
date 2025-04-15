import supabase from '../../../db/supabase.js'

async function getFlightInterestAnalyticsData(_, response){
    await supabase
    .from('flight_interest_stats')
    .select('*')
    .then((data) => {
        response.status(200).send(data.data)
    })
    .catch((error)=> [
        response.status(500).send(error)
    ])
}

export { getFlightInterestAnalyticsData }