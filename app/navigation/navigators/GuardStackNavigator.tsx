import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderNavButton } from '../../components/header/HeaderNavButton';
import { translate } from '../../services/translate.service';
import { GlobalNavigationOptions } from '../GlobalNavigationOptions';
import GuardScreen from '../../screens/GuardScreen';
import { GuardConfig } from '../../config/modules/Guard.config';
import { PICK_LOCATION_MODAL } from '../ScreenNames';
import { PickLocationModal } from '../../modals/PickLocationModal';

const Guard = createStackNavigator();

export default function GuardStackNavigator() {

    return (
        <Guard.Navigator>
            <Guard.Screen
                name={GuardConfig.moduleID}
                component={GuardScreen}
                options={{
                    ...GlobalNavigationOptions,
                    //headerLeft: () => (<HeaderNavButton type="menu" />),
                    headerTitle: translate.get(GuardConfig.title)
                }}
            />
            <Guard.Screen
                name={PICK_LOCATION_MODAL}
                component={PickLocationModal}
                options={{
                    ...GlobalNavigationOptions,
                    headerLeft: () => (<HeaderNavButton type="back" />),
                    headerTitle: "Vybrat umístění",
                    //...ModalTransition
                }}
            />
        </Guard.Navigator>
    );
}