import { call, put } from 'redux-saga/effects'
import AssetsActions from '../Redux/AssetsRedux'

export function* getAssetsAttempt(api, action) {
    try {
        const response = yield call(api.getAssets)
        if (response.ok) {
            yield put(AssetsActions.getAssetsSuccess(response.data))
        } else {
            const message = response.data.message || 'Something went wrong'
            yield put(AssetsActions.getAssetsFailure(message))
        }
    } catch (error) {
        yield put(AssetsActions.getAssetsFailure(error.message))
    }
}

export function* getBarsAttempt(api, action) {
    const { timeframe, symbols, day } = action
    try {
        const response = yield call(api.getBars, timeframe, symbols)
        if (response.ok) {
            yield put(AssetsActions.getBarsSuccess(response.data, day))
        } else {
            const message = response.data.message || 'Something went wrong'
            yield put(AssetsActions.getBarsFailure(message))
        }
    } catch (error) {
        yield put(AssetsActions.getBarsFailure(error.message))
    }
}
