import { call, put } from 'redux-saga/effects'
import AccountActions from '../Redux/AccountRedux'

export function* getAccountAttempt(api, action) {
    try {
        const response = yield call(api.getAccount)
        console.log("get Account response", response)
        if (response.ok) {
            yield put(AccountActions.getAccountSuccess(response.data))
        } else {
            const message = response.data.message || 'Something went wrong'
            yield put(AccountActions.getAccountFailure(message))
        }
    } catch (error) {
        yield put(AccountActions.getAccountFailure(error.message))
    }
}
