import genres from '../mockData/genres'
import books from '../mockData/books'
import httpService from '../services/http.service'
import {toast} from 'react-toastify'

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
            toast.error(error.message)
        }
    }

    return {initialize}
}

export default useMockData
