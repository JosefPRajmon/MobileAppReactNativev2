import React from 'react';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from 'native-base';
import { AppStyles, Colors, Metrics } from '../themes';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { AppConfig } from '../config/App.config';
import { As4uLogo } from '../themes/Images';
import { SumperkGDPR } from '../components/gdpr/SumperkGDPR';
import { ButtonMenu } from '../components/header/ButtonMenu';

export default function AboutAppScreen({ navigation }: any) {
  const handleOpenLink = (link: string) => {
    WebBrowser.openBrowserAsync(link);
  };

    return (
        <View>
            <ButtonMenu navigation={navigation}
        />
            <ScrollView scrollIndicatorInsets={{ right: 1 }}>
                <View>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <As4uLogo
            width={Metrics.screenDims.width * 0.8}
            height={Math.floor(((Metrics.screenDims.width * 0.8) / 20) * 6)}
          />
        </View>
        <View style={styles.title}>
          <Text style={AppStyles.detailItemTitle}>
            {AppConfig.aboutApp.appName}
          </Text>
        </View>
        <View style={styles.textContainerSpace}>
          <Text style={[styles.itemTitle, styles.itemTitleSingle]}>Verze</Text>
          <Text style={styles.itemSubtitle}>{Constants.nativeAppVersion}</Text>
        </View>
        <View style={styles.textContainerSpace}>
          <Text style={[styles.itemTitle, styles.itemTitleSingle]}>
            Publikováno
          </Text>
          <Text style={styles.itemSubtitle}>
            {AppConfig.aboutApp.buildDate}
          </Text>
        </View>
        <View style={styles.title}>
          <Text style={AppStyles.detailItemTitle}>Kontakt na vývojáře</Text>
        </View>
        <TouchableOpacity
          style={styles.buttonItemContainer}
          onPress={() =>
            WebBrowser.openBrowserAsync(AppConfig.aboutApp.developerWeb.link)
          }
        >
          <View style={styles.textContainer}>
            <Text style={styles.itemSubtitle}>WEB</Text>
            <Text style={styles.itemTitle}>
              {AppConfig.aboutApp.developerWeb.pretty}
            </Text>
          </View>
          <View style={styles.iconContainer}>
            <Icon
              style={styles.icon}
              size={Metrics.icon.normal}
              name='link-variant'
              color={Colors.listItemIcon}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonItemContainer}
          onPress={() =>
            Linking.openURL('mailto:' + AppConfig.aboutApp.developerEmail)
          }
        >
          <View style={styles.textContainer}>
            <Text style={styles.itemSubtitle}>EMAIL</Text>
            <Text style={styles.itemTitle}>
              {AppConfig.aboutApp.developerEmail}
            </Text>
          </View>
          <View style={styles.iconContainer}>
            <Icon
              style={styles.icon}
              size={Metrics.icon.normal}
              name='email'
              color={Colors.listItemIcon}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.title}>
          <Text style={AppStyles.detailItemTitle}>
            {AppConfig.aboutTown.title}
          </Text>
        </View>
        <View style={styles.textContainerSpace}>
          <Text style={[styles.itemTitle, styles.itemTitleSingle]}>Adresa</Text>
          <Text style={styles.itemSubtitle}>{AppConfig.aboutTown.address}</Text>
        </View>
        {AppConfig.aboutTown.email && (
          <TouchableOpacity
            style={styles.buttonItemContainer}
            onPress={() =>
              Linking.openURL('mailto:' + AppConfig.aboutTown.email)
            }
          >
            <View style={styles.textContainer}>
              <Text style={styles.itemSubtitle}>EMAIL</Text>
              <Text style={styles.itemTitle}>{AppConfig.aboutTown.email}</Text>
            </View>
            <View style={styles.iconContainer}>
              <Icon
                style={styles.icon}
                size={Metrics.icon.normal}
                name='email'
                color={Colors.listItemIcon}
              />
            </View>
          </TouchableOpacity>
        )}
        {AppConfig.aboutTown.phone && (
          <TouchableOpacity
            style={styles.buttonItemContainer}
            onPress={() =>
              Linking.openURL(
                'tel:' + AppConfig.aboutTown.phone.replace(/ /g, '')
              )
            }
          >
            <View style={styles.textContainer}>
              <Text style={styles.itemSubtitle}>TELEFON</Text>
              <Text style={styles.itemTitle}>{AppConfig.aboutTown.phone}</Text>
            </View>
            <View style={styles.iconContainer}>
              <Icon
                style={styles.icon}
                size={Metrics.icon.normal}
                name='phone'
                color={Colors.listItemIcon}
              />
            </View>
          </TouchableOpacity>
        )}
        {AppConfig.aboutTown.web && (
          <TouchableOpacity
            style={styles.buttonItemContainer}
            onPress={() =>
              WebBrowser.openBrowserAsync(AppConfig.aboutTown.web.link)
            }
          >
            <View style={styles.textContainer}>
              <Text style={styles.itemSubtitle}>WEB</Text>
              <Text style={styles.itemTitle}>
                {AppConfig.aboutTown.web.pretty}
              </Text>
            </View>
            <View style={styles.iconContainer}>
              <Icon
                style={styles.icon}
                size={Metrics.icon.normal}
                name='link-variant'
                color={Colors.listItemIcon}
              />
            </View>
          </TouchableOpacity>
        )}
        {AppConfig.aboutTown.gdpr && (
          <TouchableOpacity
            style={styles.buttonItemContainer}
            onPress={() =>
              WebBrowser.openBrowserAsync(AppConfig.aboutTown.gdpr.link)
            }
          >
            <View style={styles.textContainer}>
              <Text style={styles.itemSubtitle}>WEB</Text>
              <Text style={styles.itemTitle}>
                {AppConfig.aboutTown.gdpr.pretty}
              </Text>
            </View>
            <View style={styles.iconContainer}>
              <Icon
                style={styles.icon}
                size={Metrics.icon.normal}
                name='link-variant'
                color={Colors.listItemIcon}
              />
            </View>
          </TouchableOpacity>
        )}
        {AppConfig.showGDPRAboutApp &&
                        AppConfig.appID === 'cz.as4u.mmvm.sumperk' && <SumperkGDPR />}


                    </View>
                    <View style={{ height: 50, }}>
                    </View>
                </View>                    
            </ScrollView>

        </View>
  );
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
        borderRadius:15
    
  },
  logoContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: Metrics.margin.normal
  },
  title: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.detailItemBorder,
    marginTop: Metrics.margin.big
  },
  buttonItemContainer: {
    flexDirection: 'row',
    alignContent: 'space-between',
    padding: Metrics.padding.small,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.listItemSeparator
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'flex-start',
    color: Colors.text.defaultText
  },
  textContainerSpace: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    color: Colors.text.defaultText,
    padding: Metrics.padding.small,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.listItemSeparator
  },
  iconContainer: {
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center'
  },
  itemTitle: {
    fontSize: Metrics.font.text,
    fontWeight: 'bold',
    marginBottom: Metrics.margin.tinny,
    color: Colors.text.defaultText
  },
  itemTitleSingle: { marginBottom: 0 },
  itemSubtitle: {
    fontSize: Metrics.font.text,
    color: Colors.text.defaultText
  },
  icon: {
    paddingLeft: Metrics.padding.small
  }
});
