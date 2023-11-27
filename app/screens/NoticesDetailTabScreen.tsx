import React, { useEffect, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import moment from 'moment';
import { StyleSheet } from 'react-native';
import { View, Text } from "native-base";
import { AppStyles, Colors, Metrics } from '../themes';
import DetailItem from '../components/detail/DetailItem';
import { ScrollView } from 'react-native-gesture-handler';

export default function NoticesDetailTabScreen({ route }: any) {
  const [detailData, setDetailData] = useState<any | undefined>();

  useEffect(() => {
    setDetailData(route.params);
  }, []);

  /* const handleOpenLink = () => {
    const link = AppConfig.domainUrl + BoardConfig.detailUrl + detailData.id_notice;
    WebBrowser.openBrowserAsync(link);
  } */

  return detailData ? (
    <ScrollView scrollIndicatorInsets={{ right: 1 }}>
      <View style={styles.container}>
        <Text style={AppStyles.detailTitle}>{detailData.name}</Text>
        {detailData.description && <DetailItem
          title={"Informace"}
          data={detailData.description} />}
        {detailData.date_from &&
          <DetailItem
            title={"Trvání"}
            data={moment(detailData?.date_from).format('D.M.YYYY') + " - " + moment(detailData?.date_to).format('D.M.YYYY')} />}
        <DetailItem
          title={"Kategorie"}
          data={detailData.type_name} />
        {/* <MainButton
          text={"Zobrazit na webu"}
          iconType="MaterialCommunityIcons"
          iconName="web"
          onButtonPress={handleOpenLink} /> */}
      </View>
    </ScrollView>
  )
    : null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
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
    width: '80%',
  },
});
