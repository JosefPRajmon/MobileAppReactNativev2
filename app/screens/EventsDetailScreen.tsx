import React, { useEffect, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, Image, Dimensions } from 'react-native';
import { View, Text } from 'native-base';
import { DatabaseProvider } from '../providers/DatabaseProvider';
import { AppStyles, Colors, Metrics } from '../themes';
import DetailItem from '../components/detail/DetailItem';
import { ScrollView } from 'react-native-gesture-handler';
import { MainButton } from '../components/MainButton';
import { createThumbnailUrl } from '../util/helper';

export default function EventsDetailScreen({ route }: any) {
  const db: any = DatabaseProvider.getInstance();
  const [detailData, setDetailData] = useState<any | undefined>();
  const [image, setImage] = useState<any | undefined>();

  useEffect(() => {
    const imageUri: any = createThumbnailUrl(
      route.params.eventData.id_thumb,
      'detail'
    );
    if (imageUri) {
      Image.getSize(imageUri, (width, height) => {
        setImage({
          uri: imageUri,
          width: Math.floor(width / Metrics.screenDims.scale),
          height: Math.floor(height / Metrics.screenDims.scale)
        });
      });
    }

    setDetailData(route.params.eventData);
  }, []);

  const handleOpenLink = () => {
    let href: string =
      detailData.link.indexOf('http') === -1
        ? (detailData.link = 'http://' + detailData.link)
        : detailData.link;
    WebBrowser.openBrowserAsync(href);
  };

  console.log('Link', detailData?.link);

  return detailData ? (
    <ScrollView scrollIndicatorInsets={{ right: 1 }}>
      <View style={styles.container}>
        <Text style={AppStyles.detailTitle}>{detailData.name}</Text>
        {image && (
          <Image
            source={{ uri: image.uri }}
            style={[styles.image, { height: image.height }]}
          />
        )}
        <DetailItem title={'Místo konání'} data={detailData.place} />
        <DetailItem title={'Datum konání'} data={detailData.pretty} />
        <DetailItem title={'Typ akce'} data={detailData.name_type} />
        <DetailItem title={'Pořadatel'} data={detailData.organizer} />
        <DetailItem
          title={'Podrobný popis'}
          type='html'
          data={detailData.description}
        />
        {detailData.link && (
          <MainButton
            text={'Více na webu'}
            iconType='MaterialCommunityIcons'
            iconName='web'
            onButtonPress={handleOpenLink}
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
  },
  image: {
    flex: 1,
    width: '100%',
    height: Math.floor((Metrics.screenDims.width / 4) * 3),
    borderRadius: Metrics.images.borderRadius,
    marginTop: Metrics.margin.normal
  }
});
