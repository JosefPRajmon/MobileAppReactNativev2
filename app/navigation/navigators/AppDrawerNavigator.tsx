import React from "react";
import Constants from "expo-constants";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Platform,
  ScrollView
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AppConfig, AppModule, AppModules } from "../../config/App.config";
import { Colors, Fonts, Metrics } from "../../themes";
import { MmvmIcon as Icon } from "../../themes/Fonts";
import { DrawerItem } from "@react-navigation/drawer";
import { translate } from "../../services/translate.service";
import HomeStackNavigator from "./HomeStackNavigator";
import { TownLogo } from "../../themes/Images";
import { useDispatch, useSelector } from "react-redux";
import { SET_FOCUSED_ROUTE } from "../../store/actions/actionTypes";
import { DrawerActions, StackActions } from "@react-navigation/native";
import cuid from "cuid";
import { normalize } from "../../themes/Metrics";

const Drawer = createDrawerNavigator();

export default function AppDrawerNavigator({ navigation }: any, props: any) {
  return (
    <Drawer.Navigator
      initialRouteName={
        AppConfig.useHomeScreen ? "Home" : AppConfig.initialModule
      }
      defaultStatus={AppConfig.openDrawerStartup ? "open" : "closed"}
      screenOptions={{ headerShown: false }}
      drawerType="front"
      drawerContent={props => <NavigationDrawer {...props} />}
    >
      {AppConfig.useHomeScreen && (
        <Drawer.Screen
          name="Home"
          component={HomeStackNavigator}
          options={{
            swipeEnabled: false
          }}
        />
      )}
      {Object.entries(AppModules).map(([moduleID, module]: any) => (
        <Drawer.Screen
          key={moduleID}
          name={moduleID}
          component={module.navigator}
        />
      ))}
      {/* AppConfig.menuItems.map((category: any) => {
        return category.items.map((item: any) => {
          return (
            <Drawer.Screen
              key={item.pageID || item.module.config.moduleID}
              name={item.pageID || item.module.config.moduleID}
              component={item.module.navigator}
            />
          );
        });
      }) */}
    </Drawer.Navigator>
  );
}

function NavigationDrawer({ navigation }: any) {
  const dispatch = useDispatch();
  const { pageID } = useSelector((state: any) => state.nav);

  function goTo(moduleID: string, pageID: string, params?: any) {
    console.log("Home", moduleID, moduleID === "Home", params);
    if (moduleID === "Home" && !AppConfig.useHomeScreen) {
      return;
    }

    dispatch({
      type: SET_FOCUSED_ROUTE,
      payload:
        moduleID === "Home"
          ? { moduleID: "Home", pageID: "Home", params: undefined }
          : { moduleID: moduleID, pageID: pageID, params: params }
    });

    navigation.dispatch(
      //StackActions.replace(moduleID, params)
      DrawerActions.jumpTo(moduleID, params)
    );
  }

  const renderItems = () => {
    return AppConfig.menuItems.map((category: any, index: number) => (
      <View key={cuid()}>
        {AppConfig.useMenuCategories && (
          <DrawerItem
            key={category.title}
            focused={false}
            label={({ color }) => (
              <Text style={[styles.menuCategoryItemLabel, { color: color }]}>
                {translate.get(category.title)}
              </Text>
            )}
            style={[styles.menuCategoryItem]}
            activeTintColor={Colors.navDrawer.categoryText}
            inactiveTintColor={Colors.navDrawer.categoryText}
            activeBackgroundColor={Colors.navDrawer.menuBg}
            inactiveBackgroundColor={Colors.navDrawer.menuBg}
            onPress={() => null}
          />
        )}
        {category.items.map((item: any) => (
          <DrawerItem
            key={cuid()}
            focused={
              pageID === item.pageID || pageID === item.module.config.moduleID
            }
            label={({ color }) => (
              <Text style={[styles.menuListItemText, { color }]}>
                {translate.get(item.title || item.module.config.title)}
              </Text>
            )}
            style={styles.menuListItem}
            activeTintColor={Colors.navDrawer.itemTextActive}
            inactiveTintColor={Colors.navDrawer.itemTextInactive}
            activeBackgroundColor={Colors.navDrawer.itemBgActive}
            inactiveBackgroundColor={Colors.navDrawer.itemBgInactive}
            icon={({ color, focused }: any) => (
              <Icon
                name={item.iconName || item.module.config.icon.name}
                color={
                  focused
                    ? Colors.navDrawer.itemIconActive
                    : Colors.navDrawer.itemIconInactive
                }
                size={24}
              />
            )}
            onPress={() =>
              goTo(
                item.module.config.moduleID,
                item?.pageID || item.module.config.moduleID,
                {
                  config: item.module.config,
                  title: item.title || item.module.config.title,
                  icon: item.iconName || item.module.config.icon.name,
                  env: item?.env || item.module?.env,
                  hkatID: item?.hkatID,
                  skatID: item?.skatID,
                  disableCatFilter: item?.disableCatFilter
                }
              )
            }
          />
        ))}
      </View>
    ));
  };

  return (
    <View style={styles.drawerScreenContainer}>
      <View style={styles.container}>
        <DrawerItem
          key="Home"
          focused={false}
          label={({ color }) => (
            <View
              style={[
                styles.logoContainer,
                Platform.OS === "ios" && {
                  marginTop: Constants.statusBarHeight
                }
              ]}
            >
              <TownLogo
                width="100%"
                height="50px"
                appID={AppConfig.appID}
                type={AppConfig.drawerLogo}
              />
            </View>
          )}
          style={styles.menuHeader}
          //labelStyle={styles.menuListItemLabel}
          activeTintColor={Colors.navDrawer.headerText}
          activeBackgroundColor={Colors.navDrawer.headerBg}
          inactiveBackgroundColor={Colors.navDrawer.headerBg}
          inactiveTintColor={Colors.navDrawer.headerText}
          onPress={() => goTo("Home")}
        />
        <ScrollView style={styles.scrollContainer}>{renderItems()}</ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerScreenContainer: {
    flex: 1,
    flexDirection: "column",
    height: "100%"
  },
  container: {
    zIndex: 1,
    flex: 1,
    backgroundColor: Colors.navDrawer.menuBg
  },
  logoContainer: {
    width: "100%",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: Metrics.margin.normal
  },
  menuHeader: {
    borderBottomWidth: 1,
    borderRadius: 0,
    borderColor: Colors.navDrawer.itemsBorderColor,
    marginVertical: 0,
    marginHorizontal: 0
  },
  scrollContainer: {
    top: 0
  },
  noLogo: {
    borderBottomWidth: 0,
    margin: 0,
    padding: 0
  },
  menuCategoryItem: {
    borderBottomWidth: 1,
    borderRadius: 0,
    borderColor: Colors.navDrawer.itemsBorderColor,
    marginVertical: 0,
    marginHorizontal: 0,
    paddingHorizontal: Metrics.padding.small,
    paddingTop: Metrics.padding.big,
    paddingBottom: 0
  },
  menuCategoryItemLabel: {
    fontSize: Metrics.font.title,
    fontWeight: "bold"
  },
  menuListItem: {
    borderBottomWidth: 1,
    borderRadius: 0,
    borderColor: Colors.navDrawer.itemsBorderColor,
    marginVertical: 0,
    marginHorizontal: 0,
    paddingHorizontal: Metrics.padding.small,
    paddingVertical: Metrics.padding.micro
  },
  menuListItemText: {
    fontSize: Metrics.font.subtitle,
    fontWeight: "bold",
    marginLeft: 0
  }
});
