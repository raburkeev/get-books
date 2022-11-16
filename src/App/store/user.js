import {createAction, createSlice} from '@reduxjs/toolkit'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'
import userService from '../services/user.service'
import history from '../utils/history'
import {toast} from 'react-toastify'

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
const userCreateRequested = createAction('user/userCreateRequested')
const addItemRequested = createAction('user/addItemRequested')
const clearCartRequested = createAction('user/clearCartRequested')
const userAddPurchasedBooksRequested = createAction('user/userAddPurchasedBooksRequested')
const userAddRatedBookRequested = createAction('user/userAddRatedBookRequested')

const {reducer: userReducer, actions} = userSlice
const {authRequestSucceeded, authRequestFailed, userCreated, userCreateFailed, userRequested, userRequestSucceeded, userRequestFailed, userLoggedOut, userAddItemFailed, cartItemsAdded, userCartCleared, userCartClearRequestFailed, userAddPurchasedBooksSucceeded, userAddPurchasedBooksFailed, userBooksRated, userAddRatedBookFailed} = actions

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

export const clearUserCart = (payload) => async (dispatch) => {
    dispatch(clearCartRequested())
    try {
        const {content} = await userService.clearCart(payload)
        const initialUserCart = content.map(el => Object.keys(el).map(index => el[index]).join(''))
        dispatch(userCartCleared(initialUserCart))
        toast.success('Спасибо за покупку! Купленные книги Вы можете найти у себя в профиле.', {
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
        const purchasedBooks = content.map(el => Object.keys(el).map(index => el[index]).join(''))
        dispatch(userAddPurchasedBooksSucceeded(purchasedBooks))
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
        const ratedBookId = content.map(el => Object.keys(el).map(index => el[index]).join(''))
        dispatch(userBooksRated(ratedBookId))
    } catch (error) {
        dispatch(userAddRatedBookFailed(error.message))
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
export const getUserLoadingStatus = () => (state) => state.user.isLoading
export const getUserId = () => (state) => state.user.auth ? state.user.auth.userId : null
export const getIsLoggedIn = () => (state) => state.user.isLoggedIn
export const getUserCart = () => (state) => state.user.entity ? state.user.entity.cart : ['init']
export const getUserPurchasedBooks = () => (state) => state.user?.entity?.purchasedBooks ? state.user.entity.purchasedBooks : []
export const getIsAdmin = () => (state) => state.user.entity ? state.user.entity.isAdmin : null
export const getRatedBooks = () => (state) => state.user?.entity?.ratedBooks ? state.user.entity.ratedBooks : []

export default userReducer
