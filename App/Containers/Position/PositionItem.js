import React, { Component } from 'react'
import {
    View,
    Text
} from 'react-native'
import PropTypes from 'prop-types'

import {
    ApplicationStyles,
    Colors,
    Fonts
} from '../../Themes'

class PositionItem extends Component {

    render() {
        const { position } = this.props
        // console.log('position item:', position)
        const mainValue = `${position.qty}@${position.avg_entry_price}`
        const plStyle = position.unrealized_intraday_pl > 0 ? styles.upText : styles.downText
        const percentValue = (position.unrealized_intraday_plpc * 100).toFixed(2)

        return (
            <View style={{ marginBottom: 10 }}>
                <View style={styles.rowContainer}>
                    <Text style={styles.h2}>
                        {position.symbol}
                    </Text>
                    <Text style={plStyle}>
                        ${position.unrealized_intraday_pl}
                    </Text>
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.h3}>
                        {mainValue}
                    </Text>
                    <Text style={plStyle}>
                        {percentValue}%
                    </Text>
                </View>
                <View style={styles.separator} />
            </View>
        )
    }
}

PositionItem.propTypes = {
    position: PropTypes.object.isRequired,
}

const styles = {
    ...ApplicationStyles.screen,
    h2: {
        ...Fonts.style.h2,
        color: Colors.BLACK
    },
    h3: {
        ...Fonts.style.h3,
        color: Colors.BLACK
    },
    upText: {
        ...Fonts.style.h3,
        color: Colors.COLOR_GREEN,
    },
    downText: {
        ...Fonts.style.h3,
        color: Colors.COLOR_DARK_RED,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
}

export default PositionItem