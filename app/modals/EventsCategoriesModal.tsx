import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem, CheckBox, Text, Body } from 'native-base';
import { Colors, Metrics } from '../themes';
import { useSelector, useDispatch } from 'react-redux';
import { EVENTS_SET_CATEGORY, EVENTS_OPEN_MODAL } from '../store/actions/actionTypes';
import { MainButton } from '../components/MainButton';
import { ListItemSeparator } from '../components/list/ListItemSeparator';
import { FlatList } from 'react-native-gesture-handler';
import appStyles from '../themes/AppStyles';

export const EventsCategoriesModal = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const { categories, allCategories } = useSelector((state: any) => state.events);

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            dispatch({ type: EVENTS_OPEN_MODAL, payload: false })
        });

        return unsubscribe;
    }, [navigation]);


    const setCategory = (value: any) => {
        let allCategories = true;
        let updatedCategories = categories.map((category: any) => {
            if (category.value === value) {
                category.checked = !category.checked;
            }
            if (category.checked) {
                allCategories = false;
            }
            return category;
        })

        dispatch({
            type: EVENTS_SET_CATEGORY,
            payload: {
                allCategories: allCategories,
                categories: updatedCategories
            }
        })
    }

    const setAllCategories = async () => {
        if (!allCategories) {
            await dispatch({
                type: EVENTS_SET_CATEGORY,
                payload: {
                    allCategories: true,
                    categories: categories.map((category: any) => {
                        category.checked = false;
                        return category;
                    })
                }
            })
        }
        navigation.goBack()
    }

    const renderItem = ({ item }: any) => {
        return (
            <ListItem
                key={item.value}
                style={styles.item}
                onPress={() => setCategory(item.value)}>
                <CheckBox
                    checked={item.checked}
                    color={Colors.checkbox}
                    onPress={() => setCategory(item.value)} />
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
                <MainButton
                    text={"Zrušit filtr"}
                    iconType="MaterialCommunityIcons"
                    iconName="close"
                    containerStyle={styles.buttonContainer}
                    onButtonPress={setAllCategories} />
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
