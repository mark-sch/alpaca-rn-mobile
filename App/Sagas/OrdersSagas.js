import { call, put } from 'redux-saga/effects'
import OrdersActions from '../Redux/OrdersRedux'
import { showAlertMessage } from '../Util/Helper'

export function* getOrdersAttempt(api, action) {
    const { params } = action
    try {
        const response = yield call(api.getOrders, params)
        console.log("get orders response", response)
        if (response.ok) {
            yield put(OrdersActions.getOrdersSuccess(response.data))
        } else {
            const message = response.data.message || 'Something went wrong'
            yield put(OrdersActions.getOrdersFailure(message))
        }
    } catch (error) {
        yield put(OrdersActions.getOrdersFailure(error.message))
    }
}

export function* cancelOrderAttempt(api, action) {
    const { order_id } = action
    try {
        const response = yield call(api.cancelOrder, order_id)
        console.log("cancel orders response", response)
        if (response.ok) {
            showAlertMessage("Cancel order success", "success")
            yield put(OrdersActions.cancelOrderSuccess(response.data))
        } else {
            const message = response.data.message || 'Something went wrong'
            yield put(OrdersActions.cancelOrderFailure(message))
        }
    } catch (error) {
        yield put(OrdersActions.cancelOrderFailure(error.message))
    }
}

export function* postOrderAttempt(api, action) {
    const { data } = action
    console.log("post orders data", data)
    try {
        const response = yield call(api.postOrder, data)
        console.log("post orders response", response)
        if (response.ok) {
            showAlertMessage("Post order success", "success")
            yield put(OrdersActions.postOrderSuccess(response.data))
        } else {
            const message = response.data.message || 'Something went wrong'
            showAlertMessage(message, "danger")
            yield put(OrdersActions.postOrderFailure(message))
        }
    } catch (error) {
        yield put(OrdersActions.postOrderFailure(error.message))
    }
}