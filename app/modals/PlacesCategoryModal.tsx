import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem, CheckBox, Text, Body } from 'native-base';
import { Colors, Metrics } from '../themes';
import { useSelector, useDispatch } from 'react-redux';
import { PLACES_SET_CATEGORY, PLACES_OPEN_MODAL } from '../store/actions/actionTypes';
import { MainButton } from '../components/MainButton';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { ListItemSeparator } from '../components/list/ListItemSeparator';
import appStyles from '../themes/AppStyles';

export const PlacesCategoryModal = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const { categories, allCategories } = useSelector((state: any) => state.places);

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            dispatch({ type: PLACES_OPEN_MODAL, payload: false })
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
            type: PLACES_SET_CATEGORY,
            payload: {
                allCategories: allCategories,
                categories: updatedCategories
            }
        })
    }

    const setAllCategories = async () => {
        if (!allCategories) {
            await dispatch({
                type: PLACES_SET_CATEGORY,
                payload: {
                    allCategories: true,
                    categories: categories.map((category: any) => {
                        category.checked = false;
                        return category;
                    })
                }
            })
        }

        navigation.goBack();
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
