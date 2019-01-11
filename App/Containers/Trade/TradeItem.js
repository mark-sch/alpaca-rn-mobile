import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'
import RNPickerSelect from 'react-native-picker-select'

import {
    ApplicationStyles,
    Colors,
    Fonts
} from '../../Themes'

class TradeItem extends Component {

    constructor(props) {
        super(props)

        this.inputRefs = {}
        this.state = {
            selectedValue: '',
        }
    }

    render() {
        const { label, items, disabled, onValueChange } = this.props
        return (
            <View style={styles.rowContainer}>
                <Text style={styles.label}>
                    {label}
                </Text>
                <RNPickerSelect
                    placeholder={{
                        label: '',
                        value: null,
                        color: Colors.COLOR_GOLD,
                    }}
                    disabled={disabled}
                    items={items}
                    onValueChange={(value) => {
                        this.setState({
                            selectedValue: value,
                        })
                        onValueChange(value)
                    }}
                    style={{ ...pickerSelectStyles }}
                    value={this.state.selectedValue}
                    ref={(el) => {
                        this.inputRefs.picker = el
                    }}
                />
            </View>
        )
    }
}

TradeItem.propTypes = {
    items: PropTypes.array.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    onValueChange: PropTypes.func
}

const styles = {
    ...ApplicationStyles.screen,
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 5
    },
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        width: 130,
        fontSize: 16,
        paddingTop: 10,
        // paddingHorizontal: 10,
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
});

export default TradeItem