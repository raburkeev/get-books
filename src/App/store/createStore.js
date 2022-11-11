import {combineReducers, configureStore} from '@reduxjs/toolkit'
import genresReducer from './genres'
import booksReducer from './books'
import userReducer from './user'
import ordersReducer from './orders'

const rootReducer = combineReducers({
    genres: genresReducer,
    books: booksReducer,
    user: userReducer,
    orders: ordersReducer
})

export function createStore() {
    return configureStore({
        reducer: rootReducer
    })
}
