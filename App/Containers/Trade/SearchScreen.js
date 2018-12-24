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
import OrderItem from '../Order/OrderItem';

class SearchScreen extends Component {

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        const { orders } = this.props
        console.log('orders get:', orders)

        return (
            <View style={styles.container}>
                <View style={styles.mainContainer}>
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

export default connect(mapStateToProps, null)(SearchScreen)
