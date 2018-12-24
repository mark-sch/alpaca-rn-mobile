import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'


const ApplicationStyles = {
    screen: {
        container: {
            flex: 1,
        },
        mainContainer: {
            flex: 1,
            padding: 30
        },
        statusbar: {
            height: Metrics.navBarHeight,
            backgroundColor: Colors.COLOR_NAV_HEADER,
            justifyContent: 'center',
            alignItems:'center',
            flexDirection:'row'
        },
        tabContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.WHITE,
        },
        tabBarStyle: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgb(250, 250, 250)',
        },
        tabStyle: {
            paddingBottom: 0
        },
        tabBarImage: {
            width: Metrics.images.medium,
            height: Metrics.images.medium,
        },
        emergencyTabBarImage: {
            width: 48,
            height: 48,
        },
        separator: {
            height: 0.5,
            backgroundColor: Colors.COLOR_GRAY,
            marginTop: 2,
            marginBottom: 2
        }
    }
}

export default ApplicationStyles
