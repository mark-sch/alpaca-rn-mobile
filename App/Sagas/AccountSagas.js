import { call, put } from 'redux-saga/effects'
import AccountActions from '../Redux/AccountRedux'

export function* getAccountAttempt(api, action) {
    try {
        const response = yield call(api.getAccount)
        console.log("get Account response", response)
        if (response.ok) {
            yield put(AccountActions.getAccountSuccess(response.data))
        } else {
            yield put(AccountActions.getAccountFailure('Connection problems :('))
        }
    } catch (error) {
        yield put(AccountActions.getAccountFailure(error.message))
    }
}
