import httpService from './http.service'

const userEndpoint = 'user/'

const userService = {
    create: async (payload) => {
        const {data} = await httpService.put(`${userEndpoint}${payload.id}`, payload)
        return data
    },
    getUser: async (id) => {
        const {data} = await httpService.get(`${userEndpoint}${id}`)
        return data
    },
    addItem: async (payload) => {
        const {data} = await httpService.post(`${userEndpoint}${payload.userId}/cart`, payload.userCart)
        console.log(data)
        return data
    }
}

export default userService
