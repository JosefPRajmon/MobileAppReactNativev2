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
    function1?: () => void
    item2?: any; // nahraïte 'any' skuteèným typem pro 'navigation' 
    function2?: () => void
    // další vlastnosti...
};
export function ButtonMenu(test: TestType = {}) {
    const { navigation, item1, function1, item2, function2  } = test;
    return (
        <Row style={AppStyles.bottomView}>
            <View style={AppStyles.menuLeft}>
                <Row style={{ height: "20%" }}>
                </Row>
                <Row style={AppStyles.menuLeftInnert}>
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
                <Row style={{ height: "20%" }}>
                </Row>
                <Row style={AppStyles.menuRightInnert} >
                    {isEmptyStr(item1) && (<TouchableOpacity style={AppStyles.menuItem} onPress={() => {
                        if (function1) {
                            function1();  // Zde volám funkci
                        }
                    }}>
                        <IconsLoader page={item1} />
                    </TouchableOpacity>)}
                    {isEmptyStr(item2) && (<TouchableOpacity style={AppStyles.menuItem} onPress={() => {
                        if (function2) {
                            function2();  // Zde volám funkci
                        }
                    }}>
                        <IconsLoader page={item2} />
                    </TouchableOpacity>)}
                </Row>
             </View>
        </Row>
    );
    function isEmpty(obj) {
        return true;//Object.keys(obj).length > 1;
    } 
    function isEmptyStr(string) {
        if (string === undefined || string === null) {
            return false;
        }
       // Alert.alert(string.length.toString());
        return string.length > 0;
    }



}


