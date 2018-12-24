import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
    getOrdersAttempt: null,
    getOrdersSuccess: ['data'],
    getOrdersFailure: ['error']
})

export const OrdersTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
    orders: [],
    status: '',
    fetching: true,
    errorMessage: '',
    error: false
})

/* ------------- Reducers ------------- */
export const getOrdersAttempt = (state, action) => {
    return state.merge({ fetching: true, error: false, errorMessage: '' })
}

export const getOrdersSuccess = (state, action) => {
    return state.merge({ fetching: false, error: false, errorMessage: '', orders: action.data })
}

export const getOrdersFailure = (state, action) => {
    return state.merge({ fetching: false, error: true, errorMessage: action.error })
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_ORDERS_ATTEMPT]: getOrdersAttempt,
    [Types.GET_ORDERS_SUCCESS]: getOrdersSuccess,
    [Types.GET_ORDERS_FAILURE]: getOrdersFailure
})
