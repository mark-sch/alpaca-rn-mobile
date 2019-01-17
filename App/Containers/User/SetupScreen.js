import React, { Component } from 'react'
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    AsyncStorage
} from 'react-native'
import { connect } from 'react-redux'
import RNPickerSelect from 'react-native-picker-select'

import AppActions from '../../Redux/AppRedux'
import {
    ApplicationStyles,
    Colors,
    Fonts
} from '../../Themes'
import Button from '../../Components/Button'

class SetupScreen extends Component {

    constructor(props) {
        super(props)

        this.inputRefs = {}
        this.state = {
            apiKey: '***REMOVED***',
            secretKey: '***REMOVED***',
            baseUrl: '',
            baseUrlItems: [
                {
                    label: 'https://api.alpaca.markets/',
                    value: 'https://api.alpaca.markets/',
                },
                {
                    label: 'https://paper-api.alpaca.markets/',
                    value: 'https://paper-api.alpaca.markets/',
                },
            ],
        }
    }

    async componentDidMount() {
        let apiKey = ''
        let secretKey = ''
        let baseUrl = ''
        try {
            apiKey = await AsyncStorage.getItem('apiKey')
            secretKey = await AsyncStorage.getItem('secretKey')
            baseUrl = await AsyncStorage.getItem('baseUrl')
            this.setState({
                apiKey,
                secretKey,
                baseUrl
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    getStarted = () => {
        const { apiKey, secretKey, baseUrl } = this.state

        var data = {
            apiKey,
            secretKey,
            baseUrl,
        }

        AsyncStorage.setItem('apiKey', apiKey)
        AsyncStorage.setItem('secretKey', secretKey)
        AsyncStorage.setItem('baseUrl', baseUrl)

        this.props.appStartAttempt(data)
        this.props.navigation.navigate('Tab')
    }

    render() {
        const { apiKey, secretKey, baseUrl, baseUrlItems } = this.state

        return (
            <View style={styles.mainContainer}>
                <View style={styles.rowContainer}>
                    <Text style={styles.label}>
                        APCA_API_KEY_ID
                    </Text>
                    <TextInput
                        style={styles.inputText}
                        onChangeText={(text) => this.setState({ apiKey: text })}
                        value={apiKey}
                        autoCorrect={false}
                        maxLength={100}
                    />
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.label}>
                        APCA_API_SECRET_KEY
                    </Text>
                    <TextInput
                        style={styles.inputText}
                        onChangeText={(text) => this.setState({ secretKey: text })}
                        value={secretKey}
                        autoCorrect={false}
                        maxLength={100}
                    />
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.label}>
                        BASE_URL
                    </Text>
                    <RNPickerSelect
                        placeholder={{
                            label: '',
                            value: null,
                            color: Colors.COLOR_GOLD,
                        }}
                        items={baseUrlItems}
                        onValueChange={(value) => {
                            this.setState({
                                baseUrl: value,
                            })
                        }}
                        style={{ ...pickerSelectStyles }}
                        value={baseUrl}
                        ref={(el) => {
                            this.inputRefs.picker = el
                        }}
                    />
                </View>
                <Button
                    style={styles.button}
                    label="Get Started"
                    color={Colors.COLOR_NAV_HEADER}
                    labelColor={Colors.WHITE}
                    height={50}
                    disabled={!apiKey || !secretKey || !baseUrl}
                    onPress={this.getStarted}
                />
            </View>
        )
    }
}

const styles = {
    ...ApplicationStyles.screen,
    rowContainer: {
        flexDirection: 'column',
        marginTop: 30
    },
    inputText: {
        width: null,
        height: 40,
        borderBottomColor: Colors.COLOR_GOLD,
        borderBottomWidth: 1,
        color: Colors.COLOR_GOLD
    },
    button: {
        marginTop: 50,
    },
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        width: null,
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: Colors.COLOR_GOLD,
        borderBottomWidth: 1,
        backgroundColor: 'white',
        color: Colors.COLOR_GOLD,
    },
    inputAndroid: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
    },
})

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = dispatch => ({
	appStartAttempt: data => dispatch(AppActions.appStartAttempt(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SetupScreen)
