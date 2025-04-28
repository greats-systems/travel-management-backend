import supabase from '../../../db/supabase.js'

async function getShuttleInterestAnalyticsData(_, response){
    await supabase
    .from('popular_routes')
    .select('*')
    .then((data) => {
        response.status(200).send(data.data)
    })
    .catch((error)=> [
        response.status(500).send(error)
    ])
}

async function getShuttleInterestRawData(_, response){
    await supabase
    .from('ShuttleInterest')
    .select('*')
    .then((data) => {
        response.status(200).send(data.data)
    })
    .catch((error)=> [
        response.status(500).send(error)
    ])
}

async function getPendingBookings(_, response){
    await supabase
    .from('ShuttleBooking')
    .select('*')
    .eq('status', 'pending')
    .then((data) => {
        response.status(200).send(data.data)
    })
    .catch((error)=> [
        response.status(500).send(error)
    ])
}

export { getShuttleInterestAnalyticsData, getShuttleInterestRawData, getPendingBookings }