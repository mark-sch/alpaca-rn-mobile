import React, { Component } from 'react'
import {
    View,
    Text,
    ScrollView
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
import NavigationIcon from '../../Components/NavigationIcon'

class LiquidationScreen extends Component {

    state = {
        condition: 'LIQUIDATION'
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.postingOrder && !nextProps.postingOrder && nextProps.orderResult) {
            this.setState({ condition: 'LIQUIDATION_SUCCESS' })
            this.props.navigation.setParams({ condition: 'LIQUIDATION_SUCCESS' })
        }
    }

    static navigationOptions = (props) => {
        const condition = props.navigation.getParam('condition')
        return {
            headerLeft: condition === 'LIQUIDATION_SUCCESS' ?
            null :
            (
                <NavigationIcon
                    onPress={() => props.navigation.pop()}
                    source={Images.back}
                />
            )
        }
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

    getPositionsArray = () => {
        const { positions } = this.props
        let symbols = ''
        positions.map(item => {
            let div = symbols.length > 0 ? ', ' : ''
            symbols = symbols + div + item.symbol
        })

        return symbols
    }

    renderContent = () => {
        const { condition } = this.state
        const { positions, postingOrder, orderResult } = this.props

        let content
        if (condition === 'LIQUIDATION') {
            content = (
                <View style={styles.container}>
                    <Text style={styles.h1}>
                        Liquidating{"\n"}
                        All Positions
                    </Text>
                    <Text style={[styles.h3, { marginTop: 20 }]}>
                        You are placing an order to sell all your positions with market order.{"\n\n"}
                        You currently have {positions.length} total positions in {this.getPositionsArray()}.
                    </Text>
                    <Button
                        style={styles.button}
                        label="Click to Submit"
                        color={Colors.COLOR_NAV_HEADER}
                        labelColor={Colors.BLACK}
                        height={50}
                        isLoading={postingOrder}
                        onPress={this.requestOrders}
                    />
                </View>
            )
        } else if (condition === 'LIQUIDATION_SUCCESS') {
            content = (
                <View style={styles.container}>
                    <Text style={styles.label}>
                        Order Submitted
                    </Text>
                    <ScrollView style={styles.jsonData}>
                        <Text style={{ color: 'white' }}>
                            {JSON.stringify(orderResult, undefined, 4)}
                        </Text>
                    </ScrollView>
                    <Button
                        style={styles.button}
                        label="Done"
                        color={Colors.COLOR_NAV_HEADER}
                        labelColor={Colors.BLACK}
                        height={50}
                        onPress={() => this.props.navigation.pop()}
                    />
                </View>
            )
        }

        return content
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                {this.renderContent()}
            </View>
        )
    }
}

const styles = {
    ...ApplicationStyles.screen,
    h1: {
        ...Fonts.style.h1,
        color: Colors.BLACK,
    },
    h3: {
        ...Fonts.style.h3,
        color: Colors.BLACK,
    },
    button: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    jsonData: {
        flex: 1,
        marginTop: 20,
        marginBottom: 70,
        paddingLeft: 5,
        backgroundColor: Colors.COLOR_CORE_TEXT
    },
}

const mapStateToProps = (state) => {
    return {
        postingOrder: state.orders.postingOrder,
        positions: state.positions.positions,
        orderResult: state.orders.orderResult,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        postOrder: data => dispatch(OrdersActions.postOrderAttempt(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LiquidationScreen)