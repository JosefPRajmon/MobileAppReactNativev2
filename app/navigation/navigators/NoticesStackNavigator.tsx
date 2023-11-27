import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderNavButton } from "../../components/header/HeaderNavButton";
import { translate } from "../../services/translate.service";
import { GlobalNavigationOptions } from "../GlobalNavigationOptions";
import NoticesListScreen from "../../screens/NoticesListScreen";
import { NOTICES_FILTER_MODAL, NOTICES_DETAIL } from "../ScreenNames";
import { NoticesFilterModal } from "../../modals/NoticesFilterModal";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabBarIcon } from "../../components/tabs/TabBarIcon";
import NoticesDetailTabScreen from "../../screens/NoticesDetailTabScreen";
import NoticesDetailMapTabScreen from "../../screens/NoticesDetailMapTabScreen";
import { NoticesConfig } from "../../config/modules/Notices.config";

const Notices = createStackNavigator();

export default function NoticesStackNavigator() {
  return (
    <Notices.Navigator>
      <Notices.Screen
        name={NoticesConfig.moduleID}
        component={NoticesListScreen}
        options={{
          ...GlobalNavigationOptions,
          //headerLeft: () => <HeaderNavButton type="menu" />,
          headerTitle: translate.get(NoticesConfig.title)
          //headerRight: () => (<ItemsVisibilityButton moduleID={BoardConfig.moduleID} />)
        }}
      />
      <Notices.Screen
        name={NOTICES_DETAIL}
        component={NoticesDetailTabsNavigator}
        options={{
          ...GlobalNavigationOptions,
          headerLeft: () => <HeaderNavButton type="back" />,
          headerTitle: translate.get(NoticesConfig.title),
          headerShow: false
        }}
      />
      <Notices.Screen
        name={NOTICES_FILTER_MODAL}
        component={NoticesFilterModal}
        options={{
          ...GlobalNavigationOptions,
          headerLeft: () => <HeaderNavButton type="back" />,
          headerTitle: "Filtrovat upozornění"
          //...ModalTransition
        }}
      />
    </Notices.Navigator>
  );
}

const NoticeDetail = createBottomTabNavigator();

function NoticesDetailTabsNavigator({ route }: any) {
  return (
    <NoticeDetail.Navigator
      initialRouteName="NoticesDetailTab"
      screenOptions={{
        ...GlobalNavigationOptions,
        headerShow: false
      }}
    >
      <NoticeDetail.Screen
        name={"NoticesDetailTab"}
        component={NoticesDetailTabScreen}
        initialParams={route.params.noticeData}
        options={({ route }) => ({
          title: translate.getUpperCase("tab-title-info"),
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="information-outline" color={color} />
          )
        })}
      />
      <NoticeDetail.Screen
        name="NoticesDetailMapTab"
        component={NoticesDetailMapTabScreen}
        initialParams={route.params.noticeData}
        options={({ route }) => ({
          title: translate.getUpperCase("tab-title-map"),
          tabBarIcon: ({ color }) => <TabBarIcon name="map" color={color} />
        })}
      />
    </NoticeDetail.Navigator>
  );
}
