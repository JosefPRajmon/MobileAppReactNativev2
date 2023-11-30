import React, { useEffect, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import moment from 'moment';
import { StyleSheet } from 'react-native';
import { View, Text } from 'native-base';
import { AppStyles, Colors, Metrics } from '../themes';
import DetailItem from '../components/detail/DetailItem';
import { ScrollView } from 'react-native-gesture-handler';
import { MainButton } from '../components/MainButton';
import { AppConfig, AppModules } from '../config/App.config';
import { BoardConfig } from '../config/modules/Board.config';

export default function BoardDetailScreen({ route }: any) {
  const [detailData, setDetailData] = useState<any | undefined>();

  useEffect(() => {
    setDetailData(route.params.boardData);
  }, []);

  const handleOpenLink = () => {
    const link =
      AppConfig.domainUrl +
      BoardConfig.detailUrl
        .replace('clanek=', 'clanek=' + AppModules.board.env.clanek)
        .replace('slozka=', 'slozka=' + AppModules.board.env.slozka) +
      detailData.id_notice;

    WebBrowser.openBrowserAsync(link);
  };

  return detailData !== undefined ? (
    <ScrollView scrollIndicatorInsets={{ right: 1 }}>
      <View style={styles.container}>
        <Text style={AppStyles.detailTitle}>{detailData.title.replace("\\&quot;","").replace("\\&quot;","")}</Text>
        <DetailItem
          title={'Den vystavení'}
          data={moment(detailData.date_from).format('D.M.YYYY')}
        />
        <DetailItem
          title={'Den stažení'}
          data={moment(detailData.date_to).format('D.M.YYYY')}
        />
        <DetailItem title={'Číslo evidenční'} data={detailData.evidence_no} />
        <DetailItem title={'Číslo jednací'} data={detailData.reference_no} />
        <DetailItem title={'Typ oznámení'} data={detailData.type_name} />
        <DetailItem title={'Zdroj oznámení'} data={detailData.source_name} />
        <MainButton
          text={'Celé oznámení'}
          iconType='MaterialCommunityIcons'
          iconName='link-variant'
          onButtonPress={handleOpenLink}
        />
      </View>
    </ScrollView>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: Metrics.padding.normal,
    backgroundColor: Colors.appBackround,
        paddingBottom: Metrics.padding.big,
        margin: "5%",
        borderRadius: 10
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
