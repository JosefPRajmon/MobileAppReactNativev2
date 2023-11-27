import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderNavButton } from '../../components/header/HeaderNavButton';
import { translate } from '../../services/translate.service';
import { GlobalNavigationOptions } from '../GlobalNavigationOptions';
import AboutAppScreen from '../../screens/AboutAppScreen';
import { AboutAppConfig } from '../../config/modules/AboutApp.config';
import { AppModules } from '../../config/App.config';

const AboutApp = createStackNavigator();

export default function AboutAppStackNavigator() {
  return (
    <AboutApp.Navigator>
      <AboutApp.Screen
        name={AboutAppConfig.moduleID}
        component={AboutAppScreen}
        options={{
          ...GlobalNavigationOptions,
          //headerLeft: () => <HeaderNavButton type='menu' />,
          headerTitle: translate.get(
            AppModules.aboutApp.title || AppModules.aboutApp.config.title
          )
        }}
      />
    </AboutApp.Navigator>
  );
}
