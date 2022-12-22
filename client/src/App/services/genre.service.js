import httpService from './http.service'

const genreEndPoint = '/genre'

const genreService = {
    get: async () => {
        const {data} = await httpService.get(genreEndPoint)
        return data
    }
}

export default genreService
