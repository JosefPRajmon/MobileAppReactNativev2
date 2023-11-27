import { Colors, Metrics } from '../themes';

export const GlobalNavigationOptions: any = {
  headerStyle: {
    backgroundColor: Colors.navHeader.backgroundColor
  },
  title: '',
  headerTintColor: Colors.navHeader.activeTintColor,
  headerTitleStyle: {
    fontSize: Metrics.font.title,
    color: Colors.navHeader.titleColor,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  headerBackTitle: '',
  headerTruncatedBackTitle: '',
  activeTintColor: Colors.navHeader.activeTintColor,
  inactiveTintColor: Colors.navHeader.inactiveTintColor,
  activeBackgroundColor: Colors.navHeader.backgroundColor,
  inactiveBackgroundColor: Colors.navHeader.backgroundColor,
  tabBarActiveTintColor: Colors.navHeader.activeTintColor,
  tabBarInactiveTintColor: Colors.navHeader.inactiveTintColor,
  tabBarActiveBackgroundColor: Colors.bottomTabs.backgroundColor,
  tabBarInactiveBackgroundColor: Colors.bottomTabs.backgroundColor,
  tabBarStyle: {
    backgroundColor: Colors.bottomTabs.backgroundColor
    //paddingVertical: Metrics.padding.small
  },
  tabBarIcon: { size: 2 }
};
