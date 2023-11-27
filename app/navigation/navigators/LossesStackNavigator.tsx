import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderNavButton } from '../../components/header/HeaderNavButton';
import LossesListScreen from '../../screens/LossesListScreen';
import { translate } from '../../services/translate.service';
import { GlobalNavigationOptions } from '../GlobalNavigationOptions';
import { LOSSES_DETAIL } from '../ScreenNames';
import LossesDetailScreen from '../../screens/LossesDetailScreen';
import { LossesConfig } from '../../config/modules/Losses.config';

const Losses = createStackNavigator();

export default function LossesStackNavigator({ navigation }: any) {
  return (
    <Losses.Navigator>
      <Losses.Screen
        name={LossesConfig.moduleID}
        component={LossesListScreen}
        options={{
          ...GlobalNavigationOptions,
          headerLeft: () => <HeaderNavButton type='menu' />,
          headerTitle: translate.get(LossesConfig.title)
        }}
      />
      <Losses.Screen
        name={LOSSES_DETAIL}
        component={LossesDetailScreen}
        options={{
          ...GlobalNavigationOptions,
          headerLeft: () => <HeaderNavButton type='back' />,
          headerTitle: translate.get(LossesConfig.title)
        }}
      />
    </Losses.Navigator>
  );
}
