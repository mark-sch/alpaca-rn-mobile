import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
} from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'

import OrdersActions from '../../Redux/OrdersRedux'
import AccountActions from '../../Redux/AccountRedux'
import {
    ApplicationStyles,
    Images,
    Colors,
    Fonts
} from '../../Themes'
import Button from '../../Components/Button'
import NavigationIcon from '../../Components/NavigationIcon'

class EmergencyScreen extends Component {

    static navigationOptions = (props) => {
        return {
            headerRight: (
                <NavigationIcon
                    onPress={() => props.navigation.navigate('Search')}
                    source={Images.search}
                />
            ),
        }
    }

    cancelOrders = () => {
        const {
            openOrders,
            cancelOrder,
        } = this.props

        openOrders.map(item => {
            cancelOrder(item.id)
        })
    }

    requestOrders = () => {
        const {
            positions,
            postOrder
        } = this.props

        positions.map(item => {
            const updatedItem = {
                ...item,
                type: "market",
                time_in_force: "gtc",
                side: "sell"
            }
            postOrder(updatedItem)
        })
    }

    render() {
        const {
            openOrders,
            positions,
            cancelingOrder,
            postingOrder,
            account
        } = this.props
        const suspendStatus = account.trade_suspended_by_user

        return (
            <View style={styles.container}>
                <View style={styles.statusbar}>
                    <Image source={Images.logo} style={styles.logo}></Image>
                </View>
                <View style={styles.mainContainer}>
                    <Text style={styles.label}>API Calls In Last Hour: 5,394</Text>
                    <Button
                        style={styles.button}
                        color={suspendStatus ? Colors.COLOR_GREEN : Colors.RED}
                        label={suspendStatus ? "RECOVER API" : "SUSPEND API"}
						onPress={() => this.props.navigation.navigate(suspendStatus ? 'RecoverAPI' : 'SuspendAPI')}
					/>
                    <Text style={styles.label}>Open Positions: {positions.length}</Text>
                    <Button
                        style={styles.button}
                        label="LIQUIDATE ALL"
						isLoading={postingOrder}
						onPress={this.requestOrders}
					/>
                    <Text style={styles.label}>Pending Orders: {openOrders.length}</Text>
                    <Button
                        style={styles.button}
                        label="CANCEL ALL"
						isLoading={cancelingOrder}
						onPress={this.cancelOrders}
					/>
                </View>
            </View>
        )
    }
}

const styles = {
    ...ApplicationStyles.screen,
    mainContainer: {
        flex: 1,
        padding: 75
    },
    label: {
        ...Fonts.style.h3,
        color: Colors.COLOR_GRAY,
        marginBottom: 8
    },
    button: {
        marginBottom: 25,
	},
}

const mapStateToProps = (state) => {
    return {
        account: state.account.account,
        cancelingOrder: state.orders.cancelingOrder,
        postingOrder: state.orders.postingOrder,
        fetching: state.account.fetching,
        orders: state.orders.orders,
        openOrders: state.orders.openOrders,
        positions: state.positions.positions
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        cancelOrder: order_id => dispatch(OrdersActions.cancelOrderAttempt(order_id)),
        postOrder: data => dispatch(OrdersActions.postOrderAttempt(data)),
        configureAccount: data => dispatch(AccountActions.configureAccountAttempt(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmergencyScreen)
