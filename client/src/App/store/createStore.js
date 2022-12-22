import {combineReducers, configureStore} from '@reduxjs/toolkit'
import genresReducer from './genres'
import booksReducer from './books'
import userReducer from './user'

const rootReducer = combineReducers({
    genres: genresReducer,
    books: booksReducer,
    user: userReducer
})

export function createStore() {
    return configureStore({
        reducer: rootReducer
    })
}
