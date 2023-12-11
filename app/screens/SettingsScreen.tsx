import React, { useState } from 'react';
import { ListItem, CheckBox, Text, Body, View, Row } from 'native-base';
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
import { GetvalueIndex, PrimDataGet, Save, updater } from '../config/modules/Updater';
import { ButtonMenu } from '../components/header/ButtonMenu';
import { DatabaseProvider } from '../providers/DatabaseProvider';
import { Alert } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'

const UpdatesArray = ["jednou za hodinu", "každých 6h", "každých 12h", "jednou za den", "jednou za týden", "jednou za měsíc"]


export default function SettingsScreen({ navigation }: any) {
    
        const { modules, gpsNotification } = useSelector(
            (state: any) => state.settings
        );
        const dispatch = useDispatch();

        const db: any = DatabaseProvider.getInstance();

        const data = PrimDataGet();

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
    const contaks = true
        let [selectedContact, selectedContactSet] = useState(0/*GetvalueIndex("contaks")*/);
        return (
            <View>
                <ButtonMenu navigation={navigation} 
                />
                <ScrollView scrollIndicatorInsets={{ right: 1 }} style={styles.container}>
                    <View>
                        <View style={styles.Items}>
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
                        <View style={styles.Items}>

                            {AppConfig.Aktualits && (
                            <Row >
                                <Text style={{ textAlignVertical: "center" }}>Aktuality/ně</Text>
                                <SelectDropdown
                                    data={UpdatesArray}
                                    defaultValueByIndex={ GetvalueIndex("aktualits")/*UpdatesArray[0]*/}
                                    onSelect={(selectedItem, index) => {
                                        //console.log(itemValue + " " + GetvalueIndex("contaks"));
                                        let newValues = [[index, 'aktualits']]; // Nahraďte svými novými hodnotami
                                        updater.tables[0].updateFunction.call(updater.tables[0], newValues);
                                         Save()
                                    }}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        // text represented after item is selected
                                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                                        return selectedItem
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        // text represented for each item in dropdown
                                        // if data array is an array of objects then return item.property to represent item in dropdown
                                        return item
                                    }}
                                />
                            </Row>

                            )}
                            {AppConfig.Events && <Row >
                                <Text style={{ textAlignVertical: "center" }}>Kalendář akcí</Text>
                                <SelectDropdown
                                    data={UpdatesArray}
                                    defaultValue={UpdatesArray[GetvalueIndex("events")]}
                                    onSelect={(selectedItem, index) => {
                                        console.log( " " + GetvalueIndex("contaks"));
                                        let newValues = [[index, 'events']]; // Nahraďte svými novými hodnotami
                                        updater.tables[0].updateFunction.call(updater.tables[0], newValues);
                                        Save()
                                    }}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        // text represented after item is selected
                                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                                        return selectedItem
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        // text represented for each item in dropdown
                                        // if data array is an array of objects then return item.property to represent item in dropdown
                                        return item
                                    }}
                                />
                            </Row>}
                            <Row >
                                <Text style={{ textAlignVertical: "center" }}>Kontakty</Text>
                                <SelectDropdown
                                    data={UpdatesArray}
                                    defaultValue={ UpdatesArray[GetvalueIndex("contaks")]}
                                    onSelect={(selectedItem, index) => {
                                        console.log("test: " + GetvalueIndex("contaks"))
                                        //console.log(itemValue + " " + GetvalueIndex("contaks"));
                                        let newValues = [[index, 'contaks']]; // Nahraďte svými novými hodnotami
                                        updater.tables[0].updateFunction.call(updater.tables[0], newValues);
                                         Save()
                                    }}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        // text represented after item is selected
                                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                                        return selectedItem
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        // text represented for each item in dropdown
                                        // if data array is an array of objects then return item.property to represent item in dropdown
                                        return item
                                    }}
                                />
                            </Row>
                            <Row >
                                <Text style={{ textAlignVertical: "center" }}>Kontakty</Text>
                                <SelectDropdown
                                    data={UpdatesArray}
                                    defaultValueByIndex={ GetvalueIndex("contaks")/*UpdatesArray[0]*/}
                                    onSelect={(selectedItem, index) => {
                                        //console.log(itemValue + " " + GetvalueIndex("contaks"));
                                        let newValues = [[index, 'contaks']]; // Nahraďte svými novými hodnotami
                                        updater.tables[0].updateFunction.call(updater.tables[0], newValues);
                                         Save()
                                    }}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        // text represented after item is selected
                                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                                        return selectedItem
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        // text represented for each item in dropdown
                                        // if data array is an array of objects then return item.property to represent item in dropdown
                                        return item
                                    }}
                                />
                            </Row>
                            <Row >
                                <Text style={{ textAlignVertical: "center" }}>Kontakty</Text>
                                <SelectDropdown
                                    data={UpdatesArray}
                                    defaultValueByIndex={ GetvalueIndex("contaks")/*UpdatesArray[0]*/}
                                    onSelect={(selectedItem, index) => {
                                        //console.log(itemValue + " " + GetvalueIndex("contaks"));
                                        let newValues = [[index, 'contaks']]; // Nahraďte svými novými hodnotami
                                        updater.tables[0].updateFunction.call(updater.tables[0], newValues);
                                         Save()
                                    }}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        // text represented after item is selected
                                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                                        return selectedItem
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        // text represented for each item in dropdown
                                        // if data array is an array of objects then return item.property to represent item in dropdown
                                        return item
                                    }}
                                />
                            </Row>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );

}

const styles = StyleSheet.create({
  container: {
   // flex: 1,
        width: '90%',
        height:"100%",
    //flexDirection: 'column',
    //alignItems: 'flex-start',
    //justifyContent: 'flex-start',
    padding: Metrics.padding.normal,
    //backgroundColor: Colors.appBackround,
    paddingBottom: Metrics.padding.big
    },
    Items: {
    //flex: 1,
        width: '90%',
        borderRadius:10,
    padding: Metrics.padding.normal,
    backgroundColor: Colors.appBackround,
        paddingBottom: Metrics.padding.big,
        margin:"5%"
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
