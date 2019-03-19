import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import Home from './screens/Home';
import History from './screens/History';
import Settings from './screens/Settings';

const AppNavigator = createMaterialTopTabNavigator({
  Home,
  History,
  Settings

}, {
  initialRouteName: "Home",
  swipeEnabled: true,
  tabBarOptions: {
    activeTintColor: '#cccccc',
    inactiveTintColor: '#999999',
    style: {
        backgroundColor: '#333333',
    },
    indicatorStyle: {
        backgroundColor: '#333333',
    },
}
  });


export default createAppContainer(AppNavigator);