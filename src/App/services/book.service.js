import httpService from './http.service'

const bookEndPoint = '/book'

const bookService = {
    get: async () => {
        const {data} = await httpService.get(bookEndPoint)
        return data
    }
}

export default bookService
