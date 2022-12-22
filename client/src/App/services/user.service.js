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
        const {data} = await httpService.patch(`${userEndpoint}${payload.userId}/cart`, payload.items)
        return data
    },
    clearCart: async (payload) => {
        const {data} = await httpService.patch(`${userEndpoint}${payload.userId}/cart`, [])
        return data
    },
    removeItem: async (payload) => {
        const {data} = await httpService.patch(`${userEndpoint}${payload.userId}/cart`, payload.items)
        return data
    },
    addPurchasedBooks: async (payload) => {
        const {data} = await httpService.patch(`${userEndpoint}${payload.userId}/purchasedBooks`, [...payload.purchasedItems, ...payload.items])
        return data
    },
    addRatedBook: async (payload) => {
        const {data} = await httpService.patch(`${userEndpoint}${payload.userId}/ratedBooks`, payload.items)
        return data
    }
}

export default userService
