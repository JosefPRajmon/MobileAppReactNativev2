import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem, CheckBox, Text, Body } from 'native-base';
import { Colors } from '../themes';
import { useSelector, useDispatch } from 'react-redux';
import { EVENTS_SET_DATE_CHOICE, EVENTS_OPEN_MODAL } from '../store/actions/actionTypes';
import { MainButton } from '../components/MainButton';
import { FlatList } from 'react-native-gesture-handler';
import { ListItemSeparator } from '../components/list/ListItemSeparator';
import appStyles from '../themes/AppStyles';

export const EventsDatesModal = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const { dateFilterChoice } = useSelector((state: any) => state.events);
    const categories = [
        //{ value: 0, label: "zvolit datum" },
        { value: 1, label: "dnes" },
        { value: -1, label: "od dnes", checked: true },
        { value: 2, label: "zítra" },
        { value: 3, label: "o víkendu" },
        { value: 4, label: "tento týden" },
        { value: 5, label: "příští týden" },
        { value: 6, label: "tento měsíc" }
    ];

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            dispatch({ type: EVENTS_OPEN_MODAL, payload: false })
        });

        return unsubscribe;
    }, [navigation]);

    const toggleChoice = (value: any) => {
        dispatch({
            type: EVENTS_SET_DATE_CHOICE,
            payload: {
                dateFilterChoice: value
            }
        })
    }

    const renderItem = ({ item }: any) => {
        return (
            <ListItem
                key={item.value}
                style={styles.item}
                onPress={() => toggleChoice(item.value)}>
                <CheckBox
                    checked={item.value === dateFilterChoice}
                    color={Colors.checkbox}
                    onPress={() => toggleChoice(item.value)} />
                <Body>
                    <Text>{item.label}</Text>
                </Body>
            </ListItem>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={categories}
                keyExtractor={(item: any) => item.value.toString()}
                ItemSeparatorComponent={ListItemSeparator}
                renderItem={renderItem}
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
}


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
