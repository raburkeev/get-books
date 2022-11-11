/*eslint-disable*/
import {createAction, createSlice} from '@reduxjs/toolkit'
import orderService from '../services/order.service'
import {clearUserCart} from './user'

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        entities: [],
        isLoading: true,
        error: false
    },
    reducers: {
        createOrderSucceeded: (state, action) => {
            state.entities.push(action.payload)
        },
        createOrderFailed: (state, action) => {
            state.error = action.payload
        },
        ordersRequested: (state) => {
            state.isLoading = true
        },
        ordersRequestSucceeded: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        ordersRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

const createOrderRequested = createAction('orders/createOrderRequested')

const {reducer: ordersReducer, actions} = ordersSlice
const {createOrderSucceeded, createOrderFailed, ordersRequested, ordersRequestSucceeded, ordersRequestFailed} = actions

export const loadOrdersList = () => async (dispatch) => {
    dispatch(ordersRequested())
    try {
        const {content} = await orderService.fetchAll()
        dispatch(ordersRequestSucceeded(content))
    } catch (error) {
        dispatch(ordersRequestFailed(error.message))
    }
}

export const createOrder = (payload) => async (dispatch) => {
    dispatch(createOrderRequested())
    try {
        const {content} = await orderService.createOrder(payload)
        dispatch(createOrderSucceeded(content))
        dispatch(clearUserCart({userId: content.userId}))
    } catch (error) {
        dispatch(createOrderFailed())
    }
}

export default ordersReducer
