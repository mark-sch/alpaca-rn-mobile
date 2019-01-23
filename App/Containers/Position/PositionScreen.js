import React, { Component } from 'react'
import { View, Text, Image, FlatList, StatusBar } from 'react-native'
import { connect } from 'react-redux'

import {
    ApplicationStyles,
    Images,
    Colors,
    Metrics,
    Fonts
} from '../../Themes'
import PositionItem from './PositionItem'
import NavigationIcon from '../../Components/NavigationIcon'

class PositionScreen extends Component {

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
        const { positions } = this.props

        return (
            <View style={styles.container}>
                <View style={styles.mainContainer}>
                    <Text style={styles.label}>Positions</Text>
                    <FlatList
                        style={styles.list}
                        data={positions}
                        keyExtractor={item => item.asset_id}
                        renderItem={({ item, index }) => {
                            return (
                                <PositionItem
                                    position={item}
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
        positions: state.positions.positions
    }
}

export default connect(mapStateToProps, null)(PositionScreen)
