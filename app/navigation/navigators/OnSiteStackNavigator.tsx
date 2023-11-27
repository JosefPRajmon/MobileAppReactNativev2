import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderNavButton } from '../../components/header/HeaderNavButton';
import OnSiteListScreen from '../../screens/OnSiteListScreen';
import { translate } from '../../services/translate.service';
import { GlobalNavigationOptions } from '../GlobalNavigationOptions';
import { ItemsVisibilityButton } from '../../components/header/ItemsVisibilityButton';
import { OnSiteConfig } from '../../config/modules/OnSite.config';
import appStyles from '../../themes/AppStyles';
import { View } from 'react-native';

const OnSite = createStackNavigator();

export default function OnSiteStackNavigator() {

    return (
        <OnSite.Navigator>
            <OnSite.Screen
                name={OnSiteConfig.moduleID}
                component={OnSiteListScreen}
                options={{
                    ...GlobalNavigationOptions,
                    //headerLeft: () => (<HeaderNavButton type="menu" />),
                    headerTitle: translate.get(OnSiteConfig.title),
                    /*headerRight: () => (
                        <View style={appStyles.headerRightContainer} >
                            <ItemsVisibilityButton moduleID={OnSiteConfig.moduleID} />
                        </View>)*/
                }}
            />
        </OnSite.Navigator>
    );
}