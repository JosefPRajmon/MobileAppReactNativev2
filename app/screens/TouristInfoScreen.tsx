import React, { useEffect, useState } from 'react';
import { StyleSheet, RefreshControl, View } from 'react-native';
import { DatabaseProvider } from '../providers/DatabaseProvider';
import { Colors, Metrics } from '../themes';
import { ScrollView } from 'react-native-gesture-handler';
import { TouristInfoConfig } from '../config/modules/TouristInfo.config';
import { Toast } from "native-base";
import { useDispatch } from 'react-redux';
import { updateModules } from '../store/actions/ModulesActions';
import { translate } from '../services/translate.service';
import { NoDataSVG } from '../components/svg-componets/noData';
import DetailItem from '../components/detail/DetailItem';
import Swiper from 'react-native-swiper'
import { createThumbnailUrl } from '../util/helper';
import { WebView } from 'react-native-webview';
import { AppConfig } from '../config/App.config';

export default function TouristInfoScreen({ route, navigation }: any) {
  const db: any = DatabaseProvider.getInstance();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState<any | undefined>();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    db.loadData("SELECT * FROM tourist_info")
      .then((data: any) => {
        setData({
          img_ids: JSON.parse(data.img_ids),
          text: JSON.parse(data.text)
        })
        setRefreshing(false);
      })
      .catch((error: any) => {
        console.error("error getData from DB", error);
        setData(AppConfig.touristInfoData)
      });
  };

  const onRefresh = async () => {
    await setRefreshing(true);
    await dispatch(updateModules(TouristInfoConfig.moduleID));
    await getData();
    Toast.show({
      text: translate.get("toast-update-success"),
      type: "success",
      buttonText: "Ok",
      duration: 3000
    });
  };

  return data ? (
    <ScrollView
      scrollIndicatorInsets={{ right: 1 }}
    /* refreshControl={
      <RefreshControl
        title={translate.get("text-update-title")}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    } */
    >
      {<Swiper
        showsButtons={false}
        loop={true}
        dotColor={Colors.swiper.dot}
        activeDotColor={Colors.swiper.activeDot}
        height={Metrics.imageSwiper.height} >
        {data.img_ids.map((imgId: string) => {
          return (
            <View
              key={imgId}
              style={styles.slideContainer} >
              <WebView
                source={{ uri: createThumbnailUrl(Number(imgId), "swiper") }}
                style={styles.image} />
            </View>)
        })}
      </Swiper>}

      <View style={styles.container}>
        <DetailItem
          title={"Informace"}
          type="html"
          data={data.text} />
      </View>
    </ScrollView>
  )
    : <NoDataSVG />;
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
  slideContainer: {
    flex: 1,
    width: "100%",
    height: Metrics.imageSwiper.height
  },
  image: {
    flex: 1
  }
});
