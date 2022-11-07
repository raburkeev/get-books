import {combineReducers, configureStore} from '@reduxjs/toolkit'
import genresReducer from './genres'
import booksReducer from './books'

const rootReducer = combineReducers({
    genres: genresReducer,
    books: booksReducer
})

export function createStore() {
    return configureStore({
        reducer: rootReducer
    })
}
