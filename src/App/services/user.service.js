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
        // const {data: userCart} = await httpService.get(`${userEndpoint}${payload.userId}/cart`)
        // console.log(payload.itemId)
        // const id = []
        // console.log(Object.keys(userCart.content))
        // Object.keys(userCart.content).forEach(key => {
        //     // console.log(key)
        //     id.push(userCart.content[key])
        // })
        // console.log(id)
        // console.log([...userCart.content])
        // const q = [userCart.content, payload.itemId]
        // console.log(q)
        const {data} = await httpService.put(`${userEndpoint}${payload.userId}/cart`, payload.items)
        return data
    }
}

export default userService
