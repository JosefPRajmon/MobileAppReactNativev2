import React, { useEffect } from 'react';
import * as _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import {
    StyleSheet,
    FlatList,
    View,
} from 'react-native';
import { ListItem, CheckBox, Text, Body } from 'native-base';
import { ListItemSeparator } from '../components/list/ListItemSeparator';

import { Colors } from '../themes';
import { THEMATIC_MAP_OPEN_MODAL, THEMATIC_MAP_SET_TYPES } from '../store/actions/actionTypes';
import { MainButton } from '../components/MainButton';
import appStyles from '../themes/AppStyles';

export default function ThematicMapCategoriesModal({ navigation }: any) {
    const dispatch = useDispatch();
    const { categories } = useSelector((state: any) => state.thematicMap);

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            dispatch({ type: THEMATIC_MAP_OPEN_MODAL, payload: false })
        });

        return unsubscribe;
    }, [navigation]);

    const ItemView = ({ item }: any) => {
        return (
            <ListItem
                key={0}
                style={styles.item}
                onPress={() => handleItemPress(item)}>
                <CheckBox
                    checked={item.checked}
                    color={Colors.checkbox}
                    onPress={() => handleItemPress(item)} />
                <Body>
                    <Text>{item.type_name}</Text>
                </Body>
            </ListItem>
        );
    };

    const handleItemPress = (item: any) => {
        let types = categories.map((type: any) => {
            if (type.id_type === item.id_type) {
                type.checked = !type.checked;
            }
            return type;
        })

        dispatch({
            type: THEMATIC_MAP_SET_TYPES,
            payload: {
                categories: types
            }
        })
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={categories}
                keyExtractor={(item: any) => item.id_type.toString()}
                ItemSeparatorComponent={ListItemSeparator}
                renderItem={ItemView}
            />
            <View style={appStyles.filterButtonsContainer}>
                <MainButton
                    text={"Použít"}
                    iconType="MaterialCommunityIcons"
                    iconName="check"
                    containerStyle={styles.buttonContainer}
                    onButtonPress={() => navigation.goBack()} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: Colors.appBackround
    },
    list: {
        width: "100%"
    },
    item: {
        width: "100%"
    },
    buttonContainer: {
        flex: 1,
        width: "auto",
        paddingTop: 0,
        paddingBottom: 0
    }
});