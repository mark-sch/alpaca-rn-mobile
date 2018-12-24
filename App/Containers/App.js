import React, { Component } from 'react'
import { Provider } from 'react-redux'
import MainScreen from './MainScreen'
import RegisterScreen from './User/RegisterScreen'
import createStore from '../Redux'

const store = createStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RegisterScreen />
      </Provider>
    )
  }
}

export default App
