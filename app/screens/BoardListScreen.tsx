import React, { useState, useEffect } from 'react';
import moment from 'moment';
import * as _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { DatabaseProvider } from '../providers/DatabaseProvider';
import { BoardConfig } from '../config/modules/Board.config';
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
import { BOARD_DETAIL, BOARD_FILTER_MODAL } from '../navigation/ScreenNames';
import { NoDataSVG } from '../components/svg-componets/noData';
import { BOARD_SET_TYPE, BOARD_SET_SOURCE, BOARD_OPEN_MODAL } from '../store/actions/actionTypes';
import Colors from '../../towns/prostejov/themes/Colors';

import Svg, { G, Path, Polygon, Rect, Polyline } from "react-native-svg";
import { ButtonMenu } from '../components/header/ButtonMenu';
import { AppStyles } from '../themes';
export default function BoardListScreen({ navigation }: any) {
    const dispatch = useDispatch();
    const db: any = DatabaseProvider.getInstance();
    const filters = useSelector((state: any) => state.board);
    const [refreshing, setRefreshing] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [filterData, setFilterData] = useState<any | null>(null);

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        handleOpenFilter()
    }, [filters.filterIsOpen]);

    const getData = () => {
        const today = moment().startOf('day').valueOf();
        db.loadData('SELECT * FROM board_items ' +
            'LEFT JOIN board_types ON board_items.id_type = board_types.id_type ' +
            'LEFT JOIN board_sources ON board_items.id_source = board_sources.id_source ' +
            'ORDER BY date_from DESC')
            .then((data: any) => {
                setDataSource(data);

                const typesArray = [{ label: "Všechny typy", value: 0 }].concat(
                    _.uniqBy(data, 'id_type').map((x: any) => {
                        return { value: x.id_type, label: x.type_name ? x.type_name : 'Nezatříděno' };
                    }));

                const sourcesArray = [{ label: "Všechny zdroje", value: 0 }].concat(
                    _.uniqBy(data, 'id_source').map((x: any) => {
                        return { value: x.id_source, label: x.source_name ? x.source_name : 'Nezatříděno' };
                    }));

                /* dispatch({
                    type: BOARD_SET_TYPE,
                    payload: typesArray
                })

                dispatch({
                    type: BOARD_SET_SOURCE,
                    payload: sourcesArray
                }) */

                setFilterData({
                    sources: sourcesArray,
                    types: typesArray
                })

                setRefreshing(false);
            })
            .catch((error: any) => {
                console.error("error getData from DB", error);
            });
    };

    const ItemView = ({ item }: any) => {
        return (
            <ListItem
                title={item.title}
                subtitle={translate.get("text-board-hang") + item.date_pretty}
                onItemPress={() => handleItemPress(item)}
            />
        );
    };

    const onRefresh = async () => {
        await setRefreshing(true);
        await dispatch(updateModules(BoardConfig.moduleID));
        await getData();
        Toast.show({
            text: translate.get("toast-update-success"),
            type: "success",
            buttonText: "Ok",
            duration: 3000
        });
    };

    const handleItemPress = async (item: any) => {
        navigation.navigate(BOARD_DETAIL, { boardData: item })
    }

    const handleOpenFilter = () => {
        filters.filterIsOpen && navigation.navigate(BOARD_FILTER_MODAL, { filterData: filterData })
    }

    const filterItems = () => {
        let filtered = (filerCategories(filerCategories(dataSource, "id_source", filters.source), "id_type", filters.type));
        return filtered;
    }

    const filerCategories = (items: Array<any>, type: string, id: number) => {
        return id === 0 ? items : items.filter((item) => {
            return item[type] === id;
        });
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={filterItems()}
                keyExtractor={(item: any) => item.id_notice.toString()}
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


            <ButtonMenu navigation={navigation} item1="filtr" function1={() =>
                dispatch({
                    type: BOARD_OPEN_MODAL,
                    payload: true
                }) }
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
});