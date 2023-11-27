import React, { useEffect } from 'react';
import cuid from 'cuid';
import {
    StyleSheet,
    View
} from 'react-native';
import { ListItem, CheckBox, Text, Body } from 'native-base';
import { AppStyles, Colors, Metrics } from '../themes';
import { useSelector, useDispatch } from 'react-redux';
import { BOARD_OPEN_MODAL, BOARD_SET_SOURCE, BOARD_SET_TYPE } from '../store/actions/actionTypes';
import { MainButton } from '../components/MainButton';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import appStyles from '../themes/AppStyles';
import { ListItemSeparator } from '../components/list/ListItemSeparator';

export const BoardFilterModal = ({ route, navigation }: any) => {
    const dispatch = useDispatch();
    const { source, type } = useSelector((state: any) => state.board);
    const { sources, types } = route.params.filterData;

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            dispatch({ type: BOARD_OPEN_MODAL, payload: false })
        });

        return unsubscribe;
    }, [navigation]);

    const toggleChoice = (value: any, choice: string) => {
        choice === "source" && dispatch({
            type: BOARD_SET_SOURCE,
            payload: value
        })

        choice === "type" && dispatch({
            type: BOARD_SET_TYPE,
            payload: value
        })
    }

    const renderItem = ({ item }: any, choice: string) => {
        return (
            <ListItem
                key={item.value}
                style={styles.item}
                onPress={() => toggleChoice(item.value, choice)}>
                {choice === "source" &&
                    <CheckBox
                        checked={item.value === source}
                        color={Colors.checkbox}
                        onPress={() => toggleChoice(item.value, choice)} />}
                {choice === "type" &&
                    <CheckBox
                        checked={item.value === type}
                        color={Colors.checkbox}
                        onPress={() => toggleChoice(item.value, choice)} />}
                <Body>
                    <Text>{item.label}</Text>
                </Body>
            </ListItem>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.scrollContainer}>
                <View style={styles.title}>
                    <Text style={AppStyles.detailItemTitle}>Zdroje oznámení</Text>
                </View>
                <FlatList
                    style={styles.list}
                    data={sources}
                    keyExtractor={() => cuid()}
                    ItemSeparatorComponent={ListItemSeparator}
                    renderItem={(item: any) => renderItem(item, "source")}
                />
            </View>
            <View style={styles.scrollContainer}>
                <View style={styles.title}>
                    <Text style={AppStyles.detailItemTitle}>Typy oznámení</Text>
                </View>
                <FlatList
                    style={styles.list}
                    data={types}
                    keyExtractor={() => cuid()}
                    ItemSeparatorComponent={ListItemSeparator}
                    renderItem={(item: any) => renderItem(item, "type")}
                />
            </View>
            <View style={appStyles.filterButtonsContainer}>
                <MainButton
                    text={"Použít"}
                    iconType="MaterialCommunityIcons"
                    iconName="check"
                    containerStyle={styles.buttonContainer}
                    onButtonPress={() => navigation.goBack()} />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: Colors.appBackround
    },
    scrollContainer: {
        flex: 1,
        width: "100%"
    },
    title: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",

        paddingTop: Metrics.padding.big,
        paddingBottom: Metrics.padding.tinny,
        paddingLeft: Metrics.padding.normal,
        backgroundColor: "#cccccc"
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
