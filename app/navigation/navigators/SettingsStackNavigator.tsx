import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderNavButton } from '../../components/header/HeaderNavButton';
import { translate } from '../../services/translate.service';
import { GlobalNavigationOptions } from '../GlobalNavigationOptions';
import { SettingsConfig } from '../../config/modules/Settings.config';
import SettingsScreen from '../../screens/SettingsScreen';
import { PICK_LOCATION_MODAL } from '../ScreenNames';
import { PickLocationModal } from '../../modals/PickLocationModal';

const Settings = createStackNavigator();

export default function SettingsStackNavigator() {

    return (
        <Settings.Navigator>
            <Settings.Screen
                name={SettingsConfig.moduleID}
                component={SettingsScreen}
                options={{
                    ...GlobalNavigationOptions,
                    headerLeft: () => (<HeaderNavButton type="menu" />),
                    headerTitle: translate.get(SettingsConfig.title)
                }}
            />
            <Settings.Screen
                name={PICK_LOCATION_MODAL}
                component={PickLocationModal}
                options={{
                    ...GlobalNavigationOptions,
                    headerLeft: () => (<HeaderNavButton type="back" />),
                    headerTitle: "Vybrat umístění",
                    //...ModalTransition
                }}
            />
        </Settings.Navigator>
    );
}