import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import AssetsActions from '../../Redux/AssetsRedux'
import {
    ApplicationStyles,
    Colors,
    Fonts
} from '../../Themes'
import { convert } from '../../Util/Helper';

class SearchItem extends Component {

    render() {
        const { position, symbolStyle, onPress, bars } = this.props
        const plStyle = position.unrealized_intraday_pl > 0 ? styles.upText : styles.downText
        const percentValue = (position.unrealized_intraday_plpc * 100).toFixed(2)

        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={onPress}
            >
                <View style={styles.rowContainer}>
                    <View style={{ alignSelf: 'center' }}>
                        <Text style={[styles.h2, symbolStyle]}>
                            {position.symbol}
                        </Text>
                    </View>
                    <View style={styles.valueContainer}>
                        <Text style={styles.h3}>
                            {convert(position.unrealized_intraday_pl)}
                        </Text>
                        <Text style={plStyle}>
                            {convert(percentValue, true)}
                        </Text>
                    </View>
                    <View style={styles.separator} />
                </View>
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
        height: 50,
        marginBottom: 10,
    },
    valueContainer: {
        position: 'absolute',
        right: 0,
        top: 0,
    }
}

const mapStateToProps = (state) => {
    return {
        bars: state.assets.bars,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getBars: (timeframe, symbols) => dispatch(AssetsActions.getBarsAttempt(timeframe, symbols))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchItem)