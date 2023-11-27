import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderNavButton } from '../../components/header/HeaderNavButton';
import { translate } from '../../services/translate.service';
import { GlobalNavigationOptions } from '../GlobalNavigationOptions';
import TouristInfoScreen from '../../screens/TouristInfoScreen';
import { TouristInfoConfig } from '../../config/modules/TouristInfo.config';

const TouristInfo = createStackNavigator();

export default function TouristInfoStackNavigator() {

    return (
        <TouristInfo.Navigator>
            <TouristInfo.Screen
                name={TouristInfoConfig.moduleID}
                component={TouristInfoScreen}
                options={{
                    ...GlobalNavigationOptions,
                    headerLeft: () => (<HeaderNavButton type="menu" />),
                    headerTitle: translate.get(TouristInfoConfig.title)
                }}
            />
        </TouristInfo.Navigator>
    );
}