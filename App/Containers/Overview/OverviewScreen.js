import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    FlatList
} from 'react-native'
import { connect } from 'react-redux'

import AccountActions from '../../Redux/AccountRedux'
import OrdersActions from '../../Redux/OrdersRedux'
import PositionsActions from '../../Redux/PositionsRedux'
import AssetsActions from '../../Redux/AssetsRedux'
import {
    ApplicationStyles,
    Images,
    Colors,
    Metrics,
    Fonts
} from '../../Themes'
import {
    mergeArray,
    capitalize,
    convert
} from '../../Util/Helper';
import NavigationIcon from '../../Components/NavigationIcon'
import Loading from '../../Components/Loading'

class OverviewScreen extends Component {

    state = {
        positionUpCount: 0,
        positionUpSum: 0,
        positionDownSum: 0,
        positionDownCount: 0,
        mergeOrders: []
    }

    static navigationOptions = (props) => {
        return {
            headerLeft: null,
            headerRight: (
                <NavigationIcon
                    onPress={() => props.navigation.navigate('Search')}
                    source={Images.search}
                />
            ),
        }
    }

    componentDidMount() {
        this.getData()
        this.props.getAssets()
        this.timer = setInterval(() => this.getData(false), 60000)
    }

    async getData(showLoading = true) {
        const { getAccount, getOrders, getPositions } = this.props

        var start = new Date();
        start.setHours(0,0,0,0);

        var end = new Date();
        end.setHours(23,59,59,999);

        getAccount()
        getOrders(`?status=all&after=${start.toISOString()}&until=${end.toISOString()}`)
        getPositions(showLoading)
    }

    componentWillReceiveProps(nextProps) {
        const { orders, positions } = nextProps
        if (orders) {
            this.mergeOrders(orders)
        }

        if (positions) {
            this.filterPositions(positions)
        }
    }

    mergeOrders = (source) => {
        let mergeOrders = mergeArray(source)
        mergeOrders.push({ // to render last total row
            status: 'total',
            data: []
        })
        this.setState( { mergeOrders })
    }

    filterPositions = (source) => {
        let positionUpCount = 0
        let positionUpSum = 0
        let positionDownSum = 0
        let positionDownCount = 0

        source.forEach(function(el) {
            if (el.unrealized_intraday_pl > 0) {
                positionUpCount++;
                positionUpSum += parseFloat(el.unrealized_intraday_pl)
            } else {
                positionDownCount++;
                positionDownSum += parseFloat(el.unrealized_intraday_pl)
            }
        })

        this.setState({
            positionUpCount,
            positionUpSum,
            positionDownCount,
            positionDownSum
        })
    }

    renderEmptyOrder() {
        return (
            <View>
                <View style={styles.ordersRow}>
                    <Text style={[styles.h3, { color: Colors.COLOR_GREEN }]}>
                        Filled
                    </Text>
                    <Text style={styles.h3}>
                        0
                    </Text>
                </View>
                <View style={styles.ordersRow}>
                    <Text style={[styles.h3, { color: Colors.COLOR_DARK_RED }]}>
                        Cancelled
                    </Text>
                    <Text style={styles.h3}>
                        0
                    </Text>
                </View>
                <View style={styles.ordersRow}>
                    <Text style={[styles.h3, { color: Colors.COLOR_GOLD }]}>
                        Pending
                    </Text>
                    <Text style={styles.h3}>
                        0
                    </Text>
                </View>
            </View>
        )
    }

    render() {
        const {
            account,
            fetching,
            orders
        } = this.props
        const {
            positionUpCount,
            positionUpSum,
            positionDownSum,
            positionDownCount,
            mergeOrders
        } = this.state
        const positionSum = (positionUpSum + positionDownSum).toFixed(2)
        const positionSumStyle = positionSum > 0 ? styles.upText : styles.downText
        const portfolioSumColor = positionSum > 0 ? Colors.COLOR_GREEN: Colors.COLOR_DARK_RED

        return (
            <View style={styles.container}>
                <View style={styles.statusbar}>
                    <Image source={Images.logo} style={styles.logo} />
                </View>
                <View style={styles.mainContainer}>
                    <Text style={styles.label}>
                        Portfolio Value
                    </Text>
                    <Text style={styles.h1}>
                        ${account && account.portfolio_value && parseFloat(account.portfolio_value).toLocaleString()}
                    </Text>
                    <Text style={[styles.h3, { color: portfolioSumColor }]}>
                        {convert(positionSum)}
                    </Text>

                    <Text style={[styles.label, { marginTop: 8 }]}>
                        Buying Power
                    </Text>
                    <Text style={styles.h2}>
                        ${account && account.buying_power && parseFloat(account.buying_power).toLocaleString()}
                    </Text>

                    <View style={styles.section}>
                        <Text style={styles.label}>
                            Positions
                        </Text>
                        <View style={styles.positionsRow}>
                            <Text style={styles.upText}>
                                Up
                            </Text>
                            <Text style={[styles.upText, { textAlign: 'center' }]}>
                                {positionUpCount}
                            </Text>
                            <Text style={[styles.upText, { textAlign: 'right' }]}>
                                {convert(positionUpSum.toFixed(2))}
                            </Text>
                        </View>
                        <View style={styles.positionsRow}>
                            <Text style={styles.downText}>
                                Down
                            </Text>
                            <Text style={[styles.downText, { textAlign: 'center' }]}>
                                {positionDownCount}
                            </Text>
                            <Text style={[styles.downText, { textAlign: 'right' }]}>
                                {convert(positionDownSum.toFixed(2))}
                            </Text>
                        </View>
                        <View style={styles.separator} />
                        <View style={styles.positionsRow}>
                            <Text style={styles.upText}></Text>
                            <Text style={[styles.h3, { textAlign: 'center' }]}>
                                {positionUpCount + positionDownCount}
                            </Text>
                            <Text style={[positionSumStyle, { textAlign: 'right' }]}>
                                {convert(positionSum)}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.label}>
                            Orders Today
                        </Text>
                        {mergeOrders && mergeOrders.length > 1 ?
                            <FlatList
                                style={styles.list}
                                data={mergeOrders}
                                keyExtractor={item => item.status}
                                renderItem={({ item, index }) => {
                                    if (mergeOrders.length - 1 === index) {
                                        return (
                                            <View>
                                                <View style={styles.separator} />
                                                <Text style={[styles.h3, { alignSelf: 'flex-end' }]}>
                                                    {orders.length}
                                                </Text>
                                            </View>
                                        )
                                    } else {
                                        return (
                                            <View style={styles.ordersRow}>
                                                <Text style={styles.h3}>
                                                    {capitalize(item.status)}
                                                </Text>
                                                <Text style={styles.h3}>
                                                    {item.data.length}
                                                </Text>
                                            </View>
                                        )
                                    }
                                }}
                            /> :
                            this.renderEmptyOrder()
                        }
                    </View>
                </View>
                {fetching && <Loading />}
            </View>
        )
    }
}

const styles = {
    ...ApplicationStyles.screen,
    h1: {
        ...Fonts.style.h1,
        color: Colors.COLOR_CORE_TEXT
    },
    h2: {
        ...Fonts.style.h2,
        color: Colors.COLOR_CORE_TEXT
    },
    h3: {
        ...Fonts.style.h3,
        color: Colors.COLOR_CORE_TEXT
    },
    section: {
        marginTop: 40,
    },
    upText: {
        ...Fonts.style.h3,
        color: Colors.COLOR_GREEN,
        flex: 1,
    },
    downText: {
        ...Fonts.style.h3,
        color: Colors.COLOR_DARK_RED,
        flex: 1,
    },
    positionsRow: {
        marginLeft: Metrics.baseMargin,
        flexDirection: 'row',
    },
    ordersRow: {
        marginLeft: Metrics.baseMargin,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    list: {
        height: 125
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.account.account,
        orders: state.orders.orders,
        positions: state.positions.positions,
        fetching: state.assets.fetching
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAccount: () => dispatch(AccountActions.getAccountAttempt()),
        getOrders: (params) => dispatch(OrdersActions.getOrdersAttempt(params)),
        getPositions: (showLoading) => dispatch(PositionsActions.getPositionsAttempt(showLoading)),
        getAssets: () => dispatch(AssetsActions.getAssetsAttempt()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OverviewScreen)
