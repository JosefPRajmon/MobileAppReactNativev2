import React from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import Svg, { G, Path } from "react-native-svg";
import { Row } from 'native-base';
import { AppStyles } from '../../themes';
import { ButtonMenuItem } from './ButtonMenuItem';
import { IconsLoader } from '../../themes/Images';
import ContactsDepartmentsTabScreen from '../../screens/ContactsDepartmentsTabScreen';
import { StretchInX } from 'react-native-reanimated';
type TestType = {
    navigation?: any; // nahraïte 'any' skuteèným typem pro 'navigation'
    item1?: any; // nahraïte 'any' skuteèným typem pro 'navigation'
    // další vlastnosti...
};
export function ButtonMenu(test: TestType = {}) {
    const { navigation, item1 } = test;
    return (
        <Row style={AppStyles.bottomView}>
            <View style={AppStyles.menuLeft}>
                <Row>
                    <ButtonMenuItem navigation={navigation} />
                    <ButtonMenuItem navigation={navigation}
                        page="onSite"/>
                    <ButtonMenuItem navigation={navigation} page="events" />
                </Row>
             </View>
            <View style={AppStyles.menuCentr} >
                <TouchableOpacity onPress={() => {
                    // Alert.alert(page);
                    navigation.navigate("Home");
                }}>

                    <IconsLoader />
                </TouchableOpacity>
                </View>
            <View style={AppStyles.menuRight}>
                <Row>
                    {isEmptyStr(item1) && (
                        <TouchableOpacity onPress={() => {
 //                           item1Function
                        }}>
                            <IconsLoader page={item1} />
                        </TouchableOpacity>
                    )}
                    <Text>{item1}</Text>
                </Row>
             </View>
        </Row>
    );
    function isEmpty(obj) {
        return Object.keys(obj).length > 1;
    } 
    function isEmptyStr(string) {
        Alert.alert(string.length.toString());
        return string.length > 0;
    }



}


