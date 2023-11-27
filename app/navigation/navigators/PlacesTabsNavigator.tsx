import React, { useEffect } from "react";
import * as Location from "expo-location";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderNavButton } from "../../components/header/HeaderNavButton";
import { translate } from "../../services/translate.service";
import { GlobalNavigationOptions } from "../GlobalNavigationOptions";
import { TabBarIcon } from "../../components/tabs/TabBarIcon";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import PlacesListTabScreen from "../../screens/PlacesListTabScreen";
import PlacesDetailScreen from "../../screens/PlacesDetailScreen";
import PlacesMapTabScreen from "../../screens/PlacesMapTabScreen";
import { PLACES_CATEGORY_MODAL, PLACES_DETAIL } from "../ScreenNames";
import { useDispatch } from "react-redux";
import {
  PLACES_CATEGORIES_CLEAR,
  PLACES_RESET,
  PLACES_SET_LOCATION
} from "../../store/actions/actionTypes";
import { PlacesCategoryModal } from "../../modals/PlacesCategoryModal";

const PlacesStack = createStackNavigator();

export default function PlacesStackNavigator({ navigation, route }: any) {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        //alert('Potřebujeme vaší polohu k zacílení hlášení!');
        return;
      }

      let gps: any = await Location.getCurrentPositionAsync({});
      if (gps) {
        dispatch({
          type: PLACES_SET_LOCATION,
          payload: gps
        });
      }
    })();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      dispatch({ type: PLACES_RESET });
    });

    return unsubscribe;
  }, [navigation]);

  console.log("Route params navigator", route, route.params);

  return (
    <PlacesStack.Navigator
      initialRouteName={"PlacesTabs"}
      screenOptions={{
        ...GlobalNavigationOptions
      }}
    >
      <PlacesStack.Screen
        name={"PlacesTabs"}
        component={PlacesTabsNavigator}
        initialParams={route.params}
        options={{
          ...GlobalNavigationOptions,
          headerLeft: () => <HeaderNavButton type="menu" />,
          headerTitle: translate.get(route?.params?.title),
          headerShown: false
        }}
      />
      <PlacesStack.Screen
        name={PLACES_DETAIL}
        component={PlacesDetailScreen}
        options={{
          ...GlobalNavigationOptions,
          headerLeft: () => <HeaderNavButton type="back" />,
          headerTitle: translate.get("screen-title-detail")
        }}
      />
      <PlacesStack.Screen
        name={PLACES_CATEGORY_MODAL}
        component={PlacesCategoryModal}
        options={{
          ...GlobalNavigationOptions,
          headerLeft: () => <HeaderNavButton type="back" />,
          headerTitle: "Filtrovat kategorie"
          //...ModalTransition
        }}
      />
    </PlacesStack.Navigator>
  );
}

const PlacesTabs = createBottomTabNavigator();

function PlacesTabsNavigator({ route }: any) {
  return (
    <PlacesTabs.Navigator>
      <PlacesTabs.Screen
        name={"PlacesTab"}
        component={PlacesListTabScreen}
        initialParams={route?.params}
        options={({ route }) => ({
          ...GlobalNavigationOptions,
          headerLeft: () => <HeaderNavButton type="menu" />,
          title: translate.getUpperCase("tab-title-list"),
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="format-list-text" color={color} />
          )
        })}
      />
      <PlacesTabs.Screen
        name={"MapTab"}
        component={PlacesMapTabScreen}
        initialParams={route?.params}
        options={({ route }) => ({
          ...GlobalNavigationOptions,
          headerLeft: () => <HeaderNavButton type="menu" />,
          title: translate.getUpperCase("tab-title-map"),
          tabBarIcon: ({ color }) => <TabBarIcon name="map" color={color} />
        })}
      />
    </PlacesTabs.Navigator>
  );
}
