import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderNavButton } from '../../components/header/HeaderNavButton';
import EventsListScreen from '../../screens/EventsListScreen';
import { translate } from '../../services/translate.service';
import { GlobalNavigationOptions } from '../GlobalNavigationOptions';
import { EVENTS_DETAIL, EVENTS_CATEGORIES_MODAL, EVENTS_DATES_MODAL } from '../ScreenNames';
import EventsDetailScreen from '../../screens/EventsDetailScreen';
import { EventsConfig } from '../../config/modules/Events.config';
import { EventsCategoriesModal } from '../../modals/EventsCategoriesModal';
import {
    EVENTS_RESET,
    EVENTS_OPEN_MODAL
} from '../../store/actions/actionTypes';
import { useDispatch } from 'react-redux';
import { EventsDatesModal } from '../../modals/EventsDatesModal';
import { HeaderButton } from '../../components/header/HeaderButton';
import { View } from 'react-native';
import appStyles from '../../themes/AppStyles';

const Events = createStackNavigator();

export default function EventsStackNavigator({ navigation }: any) {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            dispatch({ type: EVENTS_RESET })
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <Events.Navigator>
            <Events.Screen
                name={EventsConfig.moduleID}
                component={EventsListScreen}
                options={{
                    ...GlobalNavigationOptions,
                    headerLeft: () => (<HeaderNavButton type="menu" />),
                    headerTitle: translate.get(EventsConfig.title),
                    /*headerRight: () => (
                        <View style={appStyles.headerRightContainer} >
                            <HeaderButton
                                iconType="MaterialCommunityIcons"
                                iconName={"calendar"}
                                onPress={() => dispatch({
                                    type: EVENTS_OPEN_MODAL,
                                    payload: "dates"
                                })}
                            />
                            <HeaderButton
                                iconType="MaterialCommunityIcons"
                                iconName={"filter-outline"}
                                onPress={() => dispatch({
                                    type: EVENTS_OPEN_MODAL,
                                    payload: "categories"
                                })}
                            />
                        </View>
                    )*/
                }}
            />
            <Events.Screen
                name={EVENTS_DETAIL}
                component={EventsDetailScreen}
                options={{
                    ...GlobalNavigationOptions,
                    headerLeft: () => (<HeaderNavButton type="back" />),
                    headerTitle: translate.get(EventsConfig.title),
                }}
            />
            <Events.Screen
                name={EVENTS_CATEGORIES_MODAL}
                component={EventsCategoriesModal}
                options={{
                    ...GlobalNavigationOptions,
                    headerLeft: () => (<HeaderNavButton type="back" />),
                    headerTitle: "Filtr kategorií",
                    //...ModalTransition
                }}
            />
            <Events.Screen
                name={EVENTS_DATES_MODAL}
                component={EventsDatesModal}
                options={{
                    ...GlobalNavigationOptions,
                    headerLeft: () => (<HeaderNavButton type="back" />),
                    headerTitle: "Filtr podle data",
                    //...ModalTransition
                }}
            />
        </Events.Navigator>
    );
}