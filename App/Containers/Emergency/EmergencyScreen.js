import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
} from 'react-native'
import { connect } from 'react-redux'

import {
    ApplicationStyles,
    Images,
    Colors,
    Metrics,
    Fonts
} from '../../Themes'
import Button from '../../Components/Button'

class EmergencyScreen extends Component {

    componentDidMount() {
        console.log('emergency did mount')
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        const {
            orders,
            positions,
            suspendAPI
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
						isLoading={false}
						// onPress={() => suspendAPI()}
					/>
                    <Text style={styles.label}>Pending Orders: {orders.length}</Text>
                    <Button
                        style={styles.button}
                        label="CANCEL ALL"
						isLoading={false}
						// onPress={() => suspendAPI()}
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
    logo: {
        height: Metrics.images.titleLogo,
        width: Metrics.images.titleLogo,
        resizeMode: 'contain',
        marginRight: Metrics.baseMargin
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
        orders: state.orders.orders,
        positions: state.positions.positions 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmergencyScreen)
