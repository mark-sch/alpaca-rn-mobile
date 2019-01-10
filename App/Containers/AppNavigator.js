import { createStackNavigator } from 'react-navigation';

import MainScreen from './MainScreen'
import SetupScreen from './User/SetupScreen'
import RegisterScreen from './User/RegisterScreen'
import SearchScreen from './Trade/SearchScreen'
import SymbolScreen from './Trade/SymbolScreen'
import TradeScreen from './Trade/TradeScreen'
import { Colors } from '../Themes';

const AppNavigator = createStackNavigator(
    {
        Main: MainScreen,
        Setup: SetupScreen,
        Register: RegisterScreen,
        Search: SearchScreen,
        Symbol: SymbolScreen,
        Trade: TradeScreen
    },
    {
        initialRouteName: "Setup",
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Colors.COLOR_NAV_HEADER,
            },
        },
    }
);

export default AppNavigator;