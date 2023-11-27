import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Button } from "native-base";
import { Colors, Metrics } from '../themes';
import { Ionicons } from '@expo/vector-icons';
import { MapComponent } from '../components/map/map.component';
import { Marker } from 'react-native-maps';
import { SvgMarkers } from '../components/map/SvgMarkers';

export const PickLocationModal = ({ navigation, route }: any) => {
    const { onPickLocation, oldLocation } = route.params;
    const [location, setLocation] = useState();

    useEffect(() => {
        setLocation(oldLocation);
    }, []);

    const handleGoBack = () => {
        onPickLocation(location);
        navigation.goBack();
    }

    const handlePickLocation = (event: any) => {
        setLocation(event.nativeEvent.coordinate);
    }

    return (
        <MapComponent
            onMapPress={handlePickLocation}
            buttons={
                <View style={styles.buttonsContainer}>
                    <Button
                        style={[styles.button, { marginLeft: Metrics.margin.tinny }]}
                        onPress={handleGoBack}>
                        <Ionicons
                            style={styles.icon}
                            size={Metrics.icon.normal}
                            name="ios-checkmark"
                            color={Colors.mainButton.icon} />
                        <Text style={styles.buttonTitle}>Použít</Text>
                    </Button>
                    <Button
                        style={[styles.button, { marginLeft: Metrics.margin.tinny }]}
                        onPress={() => setLocation(undefined)}>
                        <Ionicons
                            style={styles.icon}
                            size={Metrics.icon.normal}
                            name="ios-close"
                            color={Colors.mainButton.icon} />
                        <Text style={styles.buttonTitle}>Zrušit</Text>
                    </Button>
                </View>
            }>
            {location && <Marker
                key="location"
                tracksViewChanges={true}
                tracksInfoWindowChanges={true}
                anchor={{ x: 0.5, y: 1 }}
                coordinate={{
                    latitude: location.latitude,
                    longitude: location.longitude
                }}>
                {<View style={{
                    width: 37,
                    height: 50,
                    backgroundColor: 'rgba(52, 52, 52, 0)'
                }}>
                    {SvgMarkers.universal}
                </View>}
            </Marker>}
        </MapComponent>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 0,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        backgroundColor: Colors.appBackround
    },
    buttonsContainer: {
        position: 'absolute',
        bottom: 20,
        right: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        padding: Metrics.padding.normal
    },
    button: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: Colors.mainButton.background,
        padding: Metrics.padding.tinny,
    },
    buttonTitle: {
        color: Colors.mainButton.text,
        fontSize: Metrics.font.title
    },
    icon: {
        marginLeft: Metrics.margin.small
    }
});
