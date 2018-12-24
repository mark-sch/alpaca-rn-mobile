import { call, put } from 'redux-saga/effects'
import OrdersActions from '../Redux/OrdersRedux'

export function* getOrdersAttempt(api, action) {
    try {
        const response = yield call(api.getOrders)
        console.log("get orders response", response)
        if (response.ok) {
            yield put(OrdersActions.getOrdersSuccess(response.data))
        } else {
            yield put(OrdersActions.getOrdersFailure('Connection problems :('))
        }
    } catch (error) {
        yield put(OrdersActions.getOrdersFailure(error.message))
    }
}
