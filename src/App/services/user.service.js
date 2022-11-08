import httpService from './http.service'

const userEndpoint = 'user/'

const userService = {
    create: async (payload) => {
        const {data} = await httpService.put(`${userEndpoint}${payload.id}`, payload)
        return data
    }
}

export default userService
