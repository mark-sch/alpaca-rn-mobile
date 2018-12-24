import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
    getPositionsAttempt: null,
    getPositionsSuccess: ['data'],
    getPositionsFailure: ['error']
})

export const PositionsTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
    positions: [],
    status: '',
    fetching: true,
    errorMessage: '',
    error: false
})

/* ------------- Reducers ------------- */
export const getPositionsAttempt = (state, action) => {
    return state.merge({ fetching: true, error: false, errorMessage: '' })
}

export const getPositionsSuccess = (state, action) => {
    return state.merge({ fetching: false, error: false, errorMessage: '', positions: action.data })
}

export const getPositionsFailure = (state, action) => {
    return state.merge({ fetching: false, error: true, errorMessage: action.error })
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_POSITIONS_ATTEMPT]: getPositionsAttempt,
    [Types.GET_POSITIONS_SUCCESS]: getPositionsSuccess,
    [Types.GET_POSITIONS_FAILURE]: getPositionsFailure
})
