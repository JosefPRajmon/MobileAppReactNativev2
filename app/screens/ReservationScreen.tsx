import React, { useState, useEffect } from 'react';
import * as Network from 'expo-network';
import { WebView } from 'react-native-webview';
import { StyleSheet, View, Text } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { Colors, Metrics } from '../themes';
import { AppConfig, AppModules } from '../config/App.config';
import { ReservationConfig } from '../config/modules/Reservation.config';
import { useSelector, useDispatch } from 'react-redux';
import cuid from 'cuid';
import { SET_UUID } from '../store/actions/actionTypes';

export default function ReservationScreen() {
  const dispatch = useDispatch();
  const [url, setUrl] = useState('');
  const [isConnected, setIsConnected] = useState<any>(false);
  const uuid = useSelector((state: any) => {
    if (!state?.settings?.uuid) {
      const uuid = cuid();

      dispatch({
        type: SET_UUID,
        payload: uuid
      });

      return uuid;
    } else {
      return state.settings.uuid;
    }
  });

  useEffect(() => {
    (async () => {
      const status = await Network.getNetworkStateAsync();
      setIsConnected(status.isConnected);
    })();
  }, []);

  useEffect(() => {
    let url = AppConfig.domainUrl;

    if (
      AppModules.reservation?.env?.sbsapp &&
      AppModules.reservation?.env?.portal
    ) {
      url +=
        ReservationConfig.reservationUrl
          .replace('sbsapp=', 'sbsapp=' + AppModules.reservation.env.sbsapp)
          .replace('portal=', 'portal=' + AppModules.reservation.env.portal) +
        '&uuid=' +
        uuid;
    }

    setUrl(url);
  }, []);

  return isConnected ? (
    <WebView source={{ uri: url }} />
  ) : (
    <View style={styles.container}>
      <Icon name='wifi-off' style={styles.icon} />
      <Text style={styles.text}>Není připojení k internetu</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Metrics.padding.normal,
    backgroundColor: Colors.appBackround,
    paddingBottom: Metrics.padding.big
  },
  icon: {
    fontSize: Metrics.icon.screen,
    color: Colors.noData
  },
  text: {
    fontSize: Metrics.font.screen,
    color: Colors.main,
    fontWeight: 'bold',
    marginTop: Metrics.margin.normal
  }
});
