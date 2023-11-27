import React from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import Svg, { G, Path } from "react-native-svg";
import { Row } from 'native-base';
import { AppStyles } from '../../themes';
import { SET_FOCUSED_ROUTE } from '../../store/actions/actionTypes';
import { useDispatch } from 'react-redux';
import NewsStackNavigator from '../../navigation/navigators/NewsStackNavigator';
import { IconsLoader } from '../../themes/Images';



export function ButtonMenuItem({ navigation, page = "news" }: any) {
    const dispatch = useDispatch();
    const goTo = (moduleID: string, params: any) => {
        dispatch({
            type: SET_FOCUSED_ROUTE,
            payload: { moduleID: moduleID, pageID: moduleID, params: params }
        });
        navigation.navigate(moduleID, params);
    };

    return (
        <TouchableOpacity style={AppStyles.menuItem} onPress={() => {
           // Alert.alert(page);
            goTo(page, null)
        }}>

            <IconsLoader page={page} />
        </TouchableOpacity>
    );

}


