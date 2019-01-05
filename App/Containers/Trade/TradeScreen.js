import React, { Component } from 'react'
import {
    View,
    Text,
    TextInput,
    ScrollView
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
import SearchItem from './SearchItem';
import TradeItem from './TradeItem';

class TradeScreen extends Component {

    state = {
        submitted: false,
        sideItems: [
            {
                label: 'Buy',
                value: 'buy',
            },
            {
                label: 'Sell',
                value: 'sell',
            },
        ],
        typeItems: [
            {
                label: 'Market',
                value: 'market',
            },
            {
                label: 'Limit',
                value: 'limit',
            },
            {
                label: 'Stop',
                value: 'stop',
            },
            {
                label: 'Stop limit',
                value: 'stop_limit',
            },
        ],
        timeInForceItems: [
            {
                label: 'Day',
                value: 'day',
            },
            {
                label: 'Gtc',
                value: 'gtc',
            },
            {
                label: 'Opg',
                value: 'opg',
            },
        ]
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
        const { postOrder } = this.props
        const { shares, limitPrice, stopPrice, side, type, timeInForce } = this.state

        const orderData = {
            symbol: value.symbol,
            qty: shares,
            type,
            time_in_force: timeInForce,
            side,
            limit_price: limitPrice,
            stop_price: stopPrice
        }
        console.log('updated value:', orderData)
        postOrder(orderData)
    }

    renderBody = (value) => {
        const { orderResult, postingOrder } = this.props
        const {
            type, side, timeInForce,
            shares, limitPrice, stopPrice,
            sideItems, typeItems, timeInForceItems
        } = this.state

        let disabledSubmitBtn = !type
        if (type === 'market') {
            disabledSubmitBtn = !side || !timeInForce || !shares
        } else if (type === 'limit') {
            disabledSubmitBtn = !side || !timeInForce || !shares || !limitPrice
        } else if (type === 'stop') {
            disabledSubmitBtn = !side || !timeInForce || !shares || !stopPrice
        } else if (type === 'stop_limit') {
            disabledSubmitBtn = !side || !timeInForce || !shares || !stopPrice || !limitPrice
        }

        return (
            <View style={styles.container}>
                <TradeItem
                    label='Side'
                    items={sideItems}
                    onValueChange={value => this.setState({ side: value })}
                />
                <View style={styles.rowContainer}>
                    <Text style={styles.label}>
                        Shares
                    </Text>
                    <TextInput
                        style={styles.inputText}
                        onChangeText={(text) => this.setState({ shares: text })}
                        value={shares}
                        maxLength={20}
                    />
                </View>
                <TradeItem
                    label='Type'
                    items={typeItems}
                    onValueChange={value => this.setState({ type: value })}
                />
                <TradeItem
                    label='Time in Force'
                    items={timeInForceItems}
                    onValueChange={value => this.setState({ timeInForce: value })}
                />
                <View style={styles.rowContainer}>
                    <Text style={styles.label}>
                        Limit Price
                    </Text>
                    <TextInput
                        style={styles.inputText}
                        onChangeText={(text) => this.setState({ limitPrice: text })}
                        value={limitPrice}
                        maxLength={20}
                    />
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.label}>
                        Stop Price
                    </Text>
                    <TextInput
                        style={styles.inputText}
                        onChangeText={(text) => this.setState({ stopPrice: text })}
                        value={stopPrice}
                        maxLength={20}
                    />
                </View>
                {this.state.submitted && (
                    <ScrollView style={styles.jsonData}>
                        <Text>
                            {JSON.stringify(orderResult, undefined, 4)}
                        </Text>
                    </ScrollView>
                )}
                {this.state.submitted ?
                    <Button
                        style={styles.button}
                        label="Submitted!"
                        color={Colors.COLOR_GRAY}
                        labelColor={Colors.WHITE}
                        height={50}
                    /> :
                    <Button
                        style={styles.button}
                        label="Submit"
                        color={Colors.COLOR_NAV_HEADER}
                        labelColor={Colors.BLACK}
                        height={50}
                        isLoading={postingOrder}
                        disabled={disabledSubmitBtn}
                        onPress={() => this.requestOrder(value)}
                    />
                }
            </View>
        )
    }

    render() {
        const { navigation, bars, preBars } = this.props
        const value = navigation.getParam('value')

        return (
            <View style={styles.mainContainer}>
                <SearchItem
                    bars={bars}
                    preBars={preBars}
                    item={value}
                    symbolStyle={styles.symbol}
                />
                {this.renderBody(value)}
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
    symbol: {
        ...Fonts.style.h1,
        color: Colors.BLACK
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
    value: {
        ...Fonts.style.h3,
        fontSize: 19,
        color: Colors.COLOR_GOLD
    },
    jsonData: {
        flex: 1,
        marginTop: 10,
        marginBottom: 60,
        paddingLeft: 5,
        backgroundColor: 'rgb(207, 207, 207)'
    },
    inputText: {
        width: 130,
        height: 40,
        borderBottomColor: Colors.COLOR_GOLD,
        borderBottomWidth: 1,
        color: Colors.COLOR_GOLD
    },
}

const mapStateToProps = (state) => {
    return {
        postingOrder: state.orders.postingOrder,
        orderResult: state.orders.orderResult,
        bars: state.assets.bars,
        preBars: state.assets.preBars,
    }
}

const mapDispatchToProps = (dispatch) => ({
    postOrder: data => dispatch(OrdersActions.postOrderAttempt(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TradeScreen)
