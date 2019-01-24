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

    filterItems = (query) => {
        const { assets } = this.props

        let filteredItems = _.map(assets, function(el) {
            if (query && el.symbol.toLowerCase().startsWith(query.toLowerCase())) return el
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
                        ref={ref => this.queryTextInput = ref}
                        style={styles.searchInput}
                        placeholder='Symbol...'
                        autoFocus
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
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <SearchItem
                                item={item}
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
        marginTop: 30,
        paddingRight: 10
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.orders.orders,
        positions: state.positions.positions,
        assets: state.assets.assets
    }
}

export default connect(mapStateToProps, null)(SearchScreen)
