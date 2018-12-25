import React, { Component } from 'react'
import {
    View,
    TextInput,
    FlatList
} from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'

import {
    ApplicationStyles,
    Images,
    Colors,
} from '../../Themes'
import SearchItem from './SearchItem'
import NavigationIcon from '../../Components/NavigationIcon'
import OrderItem from '../Order/OrderItem';
import PositionItem from '../Position/PositionItem';

class SearchScreen extends Component {

    state = {
        query: '',
        totalItems: [],
        filteredItems: []
    }

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
        let { orders, positions } = this.props

        orders = orders.map(item => {
            const updatedItem = {
                ...item,
                asset_id: item.id
            }
            return updatedItem
        })
        const totalItems = positions.concat(orders)
        this.setState({ totalItems })
    }

    filterItems = (query) => {
        const { totalItems } = this.state

        let filteredItems = _.map(totalItems, function(el) {
            if (query && el.symbol.includes(query)) return el
        })
        filteredItems = _.without(filteredItems, undefined)

        this.setState({
            query,
            filteredItems
        })
    }

    render() {
        const { query, filteredItems } = this.state

        return (
            <View style={styles.mainContainer}>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder='Symbol...'
                        onChangeText={(text) => this.filterItems(text)}
                        value={query}
                        maxLength={40}
                    />
                    <NavigationIcon
                        style={styles.navSearchIcon}
                        iconStyle={{ tintColor: Colors.COLOR_NAV_HEADER, marginRight: 0 }}
                        source={Images.search}
                    />
                </View>
                <FlatList
                    style={styles.list}
                    data={filteredItems}
                    keyExtractor={item => item.asset_id}
                    renderItem={({ item }) => {
                        return (
                            item.id ?
                                <OrderItem order={item} />
                            :
                                <PositionItem position={item} />
                        )
                    }}
                />
            </View>
        )
    }
}

const styles = {
    ...ApplicationStyles.screen,
    searchContainer: {
        flexDirection: 'row',
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderBottomColor: 'rgba(0, 0, 0, 0.5)',
        borderBottomWidth: 1,
    },
    navSearchIcon: {
        position: 'absolute',
        right: 0
    },
    list: {
        flex: 1,
        marginTop: 30
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.orders.orders,
        positions: state.positions.positions
    }
}

export default connect(mapStateToProps, null)(SearchScreen)
