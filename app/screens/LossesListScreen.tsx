import React, { useState, useEffect } from 'react';
import * as _ from 'lodash';
import { useDispatch } from 'react-redux';
import { DatabaseProvider } from '../providers/DatabaseProvider';
import { LossesConfig } from '../config/modules/Losses.config';
import ListItem from '../components/list/ListItem';
import { StyleSheet, FlatList, View, RefreshControl, Text } from 'react-native';
import { Toast } from 'native-base';
import { translate } from '../services/translate.service';
import { updateModules } from '../store/actions/ModulesActions';
import { createThumbnailUrl } from '../util/helper';
import { ListItemSeparator } from '../components/list/ListItemSeparator';
import { LOSSES_DETAIL } from '../navigation/ScreenNames';
import { NoDataSVG } from '../components/svg-componets/noData';

export default function LossesListScreen({ navigation }: any) {
  const dispatch = useDispatch();
  const db: any = DatabaseProvider.getInstance();
  const [refreshing, setRefreshing] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    db.loadData('SELECT * FROM losses_items ORDER BY datetime DESC')
      .then((data: any) => {
        setDataSource(data);

        setRefreshing(false);
      })
      .catch((error: any) => {
        console.error('error getData from DB', error);
      });
  };

  const ItemView = ({ item }: any) => {
    return (
      <ListItem
        date={item.datetime_pretty}
        title={item.name}
        subtitle={item.place != '' || undefined}
        disabled
        //onItemPress={() => handleItemPress(item)}
        //thumb={item.thumb}
      />
    );
  };

  const onRefresh = async () => {
    await setRefreshing(true);
    await dispatch(updateModules(LossesConfig.moduleID));
    await getData();
    Toast.show({
      text: translate.get('toast-update-success'),
      type: 'success',
      buttonText: 'Ok',
      duration: 3000
    });
  };

  /*  const handleItemPress = async (item: any) => {
    navigation.navigate(LOSSES_DETAIL, { lossesData: item });
  }; */

  return (
    <View style={styles.container}>
      <FlatList
        data={dataSource}
        keyExtractor={(item: any) => item.id_losses.toString()}
        ItemSeparatorComponent={ListItemSeparator}
        ListEmptyComponent={<NoDataSVG />}
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={ItemView}
        refreshControl={
          <RefreshControl
            //refresh control used for the Pull to Refresh
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
});
