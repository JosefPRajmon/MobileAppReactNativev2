import React, { useState, useEffect } from 'react';
import { Marker, Polygon, Polyline } from 'react-native-maps';
import * as _ from 'lodash';
import { DatabaseProvider } from '../providers/DatabaseProvider';
import { hexToRGBa } from "../util/helper";
import { StyleSheet, View } from 'react-native';

import { MapComponent } from '../components/map/map.component';
import { SvgMarkers } from '../components/map/SvgMarkers';
import { Colors } from '../themes';

export default function NoticesDetailMapTabScreen({ route }: any) {
    const db: any = DatabaseProvider.getInstance();
    const [mapObjects, setMapObjects] = useState([]);

    useEffect(() => {
        getObjects(route.params);
    }, []);

    const getObjects = async (params: any) => {
        db.loadData("SELECT o.type, o.icon, o.color, o.id_object, \n\
        GROUP_CONCAT(p.lat) AS lats, GROUP_CONCAT(p.lng) AS lngs \n\
        FROM notices_points p \n\
        LEFT JOIN notices_objects o ON o.id_object = p.id_object \n\
        WHERE o.id_notice = " + params.id_notice + " \n\
        GROUP BY p.id_object")
            .then((data: any) => {
                let objects: any = [];

                for (let item of data) {
                    let coords = [];
                    let lats = item.lats.split(',');
                    let lngs = item.lngs.split(',');

                    for (let i = 0; i < lats.length; i++) {
                        coords.push({
                            latitude: Number(lats[i]),
                            longitude: Number(lngs[i])
                        })
                    }

                    delete item.lats;
                    delete item.lngs;

                    if (item.type === "point") {
                        item.geometry = {
                            coordinates: [coords[0].longitude, coords[0].latitude],

                        }
                        //item.type = "Feature"
                    }

                    if (item.color === "") {
                        item.color = Colors.main;
                    }

                    objects.push({
                        ...item,
                        coords: coords
                    });

                }

                setMapObjects(objects);

            })
            .catch((error: any) => {
                console.error("error getData from DB", error);
            })
    };


    const toggleObjectCallout = (object: any) => {
        if (object.open) {
            object.marker.hideCallout();
        } else {
            object.marker.showCallout();
        }

        object.open = !object.open;
    }

    return (
        <MapComponent>
            {mapObjects.map((obj: any) => {
                if (obj.type === "polygon") {
                    return (<View key={obj.id_object}>
                        <Polygon
                            coordinates={obj.coords}
                            strokeColor={obj.color}
                            strokeWidth={obj.line_width || 1}
                            fillColor={hexToRGBa(obj.color, 0.5)}
                            tappable={false}>

                        </Polygon>
                    </View>)
                }
                if (obj.type === "line") {
                    return (<Polyline
                        key={obj.id_object}
                        coordinates={obj.coords}
                        strokeColor={obj.color}
                        strokeWidth={obj.line_width || 1}
                    />)
                }
                if (obj.type === "point") {
                    return (<Marker
                        key={obj.id_object}
                        tracksViewChanges={true}
                        tracksInfoWindowChanges={true}
                        anchor={{ x: 0.5, y: 1 }}
                        coordinate={{
                            latitude: obj.geometry.coordinates[1],
                            longitude: obj.geometry.coordinates[0]
                        }}
                        title={obj.title}
                    >
                        {<View style={{
                            width: 37,
                            height: 50,
                            backgroundColor: 'rgba(52, 52, 52, 0)'
                        }}>
                            {obj.icon ? SvgMarkers[obj.icon] : SvgMarkers.universal}
                        </View>}
                    </Marker>)
                }
            })}
        </MapComponent>
    );
};

const styles = StyleSheet.create({

});