import {createAction, createSlice} from '@reduxjs/toolkit'
import {isOutDated} from '../utils/isOutdated'
import bookService from '../services/book.service'
import history from '../utils/history'

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
        }
    }
})

const {reducer: booksReducer, actions} = booksSlice
const {booksRequested, booksReceived, booksRequestFailed, bookUpdateSucceeded, bookUpdateFailed} = actions

const bookUpdateRequested = createAction('books/bookUpdateRequested')

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

export const updateBook = (payload) => async (dispatch) => {
    dispatch(bookUpdateRequested())
    try {
        const {content} = await bookService.update(payload)
        dispatch(bookUpdateSucceeded(content))
        history.push(`/all_books/${content.id}`)
    } catch (error) {
        dispatch(bookUpdateFailed())
    }
}

export const getBooksList = () => (state) => state.books.entities
export const getBooksLoadingStatus = () => (state) => state.books.isLoading
export const getBookById = (bookId) => (state) => {
    return state.books.entities ? state.books.entities.find(book => book.id === bookId) : ''
}

export default booksReducer
