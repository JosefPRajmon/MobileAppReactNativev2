import React, { useState, useEffect } from 'react';
import * as _ from 'lodash';
import cuid from 'cuid';
import { useDispatch } from 'react-redux';
import { DatabaseProvider } from '../providers/DatabaseProvider';
import { ContactsConfig } from '../config/modules/Contacts.config';
import ListItem from '../components/list/ListItem';
import { StyleSheet, View, RefreshControl } from 'react-native';
import { Toast, Accordion, Text } from 'native-base';
import { AppStyles, Colors, Metrics } from '../themes/';
import { Ionicons as Icon } from '@expo/vector-icons';
import { translate } from '../services/translate.service';
import { updateModules } from '../store/actions/ModulesActions';
import { CONTACTS_DETAIL } from '../navigation/ScreenNames';
import { filerForAccordion } from '../util/helper';
import { NoDataSVG } from '../components/svg-componets/noData';

export default function ContactsDepartmentsTabScreen({ navigation }: any) {
  const dispatch = useDispatch();
  const db: any = DatabaseProvider.getInstance();
  const [refreshing, setRefreshing] = useState(true);
  const [contactsData, setContactsData] = useState([]);
  const [departmentsData, setDepartmentsData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    Promise.all([
      db
        .loadData(
          'SELECT contacts_persons.id_person, contacts_persons.id_job, contacts_persons.name, contacts_persons.surname, contacts_jobs.name_job, contacts_jobs.stupen, contacts_jobs.poradi, contacts_jobs.sub_department \n\
            FROM contacts_persons \n\
            LEFT JOIN contacts_jobs ON contacts_jobs.id_job = contacts_persons.id_job \n\
            ORDER BY contacts_jobs.stupen, contacts_jobs.poradi, contacts_persons.surname ASC'
        )
        .then((contacts: any) => {
          setContactsData(contacts);
        }),
      db
        .loadData(
          'SELECT id_job, name_job AS name_department, stupen, poradi FROM contacts_jobs WHERE node = 1 ORDER BY stupen, poradi, name_job ASC'
        )
        .then((departments: any) => {
          setDepartmentsData(departments);
        })
    ])
      .then(() => {
        setRefreshing(false);
      })
      .catch((error: any) => {
        setRefreshing(false);
        console.error('error getData from DB', error);
      });
  };

  const renderHeader = (item: any, expanded: boolean) => {
    const title: string =
      item.name_department.charAt(0).toUpperCase() +
      item.name_department.slice(1);

    return (
      <View style={AppStyles.accordionHeader}>
        <View style={AppStyles.accordionTitle}>
          <Text style={AppStyles.accordionText}>{title}</Text>
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

  const renderItems: any = (section: any) => {
    return filerForAccordion(
      contactsData,
      'sub_department',
      section.id_job
    ).map((item: any) => {
      return (
        <ListItem
          key={cuid()}
          title={item.surname + ' ' + item.name}
          subtitle={item.name_job}
          onItemPress={() => handleItemPress(item)}
          useSeparator={true}
        />
      );
    });
  };

  const onRefresh = async () => {
    await setRefreshing(true);
    await dispatch(updateModules(ContactsConfig.moduleID));
    await getData();
    Toast.show({
      text: translate.get('toast-update-success'),
      type: 'success',
      buttonText: 'Ok',
      duration: 3000
    });
  };

  const handleItemPress = async (item: any) => {
    navigation.navigate(CONTACTS_DETAIL, { id_person: item.id_person });
  };

  return departmentsData.length !== 0 ? (
    <Accordion
      key={cuid()}
      refreshControl={
        <RefreshControl
          title={translate.get('text-update-title')}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      dataArray={departmentsData}
      renderContent={renderItems}
      renderHeader={renderHeader}
      ListEmptyComponent={<NoDataSVG />}
      expanded={[]}
    />
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
