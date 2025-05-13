import controller from '../../controllers/airport_search/airport_search.js'
import router from './router'

export default (app) => {
    router.get('/city-airport-search', controller)
    app.use('/', router)
}