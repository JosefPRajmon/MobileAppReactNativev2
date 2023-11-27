import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderNavButton } from "../../components/header/HeaderNavButton";
import NewsListScreen from "../../screens/NewsListScreen";
import { translate } from "../../services/translate.service";
import { GlobalNavigationOptions } from "../GlobalNavigationOptions";
import { ItemsVisibilityButton } from "../../components/header/ItemsVisibilityButton";
import { NewsConfig } from "../../config/modules/News.config";
import appStyles from "../../themes/AppStyles";
import { View } from "react-native";

const News = createStackNavigator();

export default function NewsStackNavigator() {
  return (
    <News.Navigator>
      <News.Screen
        name={NewsConfig.moduleID}
        component={NewsListScreen}
        options={{
          ...GlobalNavigationOptions,
          headerLeft: () => <HeaderNavButton type="menu" />,
          headerTitle: translate.get(NewsConfig.title),
          headerRight: () => (
            <View style={appStyles.headerRightContainer}>
              <ItemsVisibilityButton moduleID={NewsConfig.moduleID} />
            </View>
          )
        }}
      />
    </News.Navigator>
  );
}
