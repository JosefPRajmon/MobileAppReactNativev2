import React from 'react';
import { Marker } from "react-native-maps";
import { StyleSheet, View } from 'react-native';
import { Colors, AppStyles } from "../../themes";

function MapMarker(props: any) {

    return (
        <Marker
            {...props}
            coordinate={props.coords}
            anchor={{ x: 0.5, y: 1 }}
            /* centerOffset={{ x: -10, y: -10 }} */
            tracksViewChanges={false}
            tracksInfoWindowChanges={false}
            title={props.title}
            description={props.description}
        >
            <View style={{
                width: 37,
                height: 50
            }}>
                {props.iconComponent}
            </View>
        </Marker>
    );
}

const styles = StyleSheet.create({

})

export default MapMarker;