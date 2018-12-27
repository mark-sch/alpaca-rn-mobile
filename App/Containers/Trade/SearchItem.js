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
import { convert } from '../../Util/Helper';

class SearchItem extends Component {

    render() {
        const { position, symbolStyle, onPress } = this.props
        const plStyle = position.unrealized_intraday_pl > 0 ? styles.upText : styles.downText
        const percentValue = (position.unrealized_intraday_plpc * 100).toFixed(2)

        return (
            <TouchableOpacity
                activeOpacity={0.9}
                style={styles.rowContainer}
                onPress={onPress}
            >
                <View style={{ alignSelf: 'center' }}>
                    <Text style={[styles.h2, symbolStyle]}>
                        {position.symbol}
                    </Text>
                </View>
                <View style={styles.valueContainer}>
                    <Text style={styles.h3}>
                        ${position.unrealized_intraday_pl}
                    </Text>
                    <Text style={plStyle}>
                        {convert(percentValue, true)}
                    </Text>
                </View>
                <View style={styles.separator} />
            </TouchableOpacity>
        )
    }
}

SearchItem.propTypes = {
    position: PropTypes.object.isRequired,
    symbolStyle: PropTypes.object,
    onPress: PropTypes.func
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
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    valueContainer: {
        alignItems: 'flex-end',
        backgroundColor: 'pink'
    }
}

export default SearchItem