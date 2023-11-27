import React, { useState, useEffect, useLayoutEffect } from "react";
import moment from "moment";
import * as _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { DatabaseProvider } from "../providers/DatabaseProvider";
import { EventsConfig } from "../config/modules/Events.config";
import ListItem from "../components/list/ListItem";
import { StyleSheet, FlatList, View, RefreshControl, Text } from "react-native";
import { Toast } from "native-base";
import { translate } from "../services/translate.service";
import { updateModules } from "../store/actions/ModulesActions";
import { createThumbnailUrl } from "../util/helper";
import { ListItemSeparator } from "../components/list/ListItemSeparator";
import {
  EVENTS_DETAIL,
  EVENTS_CATEGORIES_MODAL,
  EVENTS_DATES_MODAL
} from "../navigation/ScreenNames";
import { NoDataSVG } from "../components/svg-componets/noData";
import { filterByDate } from "../util/helper";
import { EVENTS_SET_CATEGORY } from "../store/actions/actionTypes";
import { ButtonMenu } from "../components/header/ButtonMenu";

export default function EventsListScreen({ navigation }: any) {
  const dispatch = useDispatch();
  const db: any = DatabaseProvider.getInstance();
  const filters = useSelector((state: any) => state.events);
  const [refreshing, setRefreshing] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    handleOpenFilter(filters.filterIsOpen);
  }, [filters.filterIsOpen]);

  const getData = async () => {
    const today = moment().startOf("day").valueOf();
    db.loadData(
      "SELECT events_items.id_event, events_items.name, events_items.organizer, description, link, events_items.anotation, events_items.id_type, events_types.name_type, events_items.length_priority AS priority, events_items.id_thumb, events_places.pretty AS place, date_start, date_end, datetime_start, datetime_end, time_start, events_dates.pretty\n\
        FROM events_dates \n\
        LEFT JOIN events_items ON  events_items.id_event = events_dates.id_event\n\
        INNER JOIN events_places ON events_places.id_place = events_items.id_place\n\
        INNER JOIN events_types ON events_types.id_type = events_items.id_type"
    )
      .then((data: any) => {
        let events: any = _.map(_.groupBy(data, "id_event"), x => {
          let item: any = {
            ...x[0],
            datetimes: []
          };

          item.description = x[0].description.replace(/<p>[\s]*<\/p>/g, "");

          for (let i of x) {
            item.datetimes.push({
              start: i.date_start,
              end: i.date_end,
              datetime_start: i.datetime_start,
              datetime_end: i.datetime_end,
              time_start: i.time_start,
              pretty: i.pretty
            });
          }

          return item;
        });

        setDataSource(events);

        dispatch({
          type: EVENTS_SET_CATEGORY,
          payload: {
            categories: _.uniqBy(data, "id_type").map((cat: any) => {
              return {
                value: cat.id_type,
                label: cat.name_type,
                checked: false
              };
            })
          }
        });

        setRefreshing(false);
      })
      .catch((error: any) => {
        console.error("error getData from DB", error);
      });
  };

  const ItemView = ({ item }: any) => {
    return (
      <ListItem
        date={item.pretty}
        title={item.name}
        thumb={createThumbnailUrl(item.id_thumb, "thumb")}
        subtitle={item.place}
        onItemPress={() => handleItemPress(item)}
        //thumb={item.thumb}
        //isReaded={item.isReaded}
      />
    );
  };

  const onRefresh = async () => {
    await setRefreshing(true);
    await dispatch(updateModules(EventsConfig.moduleID));
    await getData();
    Toast.show({
      text: translate.get("toast-update-success"),
      type: "success",
      buttonText: "Ok",
      duration: 3000
    });
  };

  const handleItemPress = async (item: any) => {
    navigation.navigate(EVENTS_DETAIL, { eventData: item });
  };

  const handleOpenFilter = async (type: string) => {
    type === "categories" && navigation.navigate(EVENTS_CATEGORIES_MODAL);
    type === "dates" && navigation.navigate(EVENTS_DATES_MODAL);
  };

  const filterItems = () => {
    let filtered: any = _.orderBy(
      filterByDate(dataSource, filters.dateFilterChoice),
      ["priority", "datetime_start"],
      ["asc", "asc"]
    );

    if (!filters.allCategories) {
      filtered = filtered.filter((item: any) => {
        for (let cat of filters.categories) {
          if (item["id_type"] === cat.value) {
            return cat.checked;
          }
        }
      });
    }

    return filtered;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={filterItems()}
        keyExtractor={(item: any) => item.id_event.toString()}
        //ItemSeparatorComponent={ListItemSeparator}
        ListEmptyComponent={<NoDataSVG />}
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={ItemView}
        refreshControl={
          <RefreshControl
            //refresh control used for the Pull to Refresh
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
          />
          <ButtonMenu navigation={navigation}
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
