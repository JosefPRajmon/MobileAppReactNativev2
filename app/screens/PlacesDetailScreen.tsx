import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from "native-base";
import { DatabaseProvider } from '../providers/DatabaseProvider';
import { AppStyles, Colors, Metrics } from '../themes';
import DetailItem from '../components/detail/DetailItem';
import { ScrollView } from 'react-native-gesture-handler';

export default function PlacesDetailScreen({ route, navigation }: any) {
  const db: any = DatabaseProvider.getInstance();
  const { id_place, name_skat } = route.params;
  const [detailData, setDetailData] = useState<any | undefined>();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    db.loadData("SELECT name, description, full_text, mail, phone, link, address, lat, lng " +
      "FROM places " +
      "WHERE places.id_place = " + id_place)
      .then((result: any) => {
        const data: any = result[0];
        const { mail, phone, link } = data;
        let contacts: any = [];

        if (mail !== "[]") {
          JSON.parse(data.mail).map((email: string) => {
            contacts.push({ email: email });
          });
        }
        if (phone !== "[]") {
          JSON.parse(data.phone).map((phone: string) => {
            contacts.push({ number: phone });
          });
        }
        if (link !== "[]") {
          JSON.parse(data.link).map((link: string) => {
            contacts.push({ link: link });
          });
        }

        setDetailData({
          name: data.name,
          address: data.address,
          description: data.description,
          text: data.full_text,
          contacts: contacts
        });
      })
  };

  return detailData ? (
    <ScrollView scrollIndicatorInsets={{ right: 1 }}>
      <View style={styles.container}>
        <Text style={AppStyles.detailTitle}>{detailData.name}</Text>
        {detailData.description !== "" && <Text style={styles.description}>{detailData.description}</Text>}
        <DetailItem
          title={"Kategorie"}
          data={name_skat} />
        <DetailItem
          title={"Adresa"}
          data={detailData.address} />
        {detailData.contacts.length > 0 && <DetailItem
          type="email-phone-link"
          title={"Kontakty"}
          data={detailData.contacts} />}
        {detailData.text !== "<p><br /></p>" && <DetailItem
          type={"html"}
          title={"Popis"}
          data={detailData.text} />}
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
