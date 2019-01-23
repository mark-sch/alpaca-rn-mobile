import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    FlatList
} from 'react-native'
import { connect } from 'react-redux'

import {
    ApplicationStyles,
    Images,
    Colors,
    Metrics,
    Fonts
} from '../../Themes'
import OrderItem from './OrderItem'
import NavigationIcon from '../../Components/NavigationIcon'

class OrdersScreen extends Component {

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

    render() {
        const { orders } = this.props

        return (
            <View style={styles.container}>
                <View style={styles.mainContainer}>
                    <Text style={styles.label}>Orders</Text>
                    <FlatList
                        style={styles.list}
                        data={orders}
                        keyExtractor={item => item.id}
                        renderItem={({ item, index }) => {
                            return (
                                <OrderItem
                                    order={item}
                                    onPress={() =>
                                        this.props.navigation.navigate('Symbol', {
                                            value: item
                                        })
                                    }
                                />
                            )
                        }}
                    />
                </View>
            </View>
        )
    }
}

const styles = {
    ...ApplicationStyles.screen,
    list: {
        flex: 1,
        marginTop: 40,
        paddingRight: 5
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.orders.orders,
    }
}

export default connect(mapStateToProps, null)(OrdersScreen)
