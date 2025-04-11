import supabase from '../../db/supabase.js'

async function getShuttleCompanies(_, response){
    await supabase
    .from('ShuttleServiceCompanies')
    .select()
    .then((data)=>{
        response.status(200).send(data.data)
    })
    .catch((error)=>{
        response.status(500).send(error)
    })
}

async function getShuttleCompany(request, response){
    await supabase
    .from('ShuttleServiceCompanies')
    .select()
    .eq('name', request.body.companyName)
    .then((data)=>{
        response.status(200).send(data.data)
    })
    .catch((error)=>{
        response.status(500).send(error)
    })
}

async function getShuttleRoutes(request, response){
    await supabase
    .from('ShuttleRoutes')
    .select()
    .eq('company_id', request.body.companyID)
    .then((data)=>{
        response.status(200).send(data.data)
    })
    .catch((error)=>{
        response.status(500).send(error)
    })
}

export { getShuttleCompanies, getShuttleCompany, getShuttleRoutes }