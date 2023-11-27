import React from 'react';
import { ListItem, CheckBox, Text, Body, View } from 'native-base';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { AppStyles, Colors, Metrics } from '../themes';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { translate } from '../services/translate.service';
import {
  SET_GPS_NOTIFICATION,
  TOGGLE_NOTIFICATION_ENABLE
} from '../store/actions/actionTypes';
import DetailItem from '../components/detail/DetailItem';
import { PICK_LOCATION_MODAL } from '../navigation/ScreenNames';
import { AppConfig, AppModules } from '../config/App.config';

export default function SettingsScreen({ navigation }: any) {
  const { modules, gpsNotification } = useSelector(
    (state: any) => state.settings
  );
  const dispatch = useDispatch();

  const toggleNotifidationEnable = (moduleID: string) => {
    dispatch({
      type: TOGGLE_NOTIFICATION_ENABLE,
      payload: moduleID
    });
  };

  const handleOpenPickLocationModal = () => {
    navigation.navigate(PICK_LOCATION_MODAL, {
      oldLocation: gpsNotification,
      onPickLocation: (location: any) => {
        dispatch({
          type: SET_GPS_NOTIFICATION,
          payload: location
        });
      }
    });
  };

  return (
    <ScrollView scrollIndicatorInsets={{ right: 1 }}>
      <View style={styles.container}>
        {AppConfig.enableNotifications && (
          <View>
            <View style={styles.title}>
              <Text style={AppStyles.detailItemTitle}>Nofifikace</Text>
            </View>
            {Object.entries(modules).map(([moduleID, value]: any) => (
              <ListItem
                key={moduleID}
                style={styles.item}
                onPress={() => toggleNotifidationEnable(moduleID)}
              >
                <CheckBox
                  checked={value.enable}
                  color={Colors.checkbox}
                  onPress={() => toggleNotifidationEnable(moduleID)}
                />
                <Body>
                  <Text>
                    {translate.get(AppModules[moduleID].config.title)}
                  </Text>
                </Body>
              </ListItem>
            ))}
          </View>
        )}
        <DetailItem
          title={'Upozornění v okolí'}
          data='Zvolte na mapě umístění, budete dostávat notifikace jen v jeho okolí.'
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.locationPickerButton,
            gpsNotification && { borderColor: 'green' }
          ]}
          onPress={handleOpenPickLocationModal}
        >
          <View style={styles.locationPickerTextContainer}>
            <Text style={styles.locationPickerText}>
              {gpsNotification
                ? gpsNotification.latitude.toFixed(10) +
                  ', ' +
                  gpsNotification.longitude.toFixed(10)
                : 'Žádná lokace'}
            </Text>
          </View>
          <View style={styles.locationPickerIconContainer}>
            <Icon
              style={styles.locationPickerIcon}
              size={Metrics.icon.normal}
              name={gpsNotification ? 'crosshairs-gps' : 'crosshairs-off'}
              color={Colors.listItemIcon}
            />
          </View>
        </TouchableOpacity>
        {/* <MainButton
          text={"Uložit nastavení"}
          iconType="MaterialCommunityIcons"
          iconName="send"
          onButtonPress={handleSendSettings} /> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: Metrics.padding.normal,
    backgroundColor: Colors.appBackround,
    paddingBottom: Metrics.padding.big
  },
  title: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.detailItemBorder,
    marginTop: Metrics.margin.big
  },
  item: {
    width: '100%'
  },
  locationPickerButton: {
    flexDirection: 'row',
    alignContent: 'space-between',
    padding: Metrics.padding.small,
    borderWidth: 0.5,
    borderColor: Colors.listItemSeparator,
    marginTop: Metrics.padding.small,
    borderRadius: Metrics.radius.small
  },
  locationPickerTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    color: Colors.text.defaultText
  },
  locationPickerText: {
    flex: 1,
    alignSelf: 'center',
    fontSize: Metrics.font.text,
    fontWeight: 'bold',
    color: Colors.text.defaultText
  },
  locationPickerIconContainer: {
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center'
  },
  locationPickerIcon: {
    paddingLeft: Metrics.padding.small
  }
});
