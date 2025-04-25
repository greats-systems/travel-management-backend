import router from '../../router/router.js'
import { createParcelShipment, viewParcelShipments, viewShippingCompanies, calculateDistance } from '../../controllers/parcels/parcels.js'

export default (app) => {
    router.post('/parcel-shipments/create', createParcelShipment)
    router.get('/parcel-shipments', viewParcelShipments)
    router.get('/shipping-companies', viewShippingCompanies)
    router.get('/distance', calculateDistance)

    app.use('/', router)
}