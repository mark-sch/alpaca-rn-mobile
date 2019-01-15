import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
    getOrdersAttempt: ['status', 'params'],
    getOrdersSuccess: ['data', 'status'],
    getOrdersFailure: ['error'],
    cancelOrderAttempt: ['order_id'],
    cancelOrderSuccess: null,
    cancelOrderFailure: ['error'],
    postOrderAttempt: ['data'],
    postOrderSuccess: ['data'],
    postOrderFailure: ['error'],
})

export const OrdersTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
    orders: [],
    openOrders: [],
    status: '',
    fetching: false,
    cancelingOrder: false,
    postingOrder: false,
    orderResult: null,
    errorMessage: '',
    error: false
})

/* ------------- Reducers ------------- */
export const getOrdersAttempt = (state, action) => {
    return state.merge({ fetching: true, error: false, errorMessage: '' })
}

export const getOrdersSuccess = (state, action) => {
    const { status, data } = action
    if (status === 'all') {
        return state.merge({ fetching: false, error: false, errorMessage: '', orders: data })    
    } else if (status === 'open') {
        return state.merge({ fetching: false, error: false, errorMessage: '', openOrders: data })
    }
}

export const getOrdersFailure = (state, action) => {
    return state.merge({ fetching: false, error: true, errorMessage: action.error })
}

export const cancelOrderAttempt = (state, action) => {
    return state.merge({ cancelingOrder: true, error: false, errorMessage: '' })
}

export const cancelOrderSuccess = (state, action) => {
    return state.merge({ cancelingOrder: false, error: false, errorMessage: ''})
}

export const cancelOrderFailure = (state, action) => {
    return state.merge({ cancelingOrder: false, error: true, errorMessage: action.error })
}

export const postOrderAttempt = (state, action) => {
    return state.merge({ postingOrder: true, error: false, errorMessage: '' })
}

export const postOrderSuccess = (state, action) => {
    return state.merge({ postingOrder: false, error: false, errorMessage: '', orderResult: action.data })
}

export const postOrderFailure = (state, action) => {
    return state.merge({ postingOrder: false, error: true, errorMessage: action.error })
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_ORDERS_ATTEMPT]: getOrdersAttempt,
    [Types.GET_ORDERS_SUCCESS]: getOrdersSuccess,
    [Types.GET_ORDERS_FAILURE]: getOrdersFailure,
    [Types.CANCEL_ORDER_ATTEMPT]: cancelOrderAttempt,
    [Types.CANCEL_ORDER_SUCCESS]: cancelOrderSuccess,
    [Types.CANCEL_ORDER_FAILURE]: cancelOrderFailure,
    [Types.POST_ORDER_ATTEMPT]: postOrderAttempt,
    [Types.POST_ORDER_SUCCESS]: postOrderSuccess,
    [Types.POST_ORDER_FAILURE]: postOrderFailure
})
