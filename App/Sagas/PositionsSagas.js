import { call, put } from 'redux-saga/effects'
import PositionsActions from '../Redux/PositionsRedux'

export function* getPositionsAttempt(api, action) {
    try {
        const response = yield call(api.getPositions)
        console.log("get positions response", response)
        if (response.ok) {
            yield put(PositionsActions.getPositionsSuccess(response.data))
        } else {
            const message = response.data.message || 'Something went wrong'
            yield put(PositionsActions.getPositionsFailure(message))
        }
    } catch (error) {
        yield put(PositionsActions.getPositionsFailure(error.message))
    }
}
