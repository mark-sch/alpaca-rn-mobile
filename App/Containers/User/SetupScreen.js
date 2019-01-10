import React, { Component } from 'react'
import {
    View,
    Text,
    TextInput,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import RNPickerSelect from 'react-native-picker-select'

import {
    ApplicationStyles,
    Colors,
    Fonts
} from '../../Themes'

class SetupScreen extends Component {

    constructor(props) {
        super(props)

        this.inputRefs = {}
        this.state = {
            apiKey: '',
            secretKey: '',
            selectedValue: '',
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

    render() {
        const { apiKey, secretKey, baseUrlItems } = this.state

        return (
            <View style={styles.container}>
                <View style={styles.rowContainer}>
                    <Text style={styles.label}>
                        APCA_API_KEY_ID
                    </Text>
                    <TextInput
                        style={styles.inputText}
                        onChangeText={(text) => this.setState({ apiKey: text })}
                        value={apiKey}
                        autoCorrect={false}
                        maxLength={20}
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
                        maxLength={20}
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
                                selectedValue: value,
                            })
                        }}
                        style={{ ...pickerSelectStyles }}
                        value={this.state.selectedValue}
                        ref={(el) => {
                            this.inputRefs.picker = el
                        }}
                    />
                </View>
            </View>
        )
    }
}

const styles = {
    ...ApplicationStyles.screen,
    rowContainer: {
        flexDirection: 'column',
        marginTop: 20
    },
    inputText: {
        width: 280,
        height: 40,
        borderBottomColor: Colors.COLOR_GOLD,
        borderBottomWidth: 1,
        color: Colors.COLOR_GOLD
    },
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        width: 280,
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

const mapStateToProps = (state) => {
    return {
    }
}

export default connect(mapStateToProps, null)(SetupScreen)
