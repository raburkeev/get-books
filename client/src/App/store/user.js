import {createAction, createSlice} from '@reduxjs/toolkit'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'
import userService from '../services/user.service'
import history from '../utils/history'
import {toast} from 'react-toastify'
import {generateAuthError} from '../utils/generateAuthError'

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
            state.isLoading = false
        },
        userRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        userLoggedOut: (state) => {
            state.entity = null
            state.isLoggedIn = false
            state.auth = null
            state.isLoading = false
        },
        userAddItemFailed: (state, action) => {
            state.error = action.payload
        },
        cartItemsAdded: (state, action) => {
            state.entity.cart = action.payload
        },
        cartItemRemoved: (state, action) => {
            state.entity.cart = action.payload
        },
        cartItemRemoveFailed: (state, action) => {
            state.error = action.payload
        },
        userCartCleared: (state, action) => {
            state.entity.cart = action.payload
        },
        userCartClearRequestFailed: (state, action) => {
            state.error = action.payload
        },
        userAddPurchasedBooksSucceeded: (state, action) => {
            if (!state.entity.purchasedBooks) {
                state.entity.purchasedBooks = []
            }
            state.entity.purchasedBooks = action.payload
        },
        userAddPurchasedBooksFailed: (state, action) => {
            state.error = action.payload
        },
        userBooksRated: (state, action) => {
            if (!state.entity.ratedBooks) {
                state.entity.ratedBooks = []
            }
            state.entity.ratedBooks = action.payload
        },
        userAddRatedBookFailed: (state, action) => {
            state.error = action.payload
        }
    }
})

const authRequested = createAction('user/authRequested')
const addItemRequested = createAction('user/addItemRequested')
const clearCartRequested = createAction('user/clearCartRequested')
const userAddPurchasedBooksRequested = createAction('user/userAddPurchasedBooksRequested')
const userAddRatedBookRequested = createAction('user/userAddRatedBookRequested')
const removeItemFromCartRequested = createAction('user/removeItemFromCartRequested')

const {reducer: userReducer, actions} = userSlice
const {
    authRequestSucceeded,
    authRequestFailed,
    userRequested,
    userRequestSucceeded,
    userRequestFailed,
    userLoggedOut,
    userAddItemFailed,
    cartItemsAdded,
    cartItemRemoved,
    cartItemRemoveFailed,
    userCartCleared,
    userCartClearRequestFailed,
    userAddPurchasedBooksSucceeded,
    userAddPurchasedBooksFailed,
    userBooksRated,
    userAddRatedBookFailed
} = actions

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

export const signUp = (payload) => async (dispatch) => {
    dispatch(authRequested())
    try {
        const data = await authService.register(payload)
        localStorageService.setTokens(data)
        dispatch(authRequestSucceeded({userId: data.userId}))
        history.push('/all_books')
    } catch (error) {
        dispatch(authRequestFailed(error.message))
    }
}

export const signIn = (payload) => async (dispatch) => {
    dispatch(authRequested())
    const {email, password} = payload
    try {
        const data = await authService.login({email, password})
        dispatch(authRequestSucceeded({userId: data.userId}))
        localStorageService.setTokens(data)

        const userId = localStorageService.getUserId()
        const {content} = await userService.getUser(userId)
        dispatch(userRequestSucceeded(content))

        history.push('/all_books')
    } catch (error) {
        const {code, message} = error.response.data.error
        if (code === 400) {
            const errorMessage = generateAuthError(message)
            dispatch(authRequestFailed(errorMessage))
        } else {
            dispatch(authRequestFailed(error.message))
        }
    }
}

export const addItemToCart = (payload) => async (dispatch, getState) => {
    dispatch(addItemRequested())
    try {
        const {content} = await userService.addItem({userId: payload.userId, items: [...getState().user.entity.cart, ...payload.items]})
        dispatch(cartItemsAdded(content))
    } catch (error) {
        dispatch(userAddItemFailed(error.message))
    }
}

export const remoteItemFromCart = (payload) => async (dispatch) => {
    dispatch(removeItemFromCartRequested())
    try {
        const {content} = await userService.removeItem(payload)
        console.log(content)
        dispatch(cartItemRemoved(content))
    } catch (error) {
        dispatch(cartItemRemoveFailed(error.message))
    }
}

export const clearUserCart = (payload) => async (dispatch) => {
    dispatch(clearCartRequested())
    try {
        const {content} = await userService.clearCart(payload)
        dispatch(userCartCleared(content))
        toast.success('?????????????? ???? ??????????????! ?????????????????? ?????????? ???? ???????????? ?????????? ?? ???????? ?? ??????????????.', {
            position: 'bottom-center',
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'light'
        })
    } catch (error) {
        dispatch(userCartClearRequestFailed(error.message))
    }
}

export const addPurchasedBooks = (payload) => async (dispatch) => {
    dispatch(userAddPurchasedBooksRequested())
    try {
        const {content} = await userService.addPurchasedBooks(payload)
        dispatch(userAddPurchasedBooksSucceeded(content))
        dispatch(clearUserCart({userId: payload.userId}))
    } catch (error) {
        dispatch(userAddPurchasedBooksFailed(error.message))
    }
}

export const userAddRatedBook = (payload) => async (dispatch, getState) => {
    dispatch(userAddRatedBookRequested())
    const updatedUser = {...getState().user.entity}
    if (!updatedUser.ratedBooks) {
        updatedUser.ratedBooks = []
    }
    try {
        const {content} = await userService.addRatedBook({userId: payload.userId, items: [...updatedUser.ratedBooks, payload.bookId]})
        dispatch(userBooksRated(content))
    } catch (error) {
        dispatch(userAddRatedBookFailed(error.message))
    }
}

export const logout = () => (dispatch) => {
    localStorageService.removeAuthData()
    dispatch(userLoggedOut())
    history.push('/all_books')
}

export const getUser = () => (state) => state.user.entity
export const getUserLoadingStatus = () => (state) => state.user.isLoading
export const getUserError = () => (state) => state.user.error
export const getUserId = () => (state) => state.user.auth ? state.user.auth.userId : null
export const getIsLoggedIn = () => (state) => state.user.isLoggedIn
export const getUserCart = () => (state) => state.user.entity ? state.user.entity.cart : []
export const getUserPurchasedBooks = () => (state) => state.user?.entity?.purchasedBooks ? state.user.entity.purchasedBooks : []
export const getIsAdmin = () => (state) => state.user.entity ? state.user.entity.isAdmin : null
export const getRatedBooks = () => (state) => state.user?.entity?.ratedBooks ? state.user.entity.ratedBooks : []

export default userReducer
