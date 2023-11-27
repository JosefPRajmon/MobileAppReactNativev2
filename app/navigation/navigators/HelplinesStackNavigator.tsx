import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderNavButton } from "../../components/header/HeaderNavButton";
import { translate } from "../../services/translate.service";
import { GlobalNavigationOptions } from "../GlobalNavigationOptions";
import HelplinesListScreen from "../../screens/HelplinesListScreen";
import { HelplinesConfig } from "../../config/modules/Helplines.config";

const News = createStackNavigator();

export default function HelplinesStackNavigator() {
  return (
    <News.Navigator>
      <News.Screen
        name={HelplinesConfig.moduleID}
        component={HelplinesListScreen}
        options={{
          ...GlobalNavigationOptions,
          //headerLeft: () => <HeaderNavButton type="menu" />,
          headerTitle: translate.get(HelplinesConfig.title)
        }}
      />
    </News.Navigator>
  );
}
