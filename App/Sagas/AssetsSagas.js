import { call, put } from 'redux-saga/effects'
import AssetsActions from '../Redux/AssetsRedux'

export function* getAssetsAttempt(api, action) {
    try {
        const response = yield call(api.getAssets)
        console.log("get Assets response", response)
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
    const { params } = action
    try {
        const response = yield call(api.getBars, params)
        console.log("get bars response", response)
        if (response.ok) {
            yield put(AssetsActions.getBarsSuccess(response.data))
        } else {
            const message = response.data.message || 'Something went wrong'
            yield put(AssetsActions.getBarsFailure(message))
        }
    } catch (error) {
        yield put(AssetsActions.getBarsFailure(error.message))
    }
}
