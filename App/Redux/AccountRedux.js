import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
    getAccountAttempt: null,
    getAccountSuccess: ['data'],
    getAccountFailure: ['error']
})

export const AccountTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
    account: [],
    fetching: true,
    errorMessage: '',
    error: false
})

/* ------------- Reducers ------------- */
export const getAccountAttempt = (state, action) => {
    return state.merge({ fetching: true, error: false, errorMessage: '' })
}

export const getAccountSuccess = (state, action) => {
    return state.merge({ fetching: false, error: false, errorMessage: '', account: action.data })
}

export const getAccountFailure = (state, action) => {
    return state.merge({ fetching: false, error: true, errorMessage: action.error })
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_ACCOUNT_ATTEMPT]: getAccountAttempt,
    [Types.GET_ACCOUNT_SUCCESS]: getAccountSuccess,
    [Types.GET_ACCOUNT_FAILURE]: getAccountFailure
})
