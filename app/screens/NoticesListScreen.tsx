import React, { useState, useEffect } from 'react';
import moment from 'moment';
import * as _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { DatabaseProvider } from '../providers/DatabaseProvider';
import ListItem from '../components/list/ListItem';
import {
    StyleSheet,
    FlatList,
    View,
    RefreshControl,
} from 'react-native';
import { Toast } from "native-base";
import { translate } from '../services/translate.service';
import { updateModules } from '../store/actions/ModulesActions';
import { ListItemSeparator } from '../components/list/ListItemSeparator';
import { NOTICES_DETAIL, NOTICES_FILTER_MODAL } from '../navigation/ScreenNames';
import { NOTICES_SET_TYPES } from '../store/actions/actionTypes';
import { NoticesConfig } from '../config/modules/Notices.config';
import { NoDataSVG } from '../components/svg-componets/noData';
import { ButtonMenu } from '../components/header/ButtonMenu';

export default function NoticesListScreen({ navigation }: any) {
    const dispatch = useDispatch();
    const db: any = DatabaseProvider.getInstance();
    const filter = useSelector((state: any) => state.notices);
    const [refreshing, setRefreshing] = useState(true);
    const [dataSource, setDataSource] = useState([]);
    const [filteredData, setFilteredData] = useState<any>([]);

    useEffect(() => {
        getData();
    }, []);

    /* useLayoutEffect(() => {
        filter.types && navigation.setOptions({
            headerRight: () => (
                <HeaderButton
                    iconType="MaterialCommunityIcons"
                    iconName={"filter-outline"}
                    onPress={handleOpenFilter} />
            )
        });
    }, [filter]); */

    /* useEffect(() => {
        let result: any = filter.allTypes ?
            dataSource :
            dataSource.filter((item) => {
                for (let type of filter.types) {
                    if (item["id_type"] === type.value) {
                        return type.checked;
                    }
                }
            })
        setFilteredData(result);
    }, [dataSource, filter]); */

    const getData = () => {
        const today = moment().startOf('day').valueOf();
        db.loadData("SELECT notices.id_notice, notices.id_type, notices.name, notices.description, notices_types.type_name, date_from, date_to " +
            "FROM notices " +
            "LEFT JOIN notices_types ON notices_types.id_type = notices.id_type " +
            "WHERE (notices.date_from <= " + today + " AND notices.date_to >= " + today + ") OR (notices.date_from IS NULL AND notices.date_to IS NULL) " +
            "ORDER BY notices.date_to ASC")
            .then((data: any) => {
                setDataSource(data);

                /* const typesArray = _.uniqBy(data, 'id_type').map((x: any) => {
                    return { value: x.id_type, checked: false, label: x.type_name ? x.type_name : 'Nezatříděno' };
                })

                dispatch({
                    type: NOTICES_SET_TYPES,
                    payload: typesArray
                }) */

                setRefreshing(false);
            })
            .catch((error: any) => {
                setRefreshing(false);
                console.error("error getData from DB", error);
            });
    };

    const ItemView = ({ item }: any) => {
        return (
            <ListItem
                title={item.name}
                subtitle={item.type_name}
                onItemPress={() => handleItemPress(item)}
            />
        );
    };

    const onRefresh = async () => {
        await setRefreshing(true);
        await dispatch(updateModules(NoticesConfig.moduleID));
        await getData();
        Toast.show({
            text: translate.get("toast-update-success"),
            type: "success",
            buttonText: "Ok",
            duration: 3000
        });
    };

    const handleItemPress = (item: any) => {
        navigation.navigate(NOTICES_DETAIL, { noticeData: item });
    }

    /* const handleOpenFilter = () => {
        navigation.navigate(NOTICES_FILTER_MODAL);
    } */

    return (
        <View style={styles.container}>
            <FlatList
                data={dataSource}
                keyExtractor={(item: any) => item.id_notice.toString()}
                //ItemSeparatorComponent={ListItemSeparator}
                renderItem={ItemView}
                ListEmptyComponent={<NoDataSVG navigation={navigation} />}
                contentContainerStyle={{ flexGrow: 1 }}
                refreshControl={
                    <RefreshControl
                        title={translate.get("text-update-title")}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
            <ButtonMenu navigation={navigation}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});