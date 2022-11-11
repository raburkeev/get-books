import httpService from './http.service'

const orderEndpoint = 'order/'

const orderService = {
    createOrder: async (payload) => {
        const {data} = await httpService.put(`${orderEndpoint}${payload.id}`, payload)
        return data
    },
    fetchAll: async () => {
        const {data} = await httpService.get(orderEndpoint)
        return data
    }
}

export default orderService
