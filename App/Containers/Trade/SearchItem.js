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
        const { item, symbolStyle, onPress, bars, preBars } = this.props
        let currentStockPrice = 0, preClosePrice = 0
        let priceDif = 0, percentage = 0
        let plStyle = styles.upText
        try {
            if (bars && preBars) {
                currentStockPrice = bars[item.symbol][0].o
                preClosePrice = preBars[item.symbol][0].c
                priceDif = preClosePrice - currentStockPrice
                percentage = convert((priceDif/preClosePrice*100).toFixed(2), true)
                plStyle = priceDif > 0 ? styles.upText : styles.downText
            }

            return (
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={onPress}
                >
                    <View style={styles.rowContainer}>
                        <View style={{ alignSelf: 'center' }}>
                            <Text style={[styles.h2, symbolStyle]}>
                                {item.symbol}
                            </Text>
                        </View>
                        <View style={styles.valueContainer}>
                            <Text style={styles.h3}>
                                {convert(currentStockPrice.toFixed(2))}
                            </Text>
                            <Text style={plStyle}>
                                {`${convert(priceDif.toFixed(2))} (${percentage})`}
                            </Text>
                        </View>
                        <View style={styles.separator} />
                    </View>
                </TouchableOpacity>
            )
        } catch(e) {
            return null
        }
    }
}

SearchItem.propTypes = {
    item: PropTypes.object.isRequired,
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

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => {
    return {
        getBars: (timeframe, symbols, day) => dispatch(AssetsActions.getBarsAttempt(timeframe, symbols, day)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchItem)