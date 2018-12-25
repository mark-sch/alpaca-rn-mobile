import { takeLatest } from 'redux-saga/effects'
import API from '../Services/Api'

/* ------------- Types ------------- */
import { AccountTypes } from '../Redux/AccountRedux'
import { OrdersTypes } from '../Redux/OrdersRedux'
import { PositionsTypes } from '../Redux/PositionsRedux'

/* ------------- Sagas ------------- */
import { getAccountAttempt } from './AccountSagas'
import {
    getOrdersAttempt,
    cancelOrderAttempt,
    postOrderAttempt
} from './OrdersSagas'
import { getPositionsAttempt } from './PositionsSagas'

/* ------------- API ------------- */
const api = API.create()

/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
    yield [
        takeLatest(AccountTypes.GET_ACCOUNT_ATTEMPT, getAccountAttempt, api),
        takeLatest(OrdersTypes.GET_ORDERS_ATTEMPT, getOrdersAttempt, api),
        takeLatest(OrdersTypes.CANCEL_ORDER_ATTEMPT, cancelOrderAttempt, api),
        takeLatest(OrdersTypes.POST_ORDER_ATTEMPT, postOrderAttempt, api),
        takeLatest(PositionsTypes.GET_POSITIONS_ATTEMPT, getPositionsAttempt, api),
    ]
}
