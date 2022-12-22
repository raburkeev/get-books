import {createSlice} from '@reduxjs/toolkit'
import {isOutDated} from '../utils/isOutdated'
import genreService from '../services/genre.service'

const genresSlice = createSlice({
    name: 'genres',
    initialState: {
        entities: [],
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        genresRequested: (state) => {
            state.isLoading = true
        },
        genresReceived: (state, action) => {
            state.entities = action.payload
            state.lastFetch = Date.now()
            state.isLoading = false
        },
        genresRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

const {reducer: genresReducer, actions} = genresSlice
const {genresRequested, genresReceived, genresRequestFailed} = actions

export const loadGenresList = () => async (dispatch, getState) => {
    const {lastFetch} = getState().genres
    if (isOutDated(lastFetch)) {
        dispatch(genresRequested())
        try {
            const {content} = await genreService.get()
            dispatch(genresReceived(content))
        } catch (error) {
            dispatch(genresRequestFailed(error.message))
        }
    }
}

export const getGenresList = () => (state) => state.genres.entities
export const getGenresLoadingStatus = () => (state) => state.genres.isLoading
export const getGenreById = (genreId) => (state) => {
    return state.genres.entities ? state.genres.entities.find(genre => genre._id === genreId) : ''
}

export default genresReducer
