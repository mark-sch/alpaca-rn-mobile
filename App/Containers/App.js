import React, { Component } from 'react'
import { View } from 'react-native'
import { Provider } from 'react-redux'
import { createAppContainer } from "react-navigation";
import FlashMessage from "react-native-flash-message";

import AppNavigator from './AppNavigator'
import createStore from '../Redux'

const store = createStore()

const AppContainer = createAppContainer(AppNavigator);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <View style={{ flex: 1 }}>
                    <AppContainer />
                    <FlashMessage position="top" />
                </View>
            </Provider>
        )
    }
}

export default App
