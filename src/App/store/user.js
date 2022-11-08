/*eslint-disable*/
import {createAction, createSlice} from '@reduxjs/toolkit'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'
import userService from '../services/user.service'
import history from '../utils/history'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        entity: null,
        isLoading: true,
        error: null,
        auth: null
    },
    reducers: {
        authRequestSucceeded: (state, action) => {
            state.auth = action.payload
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload
        },
        userCreated: (state, action) => {
            state.entity = action.payload
        },
        userCreateFailed: (state, action) => {
            state.error = action.payload
        }
    }
})

const authRequested = createAction('user/authRequested')
const userCreateRequested = createAction('user/userCreateRequested')

const {reducer: userReducer, actions} = userSlice
const {authRequestSucceeded, authRequestFailed, userCreated, userCreateFailed} = actions

export const signUp = ({email, password, ...rest}) => async (dispatch) => {
    dispatch(authRequested())
    try {
        const data = await authService.register({email, password})
        localStorageService.setTokens(data)
        dispatch(authRequestSucceeded({userId: data.localId}))
        dispatch(createUser({
            id: data.localId,
            email,
            img: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1).toString(36).substring(7)}.svg`,
            ...rest
        }))
    } catch (error) {
        dispatch(authRequestFailed(error.message))
    }
}

function createUser(payload) {
    return async (dispatch) => {
        dispatch(userCreateRequested())
        try {
            const {content} = await userService.create(payload)
            dispatch(userCreated(content))
            history.push('/all_books')
        } catch (error) {
            dispatch(userCreateFailed(error.message))
        }
    }
}

export default userReducer
