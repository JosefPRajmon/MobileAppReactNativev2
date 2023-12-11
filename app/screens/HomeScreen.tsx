import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import { Colors, Metrics } from "../themes";
import { MmvmIcon as Icon } from "../themes/Fonts";
import { translate } from "../services/translate.service";
import { HomeHeader } from "../components/header/HomeHeader";
import { useDispatch } from "react-redux";
import { SET_FOCUSED_ROUTE } from "../store/actions/actionTypes";
import { AppConfig } from "../config/App.config";
import cuid from "cuid";
import { normalize } from "../themes/Metrics";
import { IconsLoader } from "../themes/Images";
import * as WebBrowser from 'expo-web-browser';

export default function HomeScreen({ navigation }: any) {

      const dispatch = useDispatch();
  const [cardWidth, setCardWidth] = useState<number>(
    Math.floor(
      Metrics.screenDims.width / Metrics.homeCardsCount -
        Metrics.padding.normal * Metrics.homeCardsCount
    )
  );

  const onLayout = (e: any) => {
    const dim = Math.floor(
      Metrics.screenDims.width / Metrics.homeCardsCount -
        Metrics.padding.normal * Metrics.homeCardsCount
    );
    setCardWidth(dim);
  };

  const getModules: any = () => {
    let modules: any = [];
    AppConfig.menuItems.map((category: any) => {
      category.items.map((item: any) =>
        modules.push({
          moduleID: item.module.config.moduleID,
          pageID: item?.pageID || item.module.config.moduleID,
          config: item.module.config,
          title: item.title || item.module.config.title,
          icon: item.iconName || item.module.config.icon.name,
          env: item?.env || item.module?.env,
          hkatID: item?.hkatID,
          skatID: item?.skatID,
          disableCatFilter: item?.disableCatFilter
        })
      );
    });
    return modules;
  };

    const renderCard = ({ item }: any) => {
        console.log(item.moduleID );
    return (
      <TouchableOpacity
        onPress={() => {
          goTo(item.moduleID, item);
        }}
        activeOpacity={0.7}
      >
            <View style={[styles.itemContainer, { height: cardWidth }]}>
                
                <IconsLoader page={item.moduleID} style={{ width: '40%', height: '40%', margin:"10%" }} />
                
          <Text
            style={[styles.itemName, { color: Colors.dashBoard.cardTitle }]}
          >
            {translate.get(item.title)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

     const goTo = async (moduleID: string, params: any) => {
        if (moduleID == "notices") {
            if (AppConfig.appID === "cz.as4u.mmvm.litovel") {
           
                await WebBrowser.openBrowserAsync("https://www.litovel.eu/cs/urad/uredni-deska/aktualni-informace/souhrnne-informace-o-odpadech/")
                return;
            }
        }
        console.log("test2")
    dispatch({
      type: SET_FOCUSED_ROUTE,
      payload: { moduleID: moduleID, pageID: params.pageID, params: params }
    });
    navigation.navigate(moduleID, params);
  };

  return (
    <View style={styles.container}>
      <HomeHeader />
      <View onLayout={onLayout} style={styles.gridContainer}>
        <FlatGrid
          keyExtractor={() => cuid()}
          scrollIndicatorInsets={{ right: 1 }}
          itemDimension={cardWidth}
          data={getModules()}
          style={styles.gridView}
          renderItem={renderCard}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: Colors.dashBoard.headerBg
  },
  gridContainer: {
    flex: 1,
    paddingHorizontal: Metrics.padding.small,
    backgroundColor: Colors.dashBoard.screenBg,
    paddingBottom: 0
  },
  gridView: {
    paddingVertical: Metrics.padding.big
  },
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    borderRadius: Metrics.radius.small,
    backgroundColor: Colors.dashBoard.cardBg,
    padding: Metrics.padding.small
  },
  styleIcon: {
    marginBottom: Metrics.margin.big
  },
  itemName: {
    fontSize: Metrics.font.title,
    fontWeight: "600",
    textAlign: "center"
    },
    svgIconsStyle: {
        height:"100%"
    }
});
