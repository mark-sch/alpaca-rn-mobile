import React, { Component } from 'react'
import {
    View,
    Text,
    FlatList
} from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'

import {
    ApplicationStyles,
    Images,
    Colors,
    Fonts
} from '../../Themes'
import AssetsActions from '../../Redux/AssetsRedux'
import { 
    convert,
    formatValue,
    getTodayStart,
    getTodayEnd
} from '../../Util/Helper';
import NavigationIcon from '../../Components/NavigationIcon'
import Button from '../../Components/Button'
import OrderItem from '../Order/OrderItem';
import SearchItem from './SearchItem';

class SymbolScreen extends Component {

    static navigationOptions = (props) => {
        return {
            headerLeft: (
                <NavigationIcon
                    onPress={() => props.navigation.pop()}
                    source={Images.back}
                />
            ),
        }
    }

    componentDidMount() {
        const { navigation, getBars } = this.props
        const value = navigation.getParam('value')
        this.timer = setInterval(() => this.getData(value, getBars), 5000)
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    async getData(value, getBars) {
        getBars('1Min', value.symbol, getTodayStart(), getTodayEnd(), 'today')
    }

    renderValueDetail = (value) => {
        const { positions, orders } = this.props
        let mainValue, percentValue
        let plStyle

        positions.map(position => {
            if (position.symbol === value.symbol) {
                mainValue = `${position.qty}@${formatValue(position.avg_entry_price)}`
                plStyle = position.unrealized_intraday_pl > 0 ? styles.upText : styles.downText
                percentValue = (position.unrealized_intraday_plpc * 100).toFixed(2)
            }
        })

        let filteredOrders = _.map(orders, function(el) {
            if (el.symbol === value.symbol) return el
        })
        filteredOrders = _.without(filteredOrders, undefined)

        return (
            <View style={styles.container}>
                <View style={styles.positionContain}>
                    <Text style={styles.label}>
                        Positions
                    </Text>
                    {mainValue && (
                        <View style={styles.rowContainer}>
                            <Text style={styles.h3}>
                                {mainValue}
                            </Text>
                            <Text style={plStyle}>
                                {convert(percentValue, true)}
                            </Text>
                        </View>
                    )}
                </View>
                <Text style={styles.label}>
                    Orders
                </Text>
                {filteredOrders && (
                    <FlatList
                        style={styles.list}
                        data={filteredOrders}
                        keyExtractor={item => item.id}
                        renderItem={({ item, index }) => {
                            return (
                                <OrderItem order={item} />
                            )
                        }}
                    />
                )}
                <Button
                    style={styles.button}
                    label="Trade"
                    color={Colors.COLOR_NAV_HEADER}
                    labelColor={Colors.BLACK}
                    height={50}
                    onPress={() =>
                        this.props.navigation.navigate('Trade', {
                            value
                        })
                    }
                />
            </View>
        )
    }

    render() {
        const { navigation } = this.props
        const value = navigation.getParam('value')

        return (
            <View style={styles.mainContainer}>
                <SearchItem
                    item={value}
                    symbolStyle={styles.symbol}
                />
                {this.renderValueDetail(value)}
            </View>
        )
    }
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
    symbol: {
        ...Fonts.style.h1,
        color: Colors.BLACK
    },
    positionContain: {
        marginTop: 40,
        marginBottom: 35
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 5
    },
    button: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    list: {
        flex: 1,
        marginTop: 10,
    }
}

const mapStateToProps = (state) => ({
    bars: state.assets.bars,
    preBars: state.assets.preBars,
    positions: state.positions.positions,
    orders: state.orders.orders,
})

const mapDispatchToProps = (dispatch) => ({
    getBars: (timeframe, symbols, start, end, day) => dispatch(AssetsActions.getBarsAttempt(timeframe, symbols, start, end, day)),
    resetBars: () => dispatch(AssetsActions.resetBars()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SymbolScreen)
