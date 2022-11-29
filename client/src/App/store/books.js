import {createAction, createSlice} from '@reduxjs/toolkit'
import {isOutDated} from '../utils/isOutdated'
import bookService from '../services/book.service'
import history from '../utils/history'
import {userAddRatedBook} from './user'
import {toast} from 'react-toastify'

const booksSlice = createSlice({
    name: 'books',
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        booksRequested: (state) => {
            state.isLoading = true
        },
        booksReceived: (state, action) => {
            state.entities = action.payload
            state.lastFetch = Date.now()
            state.isLoading = false
        },
        booksRequestFailed: (state, action) => {
            state.error = action.payload
        },
        bookUpdateSucceeded: (state, action) => {
            const bookIndex = state.entities.findIndex(book => book.id === action.payload.id)
            state.entities[bookIndex] = action.payload
        },
        bookUpdateFailed: (state, action) => {
            state.error = action.payload
        },
        bookCreateSucceeded: (state, action) => {
            state.entities.push(action.payload)
        },
        bookCreateFailed: (state, action) => {
            state.error = action.payload
        },
        bookRateUpdateSucceeded: (state, action) => {
            state.entities.find(book => book.id === action.payload.bookId).ratings[action.payload.rate]++
        },
        bookRateUpdateFailed: (state, action) => {
            state.error = action.payload
        },
        bookDeleteSucceeded: (state, action) => {
            state.entities = state.entities.filter(book => book.id !== action.payload)
        },
        bookDeleteFailed: (state, action) => {
            state.error = action.payload
        }
    }
})

const {reducer: booksReducer, actions} = booksSlice
const {
    booksRequested,
    booksReceived,
    booksRequestFailed,
    bookUpdateSucceeded,
    bookUpdateFailed,
    bookCreateSucceeded,
    bookCreateFailed,
    bookRateUpdateSucceeded,
    bookRateUpdateFailed,
    bookDeleteSucceeded,
    bookDeleteFailed
} = actions

const bookUpdateRequested = createAction('books/bookUpdateRequested')
const bookCreateRequested = createAction('books/bookCreateRequested')
const bookRateUpdateRequested = createAction('books/bookRateUpdateRequested')
const bookDeleteRequested = createAction('books/bookDeleteRequested')

export const loadBooksList = () => async (dispatch, getState) => {
    const {lastFetch} = getState().books
    if (isOutDated(lastFetch)) {
        dispatch(booksRequested())
        try {
            const {content} = await bookService.get()
            dispatch(booksReceived(content))
        } catch (error) {
            dispatch(booksRequestFailed(error.message))
        }
    }
}

export const deleteBook = (payload) => async (dispatch) => {
    dispatch(bookDeleteRequested())
    try {
        const {content} = await bookService.deleteBook(payload)
        if (content === null) {
            dispatch(bookDeleteSucceeded(payload.bookId))
        }
    } catch (error) {
        dispatch(bookDeleteFailed())
    }
}

export const updateBook = (payload) => async (dispatch) => {
    dispatch(bookUpdateRequested())
    try {
        const {content} = await bookService.update(payload)
        dispatch(bookUpdateSucceeded(content))
        history.push(`/admin/editBooksList`)
    } catch (error) {
        dispatch(bookUpdateFailed())
    }
}

export const createBook = (payload) => async (dispatch) => {
    dispatch(bookCreateRequested())
    try {
        const {content} = await bookService.addBook(payload)
        dispatch(bookCreateSucceeded(content))
        history.push(`/admin`)
        toast.success('Книга успешно добавлена', {
            position: 'bottom-center',
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'light'
        })
    } catch (error) {
        dispatch(bookCreateFailed(error.message))
    }
}

export const updateBookRate = (payload) => async (dispatch, getState) => {
    dispatch(bookRateUpdateRequested())
    const bookRating = [...getState().books.entities.find(el => el.id === payload.bookId).ratings]
    bookRating[payload.rate]++
    try {
        const {content} = await bookService.updateRating({id: payload.bookId, bookRating})
        if (JSON.stringify(content) === '[{},{},{},{},{}]') {
            dispatch(bookRateUpdateSucceeded({bookId: payload.bookId, rate: payload.rate}))
        }
        dispatch(userAddRatedBook({bookId: payload.bookId, userId: payload.userId}))
        toast.success('Спасибо за Вашу оценку!', {
            position: 'bottom-center',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'light'
        })
    } catch (error) {
        dispatch(bookRateUpdateFailed(error.message))
    }
}

export const getBooksList = () => (state) => state.books.entities
export const getBooksLoadingStatus = () => (state) => state.books.isLoading
export const getBookById = (bookId) => (state) => {
    return state.books.entities ? state.books.entities.find(book => book.id === bookId) : ''
}
export const getBooksByIds = (booksIds) => (state) => {
    if (state.books.entities) {
        const resultBooks = []
        for (const bookId of booksIds) {
            for (const book of state.books.entities) {
                if (book.id === bookId) {
                    resultBooks.push(book)
                }
            }
        }
        return resultBooks
    }
    return []
}

export default booksReducer
