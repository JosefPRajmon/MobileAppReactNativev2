import React, { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useDispatch, useSelector } from 'react-redux';
import { DatabaseProvider } from '../providers/DatabaseProvider';
import { NewsConfig } from '../config/modules/News.config';
import ListItem from '../components/list/ListItem';
import { StyleSheet, FlatList, View, RefreshControl } from 'react-native';
import { Toast } from 'native-base';
import { translate } from '../services/translate.service';
import {
  updateModules,
  addReadedItemId
} from '../store/actions/ModulesActions';
import { createThumbnailUrl } from '../util/helper';
import { ListItemSeparator } from '../components/list/ListItemSeparator';
import { NoDataSVG } from '../components/svg-componets/noData';
import { ButtonMenu } from '../components/header/ButtonMenu';

export default function NewsListScreen({ navigation }: any) {
  const dispatch = useDispatch();
  const db: any = DatabaseProvider.getInstance();
  const readedItemsHidden = useSelector(
    (state: any) => state.modules[NewsConfig.moduleID]?.readedItemsHidden
  );
  const readedItems = useSelector(
    (state: any) => state.modules[NewsConfig.moduleID]?.readedItems || []
  );
  const [refreshing, setRefreshing] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  /* useEffect(() => {
        getData();
    }, []); */

  useEffect(() => {
    getData();
  }, [readedItemsHidden]);

  const getData = async () => {
    db.loadData('SELECT * FROM news ORDER BY pub_date DESC')
      .then((data: any) => {
        if (readedItemsHidden && readedItems) {
          setDataSource(
            data.filter((item: any) => {
              return readedItems.indexOf(item.id_news) === -1;
            })
          );
        } else {
          setDataSource(data);
          /* setDataSource(data.map((item: any) => {
                        item.isReaded = (readedItems.indexOf(item.id_news) !== -1);
                        return item;
                    })) */
        }

        setRefreshing(false);
      })
      .catch((error: any) => {
        console.error('error getData from DB', error);
      });
  };

  const ItemView = ({ item }: any) => {
    return (
      <ListItem
        date={item.pub_date}
        title={item.title}
        description={item.description.length ? item.description : false}
        linkText={item.link && translate.get('text-more-on-web')}
        onItemPress={() => handleItemPress(item)}
            thumb={createThumbnailUrl(item.thumb, 'thumb')}
        image="true"
        //isReaded={item.isReaded}
      />
    );
  };

  const onRefresh = async () => {
    await setRefreshing(true);
    await dispatch(updateModules(NewsConfig.moduleID));
    await getData();
    Toast.show({
      text: translate.get('toast-update-success'),
      type: 'success',
      buttonText: 'Ok',
      duration: 3000
    });
  };

  const handleItemPress = async (item: any) => {
    item.isReaded ||
      (await dispatch(
        await addReadedItemId(NewsConfig.moduleID, item.id_news)
      ));
    item.link && (await WebBrowser.openBrowserAsync(item.link));
    item.isReaded || getData();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dataSource}
        keyExtractor={(item: any) => item.id_news.toString()}
        //ItemSeparatorComponent={ListItemSeparator}
        renderItem={ItemView}
        ListEmptyComponent={<NoDataSVG />}
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl
            title={translate.get('text-update-title')}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
          />
          
          <ButtonMenu navigation={navigation}
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
