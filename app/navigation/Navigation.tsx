import * as React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Root } from "native-base";
import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types/types';
import LinkingConfiguration from './LinkingConfiguration';
import AppDrawerNavigator from './navigators/AppDrawerNavigator';
import modulesCheck from '../hooks/modulesCheck';
import registerForPushNotifications from '../providers/NotificationProvider';
import { AppConfig } from '../config/App.config';
import { Colors } from '../themes';


export default function Navigation() {
  const modulesCheckComplete = modulesCheck();
  const registerPushNotificationComplete = AppConfig.enableNotifications ? registerForPushNotifications() : true;

  if (!modulesCheckComplete || !registerPushNotificationComplete) {
    return null;
  } else {
    try {
      SplashScreen.hideAsync();
    } catch (error) {
      console.error("Already hiden Splash", error);
    }
    return (
      <Root>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </Root>
    );
  }
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="AppDrawer" component={AppDrawerNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
