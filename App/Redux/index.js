import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
    /* ------------- Assemble The Reducers ------------- */
    const rootReducer = combineReducers({
        orders: require('./OrdersRedux').reducer,
        positions: require('./PositionsRedux').reducer,
        account: require('./AccountRedux').reducer,
        assets: require('./AssetsRedux').reducer
    })

    return configureStore(rootReducer, rootSaga)
}
