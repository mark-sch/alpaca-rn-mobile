import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
    appStartAttempt: ['data'],
})

export const AppTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
})

/* ------------- Reducers ------------- */
export const appStartAttempt = (state, action) => {
    return state.merge({})
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.APP_START_ATTEMPT]: appStartAttempt,
})
