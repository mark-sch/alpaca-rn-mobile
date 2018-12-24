import React, { Component } from 'react'
import {
    View,
} from 'react-native'
import { connect } from 'react-redux'
import { WebView } from "react-native-webview"

import {
    ApplicationStyles,
} from '../../Themes'

class RegisterScreen extends Component {

    render() {

        return (
            <View style={styles.container}>
                <WebView
                    source={{ uri: "https://app.alpaca.markets/signup" }}
                    style={{ marginTop: 20 }}
                    onLoadProgress={e => console.log(e.nativeEvent.progress)}
                />
            </View>
        )
    }
}

const styles = {
    ...ApplicationStyles.screen,
}

const mapStateToProps = (state) => {
    return {
    }
}

export default connect(mapStateToProps, null)(RegisterScreen)
