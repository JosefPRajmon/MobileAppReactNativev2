import React, { useState, useEffect } from "react";
import * as Network from "expo-network";
import { WebView } from "react-native-webview";
import { StyleSheet, View, Text } from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { Colors, Metrics } from "../themes";
//import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';

export default function WebviewScreen({ route }: any) {
  const { env }: any = route.params;
  const [isConnected, setIsConnected] = useState<any>(false);

  /* useEffect(() => {
    (async () => {
      const { status } = await requestTrackingPermissionsAsync();
      if (status === 'granted') {
        console.log('Yay! I have user permission to track data');
      }
    })();
  }, []); */

  useEffect(() => {
    (async () => {
      const status = await Network.getNetworkStateAsync();
      setIsConnected(status.isConnected);
    })();
  }, []);

  console.log("Webview screen env", route);

  return isConnected ? (
    <WebView source={{ uri: env?.link }} />
  ) : (
    <View style={styles.container}>
      <Icon name="wifi-off" style={styles.icon} />
      <Text style={styles.text}>Není připojení k internetu</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
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
    fontWeight: "bold",
    marginTop: Metrics.margin.normal
  }
});
