import genres from '../mockData/genres'
import books from '../mockData/books'
import httpService from '../services/http.service'

const useMockData = () => {
    const initialize = async () => {
        try {
            for (const book of books) {
                await httpService.put(`book/${book.id}`, book)
            }
            for (const genre of genres) {
                await httpService.put(`genre/${genre.id}`, genre)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return {initialize}
}

export default useMockData
