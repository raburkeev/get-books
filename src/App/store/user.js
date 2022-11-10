/*eslint-disable*/
import {createAction, createSlice} from '@reduxjs/toolkit'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'
import userService from '../services/user.service'
import history from '../utils/history'

const initialState = localStorageService.getAccessToken()
    ? {
        entity: null,
        isLoading: true,
        error: null,
        auth: {userId: localStorageService.getUserId()},
        isLoggedIn: true
    }
    : {
        entity: null,
        isLoading: true,
        error: null,
        auth: null,
        isLoggedIn: false
    }

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        authRequestSucceeded: (state, action) => {
            state.auth = action.payload
            state.isLoggedIn = true
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload
        },
        userCreated: (state, action) => {
            state.entity = action.payload
        },
        userCreateFailed: (state, action) => {
            state.error = action.payload
        },
        userRequested: (state) => {
            state.isLoading = true
        },
        userRequestSucceeded: (state, action) => {
            state.entity = action.payload
        },
        userRequestFailed: (state, action) => {
            state.error = action.payload
        },
        userLoggedOut: (state) => {
            state.entity = null
            state.isLoggedIn = false
            state.auth = null
        },
        userAddItemFailed: (state, action) => {
            state.error = action.payload
        },
        cartItemsAdded: (state, action) => {
            state.entity.cart = action.payload
        }
    }
})

const authRequested = createAction('user/authRequested')
const userCreateRequested = createAction('user/userCreateRequested')
const addItemRequested = createAction('user/addItemRequested')

const {reducer: userReducer, actions} = userSlice
const {authRequestSucceeded, authRequestFailed, userCreated, userCreateFailed, userRequested, userRequestSucceeded, userRequestFailed, userLoggedOut, userAddItemFailed, cartItemsAdded} = actions

export const loadUser = () => async (dispatch) => {
    dispatch(userRequested())
    try {
        const userId = localStorageService.getUserId()
        const {content} = await userService.getUser(userId)
        dispatch(userRequestSucceeded(content))
    } catch (error) {
        dispatch(userRequestFailed(error.message))
    }
}

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

export const signIn = (payload) => async (dispatch) => {
    dispatch(authRequested())
    const {email, password} = payload
    try {
        const data = await authService.login({email, password})
        dispatch(authRequestSucceeded({userId: data.localId}))
        localStorageService.setTokens(data)

        const userId = localStorageService.getUserId()
        const {content} = await userService.getUser(userId)
        dispatch(userRequestSucceeded(content))

        history.push('/all_books')
    } catch (error) {
        dispatch(authRequestFailed(error.message))
    }
}

export const addItemToCart = (payload) => async (dispatch, getState) => {
    dispatch(addItemRequested())
    try {
        const {content} = await userService.addItem({userId: payload.userId, items: [...getState().user.entity.cart, ...payload.items]})
        const newUserCart = content.map(el => Object.keys(el).map(index => el[index]).join(''))
        dispatch(cartItemsAdded(newUserCart))
    } catch (error) {
        dispatch(userAddItemFailed(error.message))
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

export const logout = () => (dispatch) => {
    localStorageService.removeAuthData()
    dispatch(userLoggedOut())
    history.push('/all_books')
}

export const getUser = () => (state) => state.user.entity
export const getUserId = () => (state) => state.user.auth ? state.user.auth.userId : null
export const getIsLoggedIn = () => (state) => state.user.isLoggedIn
export const getUserCart = () => (state) => state.user.entity ? state.user.entity.cart : ['init']

export default userReducer
