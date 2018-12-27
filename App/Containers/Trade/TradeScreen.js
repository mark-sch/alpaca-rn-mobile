import React, { Component } from 'react'
import {
    View,
    Text
} from 'react-native'
import { connect } from 'react-redux'

import {
    ApplicationStyles,
    Images,
    Colors,
    Fonts
} from '../../Themes'
import OrdersActions from '../../Redux/OrdersRedux'
import { 
    convert,
    capitalize
} from '../../Util/Helper';
import NavigationIcon from '../../Components/NavigationIcon'
import Button from '../../Components/Button'
import OrderItem from '../Order/OrderItem';
import PositionItem from '../Position/PositionItem';
import SearchItem from './SearchItem';

class TradeScreen extends Component {

    state = {
        submitted: false,
    }

    static navigationOptions = (props) => {
        return {
            headerLeft: (
                <NavigationIcon
                    onPress={() => props.navigation.pop()}
                    source={Images.back}
                />
            ),
            headerRight: (
                <NavigationIcon
                    onPress={() => props.navigation.navigate('Search')}
                    source={Images.search}
                />
            ),
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.postingOrder && !nextProps.postingOrder) {
            this.setState({
                submitted: true,
            })
        }
    }

    requestOrder = (value) => {
        const {
            postOrder
        } = this.props

        const updatedValue = {
            ...value,
            type: "market",
            time_in_force: "day",
            side: "buy"
        }
        postOrder(updatedValue)
    }

    renderValueDetail = (value) => {
        const { postingOrder } = this.props
        const mainValue = `${value.qty}@${value.avg_entry_price}`
        const plStyle = value.unrealized_intraday_pl > 0 ? styles.upText : styles.downText
        const percentValue = (value.unrealized_intraday_plpc * 100).toFixed(2)

        return (
            <View style={styles.container}>
                <View style={styles.positionContain}>
                    <Text style={styles.label}>
                        Positions
                    </Text>
                    <View style={styles.rowContainer}>
                        <Text style={styles.h3}>
                            {mainValue}
                        </Text>
                        <Text style={plStyle}>
                            {convert(percentValue, true)}
                        </Text>
                    </View>
                </View>
                <Text style={styles.label}>
                    Orders
                </Text>
                {/* <OrderItem order={value} /> */}
                <Button
                    style={styles.button}
                    label="Trade"
                    color={Colors.COLOR_NAV_HEADER}
                    labelColor={Colors.BLACK}
                    height={50}
                    isLoading={postingOrder}
                    onPress={() => this.requestOrder(value)}
                />
            </View>
        )
    }

    renderResult = (orderResult) => {
        return (
            <View style={styles.container}>
                <View style={styles.rowContainer}>
                    <Text style={styles.label}>
                        Side
                    </Text>
                    <Text style={styles.value}>
                        {capitalize(orderResult.side)}
                    </Text>
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.label}>
                        Type
                    </Text>
                    <Text style={styles.value}>
                        {capitalize(orderResult.type)}
                    </Text>
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.label}>
                        Time in Force
                    </Text>
                    <Text style={styles.value}>
                        {capitalize(orderResult.time_in_force)}
                    </Text>
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.label}>
                        Limit Price
                    </Text>
                    <Text style={styles.value}>
                        {orderResult.limit_price ? orderResult.limit_price : '-'}
                    </Text>
                </View>
                <Text>
                    {JSON.stringify(orderResult, undefined, 4)}
                </Text>
                <Button
                    style={styles.button}
                    label="Submitted!"
                    color={Colors.COLOR_GRAY}
                    labelColor={Colors.WHITE}
                    height={50}
                />
            </View>
        )
    }

    render() {
        const { navigation, orderResult } = this.props
        const value = navigation.getParam('value');

        return (
            <View style={styles.mainContainer}>
                <SearchItem
                    position={value}
                    symbolStyle={styles.symbol}
                />
                {
                    this.state.submitted ? this.renderResult(orderResult) : this.renderValueDetail(value)
                }
            </View>
        )
    }
}

const styles = {
    ...ApplicationStyles.screen,
    container: {
        ...ApplicationStyles.screen.container,
        marginTop: 30
    },
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
        marginBottom: 25
    },
    value: {
        ...Fonts.style.h3,
        fontSize: 19,
        color: Colors.COLOR_GOLD
    }
}

const mapStateToProps = (state) => {
    return {
        postingOrder: state.orders.postingOrder,
        orderResult: state.orders.orderResult
    }
}

const mapDispatchToProps = (dispatch) => ({
    postOrder: data => dispatch(OrdersActions.postOrderAttempt(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TradeScreen)
