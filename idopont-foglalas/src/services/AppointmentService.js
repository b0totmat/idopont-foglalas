import Api from '@/services/Api.js'

const api = Api()

export default {
    index() {
        return api.get('/appointments')
    },
    insert(appointment) {
        return api.post('/appointments', appointment)
    }
}
