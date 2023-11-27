import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderNavButton } from '../../components/header/HeaderNavButton';
import SituationsListScreen from '../../screens/SituationsListScreen';
import { translate } from '../../services/translate.service';
import { GlobalNavigationOptions } from '../GlobalNavigationOptions';
import SituationsDetailScreen from '../../screens/SituationsDetailScreen';
import { SITUATIONS_DETAIL, CONTACTS_DETAIL } from '../ScreenNames';
import { SituationsConfig } from '../../config/modules/Situations.config';
import ContactsDetailScreen from '../../screens/ContactsDetailScreen';
import { ContactsConfig } from '../../config/modules/Contacts.config';

const Situations = createStackNavigator();

export default function SituationsStackNavigator() {

    return (
        <Situations.Navigator>
            <Situations.Screen
                name={"SituationsListScreen"}
                component={SituationsListScreen}
                options={{
                    ...GlobalNavigationOptions,
                    headerLeft: () => (<HeaderNavButton type="menu" />),
                    headerTitle: translate.get(SituationsConfig.title),
                    //headerRight: () => (<ItemsVisibilityButton moduleID={SituationsConfig.moduleID} />)
                }}
            />
            <Situations.Screen
                name={SITUATIONS_DETAIL}
                component={SituationsDetailScreen}
                options={{
                    ...GlobalNavigationOptions,
                    headerLeft: () => (<HeaderNavButton type="back" />),
                    headerTitle: translate.get(SituationsConfig.title),
                }}
            />
            <Situations.Screen
                name={CONTACTS_DETAIL}
                component={ContactsDetailScreen}
                options={{
                    ...GlobalNavigationOptions,
                    headerLeft: () => (<HeaderNavButton type="back" />),
                    headerTitle: translate.get(ContactsConfig.title),
                }}
            />
        </Situations.Navigator>
    );
}