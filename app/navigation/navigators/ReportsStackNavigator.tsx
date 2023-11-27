import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderNavButton } from '../../components/header/HeaderNavButton';
import { translate } from '../../services/translate.service';
import { GlobalNavigationOptions } from '../GlobalNavigationOptions';
import ReportsScreen from '../../screens/ReportsScreen';
import { PICK_LOCATION_MODAL } from '../ScreenNames';
import { PickLocationModal } from '../../modals/PickLocationModal';
import { AppModules } from '../../config/App.config';

const Reports = createStackNavigator();

export default function ReportsStackNavigator() {
  return (
    <Reports.Navigator>
      <Reports.Screen
        name={AppModules.reports.config.moduleID}
        component={ReportsScreen}
        options={{
          ...GlobalNavigationOptions,
          headerLeft: () => <HeaderNavButton type='menu' />,
          headerTitle: translate.get(
            AppModules.reports.title || AppModules.reports.config.title
          )
        }}
      />
      <Reports.Screen
        name={PICK_LOCATION_MODAL}
        component={PickLocationModal}
        options={{
          ...GlobalNavigationOptions,
          headerLeft: () => <HeaderNavButton type='back' />,
          headerTitle: 'Vybrat umístění'
          //...ModalTransition
        }}
      />
    </Reports.Navigator>
  );
}
