import React, { useState, useEffect, useLayoutEffect } from 'react';
import cuid from 'cuid';
import * as _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { DatabaseProvider } from '../providers/DatabaseProvider';
import ListItem from '../components/list/ListItem';
import { Ionicons as Icon } from '@expo/vector-icons';
import {
  StyleSheet,
  FlatList,
  View,
  RefreshControl,
  ScrollView
} from 'react-native';
import { Toast, Container, Accordion, Text } from 'native-base';
import { translate } from '../services/translate.service';
import { updateModules } from '../store/actions/ModulesActions';
import { ListItemSeparator } from '../components/list/ListItemSeparator';
import { AppStyles, Colors, Metrics } from '../themes/';
import { SituationsConfig } from '../config/modules/Situations.config';
import { HeaderSearchBox } from '../components/header/HeaderSearchBox';
import { HeaderButton } from '../components/header/HeaderButton';
import { removeDiacritics, filerForAccordion } from '../util/helper';
import { SITUATIONS_DETAIL } from '../navigation/ScreenNames';
import appStyles from '../themes/AppStyles';
import { NoDataSVG } from '../components/svg-componets/noData';

export default function SituationsListScreen({ navigation }: any) {
  const dispatch = useDispatch();
  const db: any = DatabaseProvider.getInstance();
  const [refreshing, setRefreshing] = useState(false);
  const [situationsData, setSituationsData] = useState([]);
  const [sectionsData, setSectionsData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [typing, setTyping] = useState('');

  useEffect(() => {
    getData();
  }, []);

  useLayoutEffect(() => {
    if (searching) {
      navigation.setOptions({
        headerTitle: () => (
          <HeaderSearchBox
            //onFocus={() => console.log("Vysunout klavesnici TODO")}
            onClosePress={() => setSearching(false)}
            onChangeText={(text: string) => setTyping(removeDiacritics(text))}
            placeholder={translate.get('text-search')}
            //searchBoxOnPress={() => console.log("Search on press")}
            disableTextInput={false}
          />
        ),
        headerRight: () => (
          <View style={appStyles.headerRightContainer}>
            <HeaderButton
              iconType='Ionicon'
              iconName={'ios-close-circle-outline'}
              onPress={() => setSearching(false)}
            />
          </View>
        )
      });
    } else {
      setTyping('');
      setSearchResults([]);
      navigation.setOptions({
        headerTitle: translate.get(SituationsConfig.title),
        headerRight: () => (
          <View style={appStyles.headerRightContainer}>
            <HeaderButton
              iconType='Ionicon'
              iconName='ios-search'
              onPress={() => setSearching(true)}
            />
          </View>
        )
      });
    }
  }, [searching, navigation]);

  useEffect(() => {
    if (searching && typing.length > 1) {
      let foundItems: any = _.filter(situationsData, (item: any) => {
        if (removeDiacritics(item.name).indexOf(typing) != -1) {
          return item;
        }
      });
      setSearchResults(foundItems);
    }
  }, [typing]);

  const getData = async () => {
    Promise.all([
      new Promise((resolve: any) => {
        db.loadData(
          'SELECT situations.id_situation, situations.point_3 AS name, situations.point_4 AS description, situations.id_section, keywords ' +
            'FROM situations ' +
            'LEFT JOIN situations_sections ON situations_sections.id_section = situations.id_section ' +
            'ORDER BY situations.point_3 ASC'
        ).then((situations: any) => {
          setSituationsData(situations);
          resolve();
        });
      }),
      new Promise((resolve: any) => {
        db.loadData(
          'SELECT id_section, name_section FROM situations_sections ORDER BY name_section ASC'
        ).then((sections: any) => {
          setSectionsData(sections);
          resolve();
        });
      })
    ])
      .then(() => {
        setRefreshing(false);
      })
      .catch((error: any) => {
        console.error('error getData from DB', error);
      });
  };

  const renderHeader: any = (item: any, expanded: boolean) => {
    return (
      <View style={AppStyles.accordionHeader}>
        <View style={AppStyles.accordionTitle}>
          <Text style={AppStyles.accordionText}>{item.name_section}</Text>
        </View>
        <View style={AppStyles.accordionIcon}>
          {expanded ? (
            <Icon
              size={Metrics.icon.small}
              color={Colors.accordion.icon}
              name='chevron-up-outline'
            />
          ) : (
            <Icon
              size={Metrics.icon.small}
              color={Colors.accordion.icon}
              name='chevron-down-outline'
            />
          )}
        </View>
      </View>
    );
  };

  const renderList: any = () => {
    return (
      <FlatList
        data={searching ? searchResults : situationsData}
        keyExtractor={() => cuid()}
        ItemSeparatorComponent={ListItemSeparator}
        renderItem={renderItem}
      />
    );
  };

  const renderItems: any = (section: any) => {
    return filerForAccordion(
      situationsData,
      'id_section',
      section.id_section
    ).map((item: any) => renderItem({ item: item }, true));
  };

  const renderItem: any = ({ item }: any, useSeparator?: boolean) => {
    return (
      <ListItem
        key={cuid()}
        title={item?.name}
        description={item?.description.length ? item.description : null}
        onItemPress={() => handleItemPress(item)}
        useSeparator={useSeparator}
      />
    );
  };

  const onRefresh: any = async () => {
    await setRefreshing(true);
    await dispatch(updateModules(SituationsConfig.moduleID));
    await getData();
    Toast.show({
      text: translate.get('toast-update-success'),
      type: 'success',
      buttonText: 'Ok',
      duration: 3000
    });
  };

  const handleItemPress = async (item: any) => {
    navigation.navigate(SITUATIONS_DETAIL, { situationID: item.id_situation });
  };

  return sectionsData.length !== 0 && situationsData.length !== 0 ? (
    <Container style={styles.container}>
      {searching ? (
        renderList()
      ) : (
        <Accordion
          key={cuid()}
          dataArray={sectionsData}
          renderContent={renderItems}
          renderHeader={renderHeader}
          expanded={[]}
          refreshControl={
            <RefreshControl
              title={translate.get('text-update-title')}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
      )}
    </Container>
  ) : (
    <NoDataSVG />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
});
