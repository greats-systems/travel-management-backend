import router from '../../router/router.js'
import { getShuttleCompanies, getShuttleCompany, getShuttleRoutes } from '../../controllers/shuttles/shuttles.js'

export default(app)=>{
    router.get('/shuttles', getShuttleCompanies)
    router.get('/shuttle', getShuttleCompany)
    router.get('/shuttle/routes', getShuttleRoutes)
    app.use('/', router)
}