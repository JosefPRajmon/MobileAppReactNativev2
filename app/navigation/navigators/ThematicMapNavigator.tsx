import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderNavButton } from '../../components/header/HeaderNavButton';
import { translate } from '../../services/translate.service';
import { GlobalNavigationOptions } from '../GlobalNavigationOptions';
import { THEMATIC_MAP_CATEGORIES_MODAL } from '../ScreenNames';
import { ThematicMapConfig } from '../../config/modules/ThematicMap.config';
import ThematicMapScreen from '../../screens/ThematicMapScreen';
import { HeaderButton } from '../../components/header/HeaderButton';
import { useDispatch } from 'react-redux';
import { THEMATIC_MAP_RESET, THEMATIC_MAP_OPEN_MODAL } from '../../store/actions/actionTypes';
import ThematicMapCategoriesModal from '../../modals/ThematicMapCategoriesModal';
import appStyles from '../../themes/AppStyles';
import { View } from 'react-native';

const ThematicMap = createStackNavigator();

export default function ThematicMapNavigator({ navigation }: any) {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            dispatch({ type: THEMATIC_MAP_RESET })
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            dispatch({ type: THEMATIC_MAP_OPEN_MODAL, payload: true })
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <ThematicMap.Navigator>
            <ThematicMap.Screen
                name={ThematicMapConfig.moduleID}
                component={ThematicMapScreen}
                options={{
                    ...GlobalNavigationOptions,
                    headerLeft: () => (<HeaderNavButton type="menu" />),
                    headerTitle: translate.get(ThematicMapConfig.title),
                    headerRight: () => (
                        <View style={appStyles.headerRightContainer} >
                            <HeaderButton
                                iconType="MaterialCommunityIcons"
                                iconName={"filter-outline"}
                                onPress={() => dispatch({
                                    type: THEMATIC_MAP_OPEN_MODAL,
                                    payload: true
                                })}
                            />
                        </View>)
                }}
            />
            <ThematicMap.Screen
                name={THEMATIC_MAP_CATEGORIES_MODAL}
                component={ThematicMapCategoriesModal}
                options={{
                    ...GlobalNavigationOptions,
                    headerLeft: () => (<HeaderNavButton type="back" />),
                    headerTitle: "Filtrovat kategorie",
                    //...ModalTransition
                }}
            />
        </ThematicMap.Navigator>
    );
}