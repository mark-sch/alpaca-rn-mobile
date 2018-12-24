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
import OrderItem from './OrderItem';

class OrdersScreen extends Component {

    componentDidMount() {
        console.log('orders did mount')
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        const { orders } = this.props
        console.log('orders get:', orders)

        return (
            <View style={styles.container}>
                <View style={styles.statusbar}>
                    <Image source={Images.logo} style={styles.logo}></Image>
                </View>
                <View style={styles.mainContainer}>
                    <Text style={styles.label}>Orders</Text>
                    <FlatList
                        style={styles.list}
                        data={orders}
                        keyExtractor={item => item.id}
                        renderItem={({ item, index }) => {
                            return (
                                <OrderItem order={item} />
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
    logo: {
        height: Metrics.images.titleLogo,
        width: Metrics.images.titleLogo,
        resizeMode: 'contain',
        marginRight: Metrics.baseMargin
    },
    label: {
        ...Fonts.style.h3,
        color: Colors.COLOR_GRAY
    },
    list: {
        flex: 1,
        marginTop: 40
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.orders.orders,
    }
}

export default connect(mapStateToProps, null)(OrdersScreen)
