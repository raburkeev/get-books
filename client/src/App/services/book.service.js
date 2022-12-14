import httpService from './http.service'

const bookEndPoint = 'book/'

const bookService = {
    get: async () => {
        const {data} = await httpService.get(bookEndPoint)
        return data
    },
    update: async (payload) => {
        const {data} = await httpService.patch(`${bookEndPoint}${payload._id}`, payload)
        return data
    },
    addBook: async (payload) => {
        const {data} = await httpService.post(`${bookEndPoint}`, payload)
        return data
    },
    updateRating: async (payload) => {
        const {data} = await httpService.patch(`${bookEndPoint}${payload.bookId}/ratings`, payload.ratings)
        return data
    },
    deleteBook: async (payload) => {
        const {data} = await httpService.delete(`${bookEndPoint}${payload.bookId}`)
        return data
    }
}

export default bookService
