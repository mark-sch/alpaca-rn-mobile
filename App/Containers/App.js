import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createAppContainer } from "react-navigation";

import AppNavigator from './AppNavigator'
import createStore from '../Redux'

const store = createStore()

const AppContainer = createAppContainer(AppNavigator);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        )
    }
}

export default App
