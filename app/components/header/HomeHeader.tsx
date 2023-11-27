import React from 'react';
import Constants from 'expo-constants';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform
} from 'react-native';
import { Colors, Metrics } from '../../themes';
import { TownLogo } from '../../themes/Images';
import { AppConfig } from '../../config/App.config';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { handleCallPhone } from '../../util/helper';
import { normalize } from '../../themes/Metrics';

export function HomeHeader(props: any) {
  const renderPhoneButton = () => {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleCallPhone(AppConfig.aboutTown.phone)}
      >
        <View style={styles.buttonIcon}>
          <Icon
            size={Metrics.icon.normal}
            name={'phone'}
            color={Colors.dashBoard.headerPhoneIcon}
          />
        </View>
        <View style={styles.buttonText}>
          <View style={styles.buttonTextInner}>
            <Text style={styles.phone}>{AppConfig.aboutTown.phone}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderAddress = () => {
    return <Text style={styles.address}>{AppConfig.aboutTown.address}</Text>;
  };

  return (
    <View
      style={[
        styles.container,
        Platform.OS === 'ios' && { marginTop: Constants.statusBarHeight }
      ]}
    >
      <View style={styles.logoContainer}>
        <TownLogo
          width='90%'
          height='100%'
          appID={AppConfig.appID}
          type={AppConfig.homeScreenLogo}
        />
      </View>
      {AppConfig.homeScreenHeaderInfoAsRow ? (
        <View style={styles.infoContainerRow}>
          {/*renderPhoneButton()*/}
          {/*renderAddress()*/}
        </View>
      ) : (
        <View style={styles.infoContainerColumn}>
          {/*renderAddress()*/}
          {/*renderPhoneButton()*/}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 165,
    backgroundColor: "white",
    paddingHorizontal: Metrics.padding.big,
        paddingVertical: Metrics.margin.tinny,
        padding: "5%"
  },
  logoContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  infoContainerColumn: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Metrics.margin.small
  },
  infoContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Metrics.margin.normal
  },
  address: {
    textAlign: 'right',
    marginTop: Metrics.margin.normal,
    marginBottom: Metrics.margin.normal,
    color: Colors.dashBoard.headerAddressText,
    fontSize: Metrics.font.text
  },
  button: {
    flexDirection: 'row'
  },
  buttonIcon: {
    zIndex: 2,
    height: 35,
    width: 35,
    backgroundColor: Colors.dashBoard.headerPhoneIconBg,
    borderRadius: 35,
    padding: 4,
    borderWidth: 1,
    borderColor: Colors.dashBoard.headerPhoneIconBorder
  },
  buttonText: {
    zIndex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 35,
    marginLeft: -6
  },
  buttonTextInner: {
    borderWidth: 1,
    borderColor: Colors.dashBoard.headerPhoneTextBorder,
    backgroundColor: Colors.dashBoard.headerPhoneTextBg,
    borderTopRightRadius: Metrics.radius.normal,
    borderBottomRightRadius: Metrics.radius.normal
  },
  phone: {
    color: Colors.dashBoard.headerPhoneText,
    fontSize: Metrics.font.subtitle,
    paddingVertical: 3,
    paddingHorizontal: Metrics.padding.normal
  }
});
