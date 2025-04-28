import router from '../../router/router.js'
import { registerBus, getShuttleCompanies, getShuttleCompany, getShuttleRoutes } from '../../controllers/shuttles/shuttles.js'

export default(app)=>{
    router.post('/bus/register', registerBus)
    router.get('/shuttles', getShuttleCompanies)
    router.get('/shuttle', getShuttleCompany)
    router.get('/shuttle/routes', getShuttleRoutes)
    app.use('/', router)
}