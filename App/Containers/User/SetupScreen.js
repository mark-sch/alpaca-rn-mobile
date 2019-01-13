import React, { Component } from 'react'
import {
    View,
    Text,
    TextInput,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import RNPickerSelect from 'react-native-picker-select'

import AppActions from '../../Redux/AppRedux'
import {
    ApplicationStyles,
    Colors,
    Fonts
} from '../../Themes'
import Storage from '../../Util/Storage'
import Button from '../../Components/Button'

class SetupScreen extends Component {

    constructor(props) {
        super(props)

        this.inputRefs = {}
        this.state = {
            apiKey: 'PKNM5QAHH7ME43X53ETF',
            secretKey: 'Xt2qASUGkMegKBZ3dtAQbQIUHYuZE1NwvEycTCOt',
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

    componentDidMount() {
    }

    getStarted = () => {
        const { apiKey, secretKey, baseUrl } = this.state

        var data = {
            apiKey,
            secretKey,
            baseUrl,
        }

        Storage.save({
            key: 'KEYS',
            data: data,
            expires: null
        })

        Storage
            .load({key: 'KEYS', autoSync: false})
            .then((keys) => {
                let apiKeyArray = keys.apiKeyArray ? keys.apiKeyArray : []
                apiKeyArray.push(apiKey)
                Storage.save({
                    key: 'KEYS',
                    data: {
                        apiKeyArray
                    },
                    expires: null
                })
            })
            .catch(err => {
            })

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
