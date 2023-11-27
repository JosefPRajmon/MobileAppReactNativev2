import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DatabaseProvider } from '../providers/DatabaseProvider';
import { NewsConfig } from '../config/modules/News.config';
import cuid from "cuid";
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
import DetailItem from '../components/detail/DetailItem';
import { Metrics, Colors } from '../themes';
import { NoDataSVG } from '../components/svg-componets/noData';

export default function HelplinesListScreen() {
    const dispatch = useDispatch();
    const db: any = DatabaseProvider.getInstance();
    const [refreshing, setRefreshing] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        db.loadData('SELECT * FROM helplines')
            .then((data: any) => {
                setDataSource(data.map((item: any) => {
                    return {
                        title: item.title,
                        lines: JSON.parse(item.lines)
                    }
                }));
                setRefreshing(false);
            })
            .catch((error: any) => {
                console.error("error getData from DB", error);
            });
    };

    const ItemView = ({ item }: any) => {
        return (
            <DetailItem
                type="email-phone-link"
                title={item.title}
                data={item.lines} />
        );
    };

    const onRefresh = async () => {
        await setRefreshing(true);
        await dispatch(updateModules(NewsConfig.moduleID));
        await getData();
        Toast.show({
            text: translate.get("toast-update-success"),
            type: "success",
            buttonText: "Ok",
            duration: 3000
        });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={dataSource}
                keyExtractor={(item: any) => cuid()}
                ItemSeparatorComponent={ListItemSeparator}
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: Metrics.padding.normal,
        backgroundColor: Colors.appBackround
    }
});