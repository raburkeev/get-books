import {combineReducers, configureStore} from '@reduxjs/toolkit'
import genresReducer from './genres'

const rootReducer = combineReducers({
    genres: genresReducer
})

export function createStore() {
    return configureStore({
        reducer: rootReducer
    })
}
