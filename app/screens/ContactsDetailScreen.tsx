import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'native-base';
import { DatabaseProvider } from '../providers/DatabaseProvider';
import { AppStyles, Colors, Metrics } from '../themes';
import DetailItem from '../components/detail/DetailItem';
import { ScrollView } from 'react-native-gesture-handler';
import { SITUATIONS_DETAIL } from '../navigation/ScreenNames';
import { AppConfig } from '../config/App.config';
import { ButtonMenu } from '../components/header/ButtonMenu';

export default function ContactsDetailScreen({ route, navigation }: any) {
  const db: any = DatabaseProvider.getInstance();
  const { id_person } = route.params;
  const [detailData, setDetailData] = useState<any | undefined>();

  useEffect(() => {
    getData();
  }, [id_person]);

  const getData = async () => {
    let data: any = {};

    let promises = [
      new Promise((resolve: any) => {
        db.loadData(
          'SELECT title_before, name, surname, title_behind, email, phone_1, phone_2, placement, name_building, name_job ' +
            'FROM contacts_persons ' +
            'LEFT JOIN contacts_jobs ON contacts_jobs.id_job = contacts_persons.id_job ' +
            'LEFT JOIN contacts_buildings ON contacts_persons.id_building = contacts_buildings.id_building ' +
            'WHERE contacts_persons.id_person = ' +
            id_person
        ).then(([contact]: any) => {
          let contacts = [];
          contact.email && contacts.push({ email: contact.email });
          contact.phone_1 && contacts.push({ number: contact.phone_1 });
          contact.phone_2 && contacts.push({ number: contact.phone_2 });

          data = {
            fullName:
              (contact.title_before ? contact.title_before + ' ' : '') +
              contact.name +
              ' ' +
              contact.surname +
              (contact.title_behind ? ' ' + contact.title_behind : ''),
            jobName: contact.name_job,
            placement: contact.name_building + ' -> ' + contact.placement,
            contacts: contacts
          };
          resolve();
        });
      })
    ];

    if (AppConfig.AppModules?.situations) {
      promises.push(
        new Promise((resolve: any) => {
          db.loadData(
            'SELECT situations.id_situation , situations.point_3 AS name ' +
              'FROM contacts_persons ' +
              'INNER JOIN situations_functions ON situations_functions.id_function = contacts_persons.id_job ' +
              'LEFT JOIN situations ON situations.id_situation = situations_functions.id_situation ' +
              'WHERE contacts_persons.id_person = ' +
              id_person +
              ' ORDER BY situations.point_3 ASC'
          ).then((situations: any) => {
            if (situations.length) {
              data.situations = situations;
            }
            resolve();
          });
        })
      );
    }

    Promise.all(promises)
      .then(() => {
        setDetailData(data);
      })
      .catch((error: any) => {
        console.error('error getData from DB', error);
      });
  };

  const handleOpenSituation = (id_situation: number) => {
    navigation.navigate(SITUATIONS_DETAIL, { situationID: id_situation });
  };

    return detailData ? (

    <ScrollView scrollIndicatorInsets={{ right: 1 }}>
      <View style={styles.container}>
        <Text style={AppStyles.detailTitle}>{detailData.fullName}</Text>
        <DetailItem title={'Funkce'} data={detailData.jobName} />
        <DetailItem
          type='email-phone-link'
          title={'Kontakty'}
          data={detailData.contacts}
        />
        <DetailItem title={'Kancelář'} data={detailData.placement} />
        {detailData.situations && (
          <DetailItem
            title={'Řeší tyto žívotní situace'}
            type='situations'
            data={detailData.situations}
            onItemPress={handleOpenSituation}
          />
        )}
          </View>

    </ScrollView>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: Metrics.padding.normal,
    backgroundColor: Colors.appBackround,
    paddingBottom: Metrics.padding.big
  },
  description: {
    fontSize: Metrics.font.text,
    color: Colors.text.defaultText,
    marginTop: Metrics.margin.normal
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  }
});
