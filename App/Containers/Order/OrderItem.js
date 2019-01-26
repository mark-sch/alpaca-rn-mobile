import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'

import {
    ApplicationStyles,
    Colors,
    Fonts
} from '../../Themes'
import {
    capitalize,
    changeTimeFormat
} from '../../Util/Helper'

class OrderItem extends Component {

    render() {
        const { order, onPress } = this.props
        const mainValue = `${order.qty} (${order.filled_qty} filled) | ${capitalize(order.type)} ${capitalize(order.side)} ${capitalize(order.time_in_force)}`
        const timeValue = capitalize(order.status) + ': ' + changeTimeFormat(order.submitted_at)

        return (
            <TouchableOpacity
                style={{ marginBottom: 10 }}
                activeOpacity={0.9}
                onPress={onPress}
            >
                <View style={styles.rowContainer}>
                    <Text style={[styles.actionLabel, { backgroundColor: order.tag === 'open' ? Colors.COLOR_LIGHT_YELLOW : 'transparent' }]}>
                        {order.tag}
                    </Text>
                    <Text style={styles.h3}>
                        {timeValue}
                    </Text>
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.h2}>
                        {order.symbol}
                    </Text>
                    <Text style={styles.h3}>
                        {mainValue}
                    </Text>
                </View>
                <View style={styles.separator} />
            </TouchableOpacity>
        )
    }
}

OrderItem.propTypes = {
    order: PropTypes.object.isRequired,
}

const styles = {
    ...ApplicationStyles.screen,
    h2: {
        ...Fonts.style.h2,
        color: Colors.BLACK
    },
    h3: {
        ...Fonts.style.h3,
        fontSize: 14,
        color: Colors.BLACK
    },
    actionLabel: {
        ...Fonts.style.h3,
        color: Colors.BLACK,
        backgroundColor: Colors.COLOR_LIGHT_YELLOW,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 7,
        overflow: 'hidden',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
}

export default OrderItem