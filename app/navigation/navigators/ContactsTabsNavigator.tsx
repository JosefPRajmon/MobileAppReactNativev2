import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderNavButton } from "../../components/header/HeaderNavButton";
import ContactsAlphabetTabScreen from "../../screens/ContactsAlphabetTabScreen";
import { translate } from "../../services/translate.service";
import { GlobalNavigationOptions } from "../GlobalNavigationOptions";
import ContactsDepartmentsTabScreen from "../../screens/ContactsDepartmentsTabScreen";
import { TabBarIcon } from "../../components/tabs/TabBarIcon";
import { CONTACTS_DETAIL, SITUATIONS_DETAIL } from "../ScreenNames";
import ContactsDetailScreen from "../../screens/ContactsDetailScreen";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import SituationsDetailScreen from "../../screens/SituationsDetailScreen";
import { ContactsConfig } from "../../config/modules/Contacts.config";
import { SituationsConfig } from "../../config/modules/Situations.config";

const Contacts = createBottomTabNavigator();

export default function ContactsTabsNavigator() {
  return (
    <Contacts.Navigator
      initialRouteName="DepartmentsTab"
      screenOptions={{
        ...GlobalNavigationOptions,
        headerShown: false
      }}
    >
      <Contacts.Screen
        name={"DepartmentsTab"}
        component={DepartmentsNavigator}
        options={({ route }) => ({
          title: translate.getUpperCase("tab-title-departments"),
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="office-building" color={color} />
          ),
          tabBarStyle: {
            ...GlobalNavigationOptions.tabBarStyle,
            display: getTabBarVisibility(route) ? "none" : "none"
          }
        })}
      />
      <Contacts.Screen
        name="AlphabetTab"
        component={AlphabetNavigator}
        options={({ route }) => ({
          title: translate.getUpperCase("tab-title-alphabet"),
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="alphabetical" color={color} />
          ),
          tabBarStyle: {
            ...GlobalNavigationOptions.tabBarStyle,
            display: getTabBarVisibility(route) ? "none" : "none"
          }
        })}
      />
    </Contacts.Navigator>
  );
}

const getTabBarVisibility = (route: any) => {
  const moduleID = getFocusedRouteNameFromRoute(route);

  if (moduleID === CONTACTS_DETAIL || moduleID === SITUATIONS_DETAIL) {
    console.log("Hide tab bar");
    return false;
  }

  return true;
};

const AlphabetStack = createStackNavigator();

function AlphabetNavigator() {
  return (
    <AlphabetStack.Navigator>
      <AlphabetStack.Screen
        name="AlphabetScreen"
        component={ContactsAlphabetTabScreen}
        options={{
          ...GlobalNavigationOptions,
          headerLeft: () => <HeaderNavButton type="menu" />,
          headerTitle: translate.get(ContactsConfig.title)
          //headerShown: getHeaderShown(route)
        }}
      />

      <AlphabetStack.Screen
        name={SITUATIONS_DETAIL}
        component={SituationsDetailScreen}
        options={{
          ...GlobalNavigationOptions,
          headerLeft: () => <HeaderNavButton type="back" />,
          headerTitle: translate.get(SituationsConfig.title)
        }}
      />
    </AlphabetStack.Navigator>
  );
}

const DepartmentsStack = createStackNavigator();

function DepartmentsNavigator() {
  return (
    <DepartmentsStack.Navigator >
      <DepartmentsStack.Screen
        name="DepartmentsScreen"
        component={ContactsDepartmentsTabScreen}
        options={{
          ...GlobalNavigationOptions,
          headerLeft: () => <HeaderNavButton type="menu" />,
          headerTitle: translate.get(ContactsConfig.title)
        }}
      />
      <DepartmentsStack.Screen
        name={CONTACTS_DETAIL}
        component={ContactsDetailScreen}
        options={{
          ...GlobalNavigationOptions,
          headerLeft: () => <HeaderNavButton type="back" />,
          headerTitle: translate.get(ContactsConfig.title)
        }}
      />
      <DepartmentsStack.Screen
        name={SITUATIONS_DETAIL}
        component={SituationsDetailScreen}
        options={{
          ...GlobalNavigationOptions,
          headerLeft: () => <HeaderNavButton type="back" />,
          headerTitle: translate.get(SituationsConfig.title)
        }}
      />
    </DepartmentsStack.Navigator>
  );
}
