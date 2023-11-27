import React, { useEffect, useState, useLayoutEffect } from 'react';
import moment from 'moment';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { View, ActionSheet, Text } from 'native-base';
import { DatabaseProvider } from '../providers/DatabaseProvider';
import { AppStyles, Colors, Metrics } from '../themes';
import DetailItem from '../components/detail/DetailItem';
import { ScrollView } from 'react-native-gesture-handler';
import { SITUATIONS_DETAIL, CONTACTS_DETAIL } from '../navigation/ScreenNames';
import { HeaderButton } from '../components/header/HeaderButton';
import { translate } from '../services/translate.service';
import appStyles from '../themes/AppStyles';

export default function SituationsDetailScreen({ route, navigation }: any) {
  const dispatch = useDispatch();
  const db: any = DatabaseProvider.getInstance();
  const { situationID } = route.params;
  const [detailData, setDetailData] = useState<any | undefined>();
  const [points, setPoints] = useState<any>([]);
  const [viewLevel, setViewLevel] = useState(2);

  useEffect(() => {
    getData();
  }, [situationID]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={appStyles.headerRightContainer}>
          <HeaderButton
            iconType='MaterialCommunityIcons'
            iconName={'file-eye-outline'}
            onPress={handleShowViewLevelSheet}
          />
        </View>
      )
    });
  }, [viewLevel, setViewLevel]);

  const getData = async () => {
    let dataBuilder: any = {};
    Promise.all([
      new Promise(resolve =>
        db
          .loadData(
            'SELECT * ' +
              'FROM situations ' +
              'WHERE situations.id_situation = ' +
              situationID
          )
          .then((result: any) => {
            if (result.length > 0) {
              dataBuilder = { ...result[0] };
              dataBuilder.point_11 = JSON.parse(dataBuilder?.point_11);
              dataBuilder.point_14 = JSON.parse(dataBuilder?.point_14);
              dataBuilder.point_16 = JSON.parse(dataBuilder?.point_16);
              dataBuilder.point_17 = JSON.parse(dataBuilder?.point_17);
              dataBuilder.point_18 = JSON.parse(dataBuilder?.point_18);
              dataBuilder.point_21 = JSON.parse(dataBuilder?.point_21);
              dataBuilder.point_22 = JSON.parse(dataBuilder?.point_22);
              dataBuilder.point_23 = JSON.parse(dataBuilder?.point_23);
              dataBuilder.point_27 = moment(dataBuilder?.point_27).format(
                'D.M.YYYY'
              );
              dataBuilder.point_28 = moment(dataBuilder?.point_28).format(
                'D.M.YYYY'
              );
              dataBuilder.point_29 = moment(dataBuilder?.point_29).format(
                'D.M.YYYY'
              );

              let contactPromises = [];

              if (dataBuilder.point_25) {
                contactPromises.push(
                  new Promise((resolve, reject) => {
                    try {
                      db.loadData(
                        'SELECT contacts_jobs.name_job, contacts_persons.name, contacts_persons.surname, contacts_persons.id_person ' +
                          'FROM contacts_jobs ' +
                          'INNER JOIN contacts_persons ON contacts_jobs.id_job = contacts_persons.id_job ' +
                          'WHERE contacts_jobs.id_job = ' +
                          dataBuilder.point_25
                      ).then((result: any) => {
                        if (result.length > 0) {
                          dataBuilder.point_25 = result[0];
                        } else {
                          delete dataBuilder.point_25;
                        }
                        resolve(true);
                      });
                    } catch (err) {
                      delete dataBuilder.point_25;
                      reject();
                    }
                  })
                );
              }

              if (dataBuilder.point_26) {
                contactPromises.push(
                  new Promise((resolve, reject) => {
                    try {
                      db.loadData(
                        'SELECT contacts_jobs.name_job, contacts_persons.name, contacts_persons.surname, contacts_persons.id_person ' +
                          'FROM contacts_persons ' +
                          'LEFT JOIN contacts_jobs ON contacts_jobs.id_job = contacts_persons.id_job ' +
                          'WHERE contacts_persons.id_person = ' +
                          dataBuilder.point_26
                      ).then((result: any) => {
                        if (result.length > 0) {
                          dataBuilder.point_26 = result[0];
                        } else {
                          delete dataBuilder.point_26;
                        }
                        resolve(true);
                      });
                    } catch (err) {
                      delete dataBuilder.point_26;
                      reject();
                    }
                  })
                );
              }

              Promise.all(contactPromises)
                .then(() => resolve(true))
                .catch((error: any) => resolve(true));
            }
          })
      ),
      new Promise(resolve =>
        db
          .loadData('SELECT * FROM situations_points ORDER BY id_point ASC')
          .then((result: any) => {
            if (result.length > 0) {
              setPoints(result);
            }
            resolve(true);
          })
      ),
      new Promise(resolve =>
        db
          .loadData(
            'SELECT situations.id_situation, situations.point_3 AS name  ' +
              'FROM situations_related LEFT JOIN situations ON situations.id_situation = situations_related.id_related ' +
              'WHERE situations_related.id_situation = ' +
              situationID
          )
          .then((result: any) => {
            if (result.length > 0) {
              dataBuilder.point_24 = result;
            } else {
              delete dataBuilder.point_24;
            }
            resolve(true);
          })
      ),
      new Promise(resolve =>
        db
          .loadData(
            'SELECT contacts_jobs.name_job, contacts_persons.name, contacts_persons.surname, contacts_persons.id_person  ' +
              'FROM situations_functions ' +
              'LEFT JOIN contacts_jobs ON contacts_jobs.id_job = situations_functions.id_function ' +
              'LEFT JOIN contacts_persons ON contacts_persons.id_job = contacts_jobs.id_job ' +
              'WHERE situations_functions.id_situation = ' +
              situationID +
              ' AND contacts_jobs.id_job IS NOT NULL  ' +
              'ORDER BY contacts_jobs.poradi ASC, contacts_persons.surname ASC'
          )
          .then((result: any) => {
            if (result.length > 0) {
              dataBuilder.point_9 = result;
            } else {
              delete dataBuilder.point_9;
            }
            resolve(true);
          })
      )
    ])
      .then(() => {
        Object.entries(dataBuilder).map(([key, value]: any) => {
          if (value?.length === 0 || value === 'Invalid date' || value === '') {
            delete dataBuilder[key];
          }
        });
        setDetailData(dataBuilder);
      })
      .catch((error: any) => {
        console.error('error getData from DB', error);
      });
  };

  const handleShowViewLevelSheet = () => {
    ActionSheet.show(
      {
        options: [
          translate.get('situation-view-level_1'),
          translate.get('situation-view-level_2'),
          translate.get('situation-view-level_3'),
          translate.get('btn-cancel')
        ],
        cancelButtonIndex: 3,
        title: 'Možnosti zobrazení'
      },
      (buttonIndex: number) => {
        buttonIndex < 3 && setViewLevel(buttonIndex + 1);
      }
    );
  };

  const handleOpenContact = (id_person: number) => {
    navigation.navigate(CONTACTS_DETAIL, { id_person: id_person });
  };

  const handleOpenSituation = (id_situation: number) => {
    navigation.navigate(SITUATIONS_DETAIL, { situationID: id_situation });
  };

  return detailData ? (
    <ScrollView scrollIndicatorInsets={{ right: 1 }}>
      <View style={styles.container}>
        <Text style={AppStyles.detailTitle}>{detailData.point_3}</Text>
        {detailData.point_4 && detailData.point_4 !== '' && (
          <Text style={styles.description}>{detailData.point_4}</Text>
        )}
        {detailData.point_1 && viewLevel === 3 && (
          <DetailItem title={points[0].name_point} data={detailData.point_1} />
        )}
        {detailData.point_2 && viewLevel === 3 && (
          <DetailItem title={points[1].name_point} data={detailData.point_2} />
        )}
        {detailData.point_5 && (
          <DetailItem title={points[4].name_point} data={detailData.point_5} />
        )}
        {detailData.point_6 && (
          <DetailItem title={points[5].name_point} data={detailData.point_6} />
        )}
        {detailData.point_7 && (
          <DetailItem title={points[6].name_point} data={detailData.point_7} />
        )}
        {detailData.point_8 && viewLevel === 3 && (
          <DetailItem title={points[7].name_point} data={detailData.point_8} />
        )}
        {detailData?.point_9?.length > 0 && (
          <DetailItem
            title={points[8].name_point}
            type='contacts'
            data={detailData.point_9}
            onItemPress={handleOpenContact}
          />
        )}
        {detailData.point_10 && (
          <DetailItem title={points[9].name_point} data={detailData.point_10} />
        )}
        {detailData?.point_11?.length > 0 && (
          <DetailItem
            title={points[10].name_point}
            type='links'
            data={detailData.point_11}
          />
        )}
        {detailData.point_12 && (
          <DetailItem
            title={points[11].name_point}
            data={detailData.point_12}
          />
        )}
        {detailData.point_13 && (
          <DetailItem
            title={points[12].name_point}
            data={detailData.point_13}
          />
        )}
        {detailData?.point_14?.length > 0 && (
          <DetailItem
            title={points[13].name_point}
            type='texts'
            data={detailData.point_14}
          />
        )}
        {detailData.point_15 && (
          <DetailItem
            title={points[14].name_point}
            data={detailData.point_15}
          />
        )}
        {detailData?.point_16?.length > 0 && (
          <DetailItem
            title={points[15].name_point}
            type='texts'
            data={detailData.point_16}
          />
        )}
        {detailData?.point_17?.length > 0 && viewLevel !== 1 && (
          <DetailItem
            title={points[16].name_point}
            type='texts'
            data={detailData.point_17}
          />
        )}
        {detailData?.point_18?.length > 0 && viewLevel === 3 && (
          <DetailItem
            title={points[17].name_point}
            type='texts'
            data={detailData.point_18}
          />
        )}
        {detailData?.point_19 && viewLevel !== 1 && (
          <DetailItem
            title={points[18].name_point}
            data={detailData.point_19}
          />
        )}
        {detailData?.point_20 && viewLevel !== 1 && (
          <DetailItem
            title={points[19].name_point}
            data={detailData.point_20}
          />
        )}
        {detailData?.point_21?.length > 0 && viewLevel === 3 && (
          <DetailItem
            title={points[20].name_point}
            type='faq'
            data={detailData.point_21}
          />
        )}
        {detailData?.point_22?.length > 0 && viewLevel === 3 && (
          <DetailItem
            title={points[21].name_point}
            type='texts'
            data={detailData.point_22}
          />
        )}
        {detailData?.point_23?.length > 0 && viewLevel !== 1 && (
          <DetailItem
            title={points[22].name_point}
            type='texts'
            data={detailData.point_23}
          />
        )}
        {detailData?.point_24?.length > 0 && viewLevel !== 1 && (
          <DetailItem
            title={points[23].name_point}
            type='situations'
            data={detailData.point_24}
            onItemPress={handleOpenSituation}
          />
        )}
        {detailData.point_25 && viewLevel === 3 && (
          <DetailItem
            title={points[24].name_point}
            type='contacts'
            data={[detailData.point_25]}
            onItemPress={handleOpenContact}
          />
        )}
        {detailData.point_26 && viewLevel === 3 && (
          <DetailItem
            title={points[25].name_point}
            type='contacts'
            data={[detailData.point_26]}
            onItemPress={handleOpenContact}
          />
        )}
        {detailData.point_27 && viewLevel === 3 && (
          <DetailItem
            title={points[26].name_point}
            data={detailData.point_27}
          />
        )}
        {detailData.point_28 && (
          <DetailItem
            title={points[27].name_point}
            data={detailData.point_28}
          />
        )}
        {detailData.point_29 && (
          <DetailItem
            title={points[28].name_point}
            data={detailData.point_29}
          />
        )}
        {detailData.point30 && viewLevel === 3 && (
          <DetailItem
            title={points[29].name_point}
            data={detailData.point_30}
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
