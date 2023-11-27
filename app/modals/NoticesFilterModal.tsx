import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem, CheckBox, Text, Body } from 'native-base';
import { Colors, Metrics } from '../themes';
import { useSelector, useDispatch } from 'react-redux';
import { NOTICES_SET_TYPES } from '../store/actions/actionTypes';
import { MainButton } from '../components/MainButton';

export const NoticesFilterModal = ({navigation}: any) => {
    const dispatch = useDispatch();
    const filter = useSelector((state: any) => state.notices);


    const setType = (value: any) => {
        let allTypes = true;
        let types = filter.types.map((type: any) => {
            if (type.value === value) {
                type.checked = !type.checked;
            }
            if (type.checked) {
                allTypes = false;
            }
            return type;
        })

        dispatch({
            type: NOTICES_SET_TYPES,
            payload: {
                allTypes: allTypes,
                types: types
            }
        })
    }

    const setAllTypes = () => {
        if (!filter.allTypes) {
            dispatch({
                type: NOTICES_SET_TYPES,
                payload: {
                    allTypes: true,
                    types: filter.types.map((type: any) => {
                        type.checked = false;
                        return type;
                    })
                }
            })
        }
    }

    return (
        <View style={styles.container}>
            <ListItem
                key={0}
                style={styles.item}
                onPress={setAllTypes}>
                <CheckBox checked={filter.allTypes} color={Colors.checkbox} />
                <Body>
                    <Text>Všechna oznámení</Text>
                </Body>
            </ListItem>
            {filter.types && filter.types.map((type: any) => (
                <ListItem
                    key={type.value}
                    style={styles.item}
                    onPress={() => setType(type.value)}>
                    <CheckBox checked={type.checked} color={Colors.checkbox} />
                    <Body>
                        <Text>{type.label}</Text>
                    </Body>
                </ListItem>
            ))
            }
            <MainButton
                text={"Hotovo"}
                iconType="MaterialCommunityIcons"
                iconName="check-bold"
                onButtonPress={() => navigation.goBack()} />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: Metrics.padding.normal,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: Colors.appBackround
    },
    item: {
        width: "100%"
    }
});
