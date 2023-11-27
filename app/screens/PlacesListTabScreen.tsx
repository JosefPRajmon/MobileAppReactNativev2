import React, { useState, useEffect, useLayoutEffect } from "react";
import * as _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { DatabaseProvider } from "../providers/DatabaseProvider";
import ListItem from "../components/list/ListItem";
import { StyleSheet, FlatList, View, RefreshControl } from "react-native";
import getDistance from "geolib/es/getDistance";
import { Toast } from "native-base";
import { translate } from "../services/translate.service";
import { updateModules } from "../store/actions/ModulesActions";
import { ListItemSeparator } from "../components/list/ListItemSeparator";
import { HeaderButton } from "../components/header/HeaderButton";
import { HeaderSearchBox } from "../components/header/HeaderSearchBox";
import { removeDiacritics } from "../util/helper";
import {
  PLACES_CATEGORY_MODAL,
  PLACES_DETAIL
} from "../navigation/ScreenNames";
import { NoDataSVG } from "../components/svg-componets/noData";
import { PlacesConfig } from "../config/modules/Places.config";
import {
  PLACES_SET_CATEGORY,
  PLACES_OPEN_MODAL,
  PLACES_SET_ORDER_BY
} from "../store/actions/actionTypes";
import appStyles from "../themes/AppStyles";

export default function PlacesListTabScreen({ navigation, route }: any) {
  const dispatch = useDispatch();
  const db: any = DatabaseProvider.getInstance();
  const { moduleID, pageID }: any = useSelector((state: any) => state.nav);
  const { title, hkatID, skatID, disableCatFilter }: any = useSelector(
    (state: any) => state.nav?.params
  );
  const { categories, allCategories, filterIsOpen, orderByDistance, location } =
    useSelector((state: any) => state.places);
  const [refreshing, setRefreshing] = useState(false);
  const [places, setPlaces]: any = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [typing, setTyping] = useState("");

  console.log("Route params places", moduleID, pageID, title, hkatID, skatID);

  useLayoutEffect(() => {
    if (moduleID !== "places") {
      return;
    }
    if (searching) {
      navigation.setOptions({
        headerTitle: () => (
          <HeaderSearchBox
            onFocus={() => console.log("Vysunout klavesnici TODO")}
            onClosePress={() => setSearching(false)}
            onChangeText={(text: string) => setTyping(removeDiacritics(text))}
            placeholder={translate.get("text-search")}
            searchBoxOnPress={() => console.log("Search on press")}
            disableTextInput={false}
          />
        ),
        headerRight: () => (
          <View style={appStyles.headerRightContainer}>
            <HeaderButton
              iconType="Ionicon"
              iconName={"ios-close-circle-outline"}
              onPress={() => setSearching(false)}
            />
          </View>
        )
      });
    } else {
      setTyping("");
      setSearchResults([]);
      navigation.setOptions({
        headerTitle: translate.get(title),
        headerRight: () => (
          <View style={appStyles.headerRightContainer}>
            <HeaderButton
              iconType="Ionicon"
              iconName="ios-search"
              onPress={() => setSearching(true)}
            />
            {!skatID && !disableCatFilter && (
              <HeaderButton
                iconType="MaterialCommunityIcons"
                iconName={"filter-outline"}
                onPress={() =>
                  dispatch({
                    type: PLACES_OPEN_MODAL,
                    payload: "categories"
                  })
                }
              />
            )}
            {location && (
              <HeaderButton
                iconType="MmvmIcon"
                iconName={"order"}
                onPress={() =>
                  dispatch({
                    type: PLACES_SET_ORDER_BY
                  })
                }
              />
            )}
          </View>
        )
      });
    }
  }, [searching, location, pageID]);

  useEffect(() => {
    async function loadData() {
      if (moduleID === "places") {
        const places: any = await loadPlaces();
        if (places) {
          await loadCategories(places);
          await setPlaces(filterPlaces(places));
        }
        setRefreshing(false);
      }
    }

    loadData();
  }, [location, pageID]);

  useEffect(() => {
    if (typing.length > 1) {
      let foundItems: any = _.filter(places, (place: any) => {
        if (removeDiacritics(place.name).indexOf(typing) != -1) {
          return place;
        }
      });
      setSearchResults(foundItems);
    }
  }, [typing]);

  useEffect(() => {
    if (places.length > 0) {
      setPlaces(filterPlaces(places));
    }

    Toast.show({
      text: orderByDistance
        ? "Seřazeno podle vzdálenosti"
        : "Seřazeno podle abecedy",
      type: "success",
      buttonText: "Ok",
      duration: 3000
    });
  }, [orderByDistance]);

  useEffect(() => {
    filterIsOpen && navigation.navigate(PLACES_CATEGORY_MODAL);
  }, [filterIsOpen]);

  const filterPlaces = (places: any) => {
    let sorted: any = [];

    if (orderByDistance) {
      sorted = _.orderBy(places, ["distanceNum"], ["asc"]);
    } else {
      sorted = _.orderBy(places, ["name"], ["asc"]);
    }

    return sorted;
  };

  const loadPlaces = async () => {
    return new Promise(resolve => {
      let sql =
        "SELECT places.id_place, places.id_skat, name, lat, lng, places_skat.name_skat, address " +
        "FROM places " +
        "LEFT JOIN places_skat ON places_skat.id_skat = places.id_skat " +
        "WHERE (lat IS NOT NULL) " +
        "AND (lng IS NOT NULL) " +
        "AND places.id_hkat = " +
        hkatID;

      sql += skatID ? " AND places.id_skat = " + skatID : "";
      sql += " ORDER BY name ASC";

      console.log("SQL", sql);

      db.loadData(sql)
        .then((data: any) => {
          console.log("Data", data);
          if (location) {
            data.map((place: any) => {
              place.distanceNum = getDistance(location.coords, {
                latitude: place.lat,
                longitude: place.lng
              });
              place.distanceStr =
                place.distanceNum < 1000
                  ? place.distanceNum + " m"
                  : (place.distanceNum / 1000).toFixed(1) + " km";
            });
          }

          resolve(data);
        })
        .catch((error: any) => {
          console.error("error getData from DB", error);
          resolve(false);
        });
    });
  };

  const loadCategories = async (places: any) => {
    const categories = _.uniqBy(places, "id_skat").map((cat: any) => {
      return { value: cat.id_skat, label: cat.name_skat, checked: false };
    });

    return await dispatch({
      type: PLACES_SET_CATEGORY,
      payload: {
        categories: categories,
        allCategories: true
      }
    });
  };

  const renderItem = ({ item }: any) => {
    return (
      <ListItem
        title={item.name}
        subtitle={
          disableCatFilter && !skatID
            ? item.address || undefined
            : item.name_skat
        }
        description={item.distanceStr}
        onItemPress={() => handleItemPress(item)}
      />
    );
  };

  const onRefresh = async () => {
    await setRefreshing(true);
    await dispatch(updateModules(PlacesConfig.moduleID));
    await loadPlaces();
    Toast.show({
      text: translate.get("toast-update-success"),
      type: "success",
      buttonText: "Ok",
      duration: 3000
    });
  };

  const handleItemPress = (item: any) => {
    navigation.navigate(PLACES_DETAIL, {
      id_place: item.id_place,
      name_skat: item.name_skat
    });
  };

  const filterItems = () => {
    if (!allCategories) {
      return places.filter((item: any) => {
        for (let cat of categories) {
          if (item["id_skat"] === cat.value) {
            return cat.checked;
          }
        }
      });
    }

    return places;
  };

  // console.log("Location", location, places);

  return (
    <View style={styles.container}>
      <FlatList
        data={searching ? searchResults : filterItems()}
        keyExtractor={(item: any) => item.id_place.toString()}
        ItemSeparatorComponent={ListItemSeparator}
        renderItem={renderItem}
        ListEmptyComponent={<NoDataSVG />}
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl
            title={translate.get("text-update-title")}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  }
});
