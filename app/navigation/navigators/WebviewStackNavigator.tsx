import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderNavButton } from '../../components/header/HeaderNavButton';
import { translate } from '../../services/translate.service';
import { GlobalNavigationOptions } from '../GlobalNavigationOptions';
import { AppModules } from '../../config/App.config';
import WebviewScreen from '../../screens/WebviewScreen';

const Webview = createStackNavigator();

const WebviewStackNavigator = ({ route }: any) => {
  return (
    <Webview.Navigator>
      <Webview.Screen
        name={AppModules.webview.config.moduleID}
        component={WebviewScreen}
        initialParams={{ ...route.params, pageID: route.name }}
        options={{
          ...GlobalNavigationOptions,
          //headerLeft: () => <HeaderNavButton type='menu' />,
          headerTitle: translate.get(
            route?.params?.title || AppModules.webview.config.title
          )
        }}
      />
    </Webview.Navigator>
  );
};

export default WebviewStackNavigator;
