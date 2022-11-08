import httpService from './http.service'

const bookEndPoint = 'book/'

const bookService = {
    get: async () => {
        const {data} = await httpService.get(bookEndPoint)
        return data
    },
    update: async (payload) => {
        const {data} = await httpService.patch(`${bookEndPoint}${payload.id}`, payload)
        return data
    }
}

export default bookService
