import React, { useState, useEffect, useLayoutEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import moment from 'moment';
import * as _ from 'lodash';
import { useDispatch } from 'react-redux';
import { DatabaseProvider } from '../providers/DatabaseProvider';
import { ContactsConfig } from '../config/modules/Contacts.config';
import ListItem from '../components/list/ListItem';
import {
    StyleSheet,
    FlatList,
    View,
    RefreshControl,
} from 'react-native';
import { Row, Toast } from "native-base";
import { translate } from '../services/translate.service';
import { updateModules } from '../store/actions/ModulesActions';
import { ListItemSeparator } from '../components/list/ListItemSeparator';
import { HeaderButton } from '../components/header/HeaderButton';
import { HeaderSearchBox } from '../components/header/HeaderSearchBox';
import { removeDiacritics } from '../util/helper';
import { CONTACTS_DETAIL } from '../navigation/ScreenNames';
import { NoDataSVG } from '../components/svg-componets/noData';
import appStyles from '../themes/AppStyles';
import Svg, { G, Path, Polygon, Rect, Polyline } from "react-native-svg";
import Colors from '../../towns/litovel/themes/Colors';
import { ButtonMenu } from '../components/header/ButtonMenu';

export default function ContactsAlphabetTabScreen({ navigation }: any) {
    const dispatch = useDispatch();
    const db: any = DatabaseProvider.getInstance();
    const [refreshing, setRefreshing] = useState(false);
    const [contactsData, setContactsData] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searching, setSearching] = useState(false);
    const [typing, setTyping] = useState("");

    useLayoutEffect(() => {
        if (searching) {
            navigation.setOptions({
                headerTitle: () => (
                    <HeaderSearchBox
                        onFocus={() => console.log("Vysunout klavesnici TODO")}
                        onClosePress={() => setSearching(false)}
                        onChangeText={(text: string) => setTyping(removeDiacritics(text))}
                        placeholder={translate.get("text-search")}
                        searchBoxOnPress={() => console.log("Search on press")}
                        disableTextInput={false} />
                ),
                headerRight: () => (
                    <View style={appStyles.headerRightContainer} >
                        <HeaderButton
                            iconType="Ionicon"
                            iconName={"ios-close-circle-outline"}
                            onPress={() => setSearching(false)} />
                    </View>
                )
            }
            )
        } else {
            setTyping("");
            setSearchResults([]);
            navigation.setOptions({
                headerTitle: translate.get(ContactsConfig.title),
                headerRight: () => (
                    <View style={appStyles.headerRightContainer} >
                        <HeaderButton
                            iconType="Ionicon"
                            iconName="ios-search"
                            onPress={() => setSearching(true)} />
                    </View>
                )
            });
        }

    }, [searching, navigation]);

    useEffect(() => {
        if (typing.length > 1) {
            let foundItems: any = _.filter(contactsData, (contact: any) => {
                if ((removeDiacritics(contact.surname).indexOf(typing) != -1)
                    || (removeDiacritics(contact.name).indexOf(typing) != -1)
                    || (removeDiacritics(contact.name_job).indexOf(typing) != -1)) {
                    return contact;
                }
            })
            setSearchResults(foundItems);
        }
    }, [typing]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const today = moment().startOf('day').valueOf();
        db.loadData("SELECT contacts_persons.id_person, contacts_persons.id_job, contacts_persons.name, contacts_persons.surname, contacts_jobs.name_job, contacts_jobs.stupen, contacts_jobs.poradi, contacts_jobs.sub_department \n\
        FROM contacts_persons \n\
        LEFT JOIN contacts_jobs ON contacts_jobs.id_job = contacts_persons.id_job \n\
        ORDER BY contacts_persons.surname ASC")
            .then((contacts: any) => {
                setContactsData(contacts);
                setRefreshing(false);
            })
            .catch((error: any) => {
                console.error("error getData from DB", error);
            });
    };

    const ItemView = ({ item }: any) => {
        return (
            <ListItem
                title={item.surname + " " + item.name}
                subtitle={item.name_job}
                onItemPress={() => handleItemPress(item)}

            />
        );
    };

    const onRefresh = async () => {
        await setRefreshing(true);
        await dispatch(updateModules(ContactsConfig.moduleID));
        await getData();
        Toast.show({
            text: translate.get("toast-update-success"),
            type: "success",
            buttonText: "Ok",
            duration: 3000
        });
    };

    const handleItemPress = async (item: any) => {
        navigation.navigate(CONTACTS_DETAIL, { id_person: item.id_person })
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={searching ? searchResults : contactsData}
                keyExtractor={(item: any) => item.id_person.toString()}
                //ItemSeparatorComponent={ListItemSeparator}
                renderItem={ItemView}
                ListEmptyComponent={<NoDataSVG />}
                contentContainerStyle={{ flexGrow: 1 }}
                refreshControl={
                    <RefreshControl
                        title={translate.get("text-update-title")}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />

            <ButtonMenu navigation={navigation} item1="onSide"  />


        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }, bottomView: {
        height: "8%", // Nebo jakoukoliv výšku, kterou chcete
        backgroundColor: 'rgba(255, 255, 255, 0.0)'
        // Další styly pro spodní View
    },
    menuCentr: {
        width: "20%",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.dashBoard.headerBg
    },
    menuLeft: {
        width: "40%",
        backgroundColor: Colors.dashBoard.headerBg
    },
    menuRight: {
        width: "40%",
        backgroundColor: Colors.dashBoard.headerBg
    },
});