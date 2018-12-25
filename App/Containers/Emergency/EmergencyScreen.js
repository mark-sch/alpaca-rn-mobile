import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
} from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'

import OrdersActions from '../../Redux/OrdersRedux'
import {
    ApplicationStyles,
    Images,
    Colors,
    Fonts
} from '../../Themes'
import Button from '../../Components/Button'

class EmergencyScreen extends Component {

    componentWillReceiveProps(nextProps) {
    }

    cancelOrders = () => {
        const {
            orders,
            cancelOrder,
        } = this.props

        orders.map(item => {
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
                time_in_force: "day",
                side: "buy"
            }
            postOrder(updatedItem)
        })
    }

    render() {
        const {
            orders,
            positions,
            suspendAPI,
            cancelingOrder,
            postingOrder
        } = this.props

        return (
            <View style={styles.container}>
                <View style={styles.statusbar}>
                    <Image source={Images.logo} style={styles.logo}></Image>
                </View>
                <View style={styles.mainContainer}>
                    <Text style={styles.label}>API Calls In Last Hour: 5,394</Text>
                    <Button
                        style={styles.button}
                        label="SUSPEND API"
						isLoading={false}
						// onPress={() => suspendAPI()}
					/>
                    <Text style={styles.label}>Open Positions: {positions.length}</Text>
                    <Button
                        style={styles.button}
                        label="LIQUIDATE ALL"
						isLoading={postingOrder}
						onPress={this.requestOrders}
					/>
                    <Text style={styles.label}>Pending Orders: {orders.length}</Text>
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
        cancelingOrder: state.orders.cancelingOrder,
        postingOrder: state.orders.postingOrder,
        orders: state.orders.orders,
        positions: state.positions.positions 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        cancelOrder: order_id => dispatch(OrdersActions.cancelOrderAttempt(order_id)),
        postOrder: data => dispatch(OrdersActions.postOrderAttempt(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmergencyScreen)
