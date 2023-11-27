import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderNavButton } from '../../components/header/HeaderNavButton';
import { translate } from '../../services/translate.service';
import { GlobalNavigationOptions } from '../GlobalNavigationOptions';
import { ReportsConfig } from '../../config/modules/Reports.config';
import ReservationScreen from '../../screens/ReservationScreen';
import { AppModules } from '../../config/App.config';

const Reservation = createStackNavigator();

export default function ReservationStackNavigator() {
  return (
    <Reservation.Navigator>
      <Reservation.Screen
        name={ReportsConfig.moduleID}
        component={ReservationScreen}
        options={{
          ...GlobalNavigationOptions,
          headerLeft: () => <HeaderNavButton type='menu' />,
          headerTitle: translate.get(
            AppModules.reservation.title || AppModules.reservation.config.title
          )
        }}
      />
    </Reservation.Navigator>
  );
}
