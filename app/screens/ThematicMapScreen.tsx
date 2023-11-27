import React, { useState, useEffect } from 'react';
import MapView, {
  Marker,
  Callout,
  Polygon,
  Polyline,
  PROVIDER_GOOGLE
} from 'react-native-maps';
import Supercluster from 'supercluster';
import moment from 'moment';
import * as _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { DatabaseProvider } from '../providers/DatabaseProvider';
import MapClusterMarker from '../components/map/MapClusterMarker';
import {
  getLongitudeDeltaFromZoom,
  getMapBounds,
  openLink,
  createThumbnailUrl,
  hexToRGBa
} from '../util/helper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import { Text } from 'native-base';
import { SvgMarkers } from '../components/map/SvgMarkers';
import { AppConfig } from '../config/App.config';
import getCenter from 'geolib/es/getCenter';
import MapLayersButton from '../components/map/mapLayerButton';
import HTML, { IGNORED_TAGS } from 'react-native-render-html';
import { AppStyles, Metrics, Colors } from '../themes';
import { THEMATIC_MAP_SET_TYPES } from '../store/actions/actionTypes';
import { THEMATIC_MAP_CATEGORIES_MODAL } from '../navigation/ScreenNames';
import { WebView } from 'react-native-webview';
import { Toast } from 'native-base';

export default function ThematicMapScreen({ navigation }: any) {
  const dispatch = useDispatch();
  const db: any = DatabaseProvider.getInstance();
  const { categories, filterIsOpen } = useSelector(
    (state: any) => state.thematicMap
  );
  const [mapReady, setMapReady] = useState(false);
  const [mapObjects, setMapObjects] = useState([]);
  const [clustererIndex, setClustererIndex] = useState(null);
  const [clusterLoaded, setClusterLoaded] = useState(false);
  const [mapBounds, setMapBounds] = useState(null);
  const [mapRef, setMapRef] = useState(null);
  const [mapType, setMapType] = useState(AppConfig.map.initMapType);
  const [region, setRegion] = useState({
    latitude: AppConfig.map.mapCenter.latitude,
    longitude: AppConfig.map.mapCenter.longitude,
    latitudeDelta: AppConfig.map.mapZoom
      ? getLongitudeDeltaFromZoom(AppConfig.map.mapZoom)
      : AppConfig.map.mapDelta,
    longitudeDelta: AppConfig.map.mapZoom
      ? getLongitudeDeltaFromZoom(AppConfig.map.mapZoom)
      : AppConfig.map.mapDelta *
        (Metrics.screenDims.width / Metrics.screenDims.height)
  });

  useEffect(() => {
    filterIsOpen && navigation.navigate(THEMATIC_MAP_CATEGORIES_MODAL);
  }, [filterIsOpen]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const today = moment().startOf('day').valueOf();
    db.loadData('SELECT * FROM thematic_map_types ORDER BY type_name ASC')
      .then((types: any) => {
        dispatch({
          type: THEMATIC_MAP_SET_TYPES,
          payload: {
            categories: types
          }
        });
      })
      .catch((error: any) => {
        console.error('error getData from DB', error);
      });
  };

  useEffect(() => {
    let selectedCategories: any[] = _.filter(categories, { checked: true }).map(
      cat => cat.id_type
    );
    let catClause: string = selectedCategories.toString();
    catClause = catClause.replace('[', '(');
    catClause = catClause.replace(']', ')');

    getPoints(catClause);
    getObjects(catClause);
  }, [categories]);

  const getPoints = async (catClause: string) => {
    db.loadData(
      'SELECT thematic_map.id_object AS id, name AS title, description, lat, lng, id_thumb, street, town, psc, link, icon_name \n\
        FROM thematic_map \n\
        LEFT JOIN thematic_map_points ON thematic_map.id_object = thematic_map_points.id_object \n\
        WHERE thematic_map.id_type IN (' +
        catClause +
        ") AND thematic_map.type = 'point'"
    )
      .then((data: any) => {
        let markers: any[] = [];

        for (let item of data) {
          markers.push({
            ...item,
            image: createThumbnailUrl(item.id_thumb, 'callout'),
            geometry: {
              coordinates: [item.lng, item.lat],
              type: 'Point'
            },
            type: 'Feature'
          });
        }

        let cluster: any = new Supercluster({
          //radius: 100,
          minPoints: 4,
          extent: 512,
          maxZoom: 16
        });

        cluster.load(markers);
        setClustererIndex(cluster);
        setClusterLoaded(true);

        const centerAll: any = getCenter(markers);
        moveMapToLocation(centerAll.latitude, centerAll.longitude, 0.2);
      })
      .catch((error: any) => {
        console.error('error getData from DB', error);
      });
  };

  const getObjects = async (catClause: string) => {
    /* JSON_GROUP_ARRAY(JSON_OBJECT('latitude',p.lat, 'longitude', p.lng)) AS coords\n\ */
    db.loadData(
      'SELECT tm.type, tm.fill_color, tm.line_color, tm.opacity, tm.line_width, tm.name AS title, p.id_object,\n\
        GROUP_CONCAT(p.lat) AS lats, GROUP_CONCAT(p.lng) AS lngs\n\
        FROM thematic_map_points p \n\
        LEFT JOIN thematic_map tm ON tm.id_object = p.id_object\n\
        WHERE tm.id_type IN (' +
        catClause +
        ") AND tm.type != 'point'\n\
        GROUP BY p.id_object"
    )
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
            });
          }

          delete item.lats;
          delete item.lngs;

          objects.push({
            ...item,
            coords: coords
          });
        }

        setMapObjects(objects);
      })
      .catch((error: any) => {
        console.error('error getData from DB', error);
      });
  };
  const handleMapReady = () => {
    setMapReady(true);
  };

  const handleMapLongPress = (event: any) => {
    //!eventData?.noGps && AppConfig.isDev && setCurrentLocation(event.nativeEvent.coordinate);
  };

  const handleRegionChangeComplete = (region: any) => {
    if (!mapReady) {
      return;
    }

    setRegion(region);
    setMapBounds(getMapBounds(region));
  };

  const getObjectsAndClusters = () => {
    if (clustererIndex && mapBounds) {
      let placesAndClusters = clustererIndex.getClusters(
        [
          mapBounds.westLng,
          mapBounds.southLat,
          mapBounds.eastLng,
          mapBounds.northLat
        ],
        mapBounds.zoom
      );

      if (placesAndClusters) {
        for (let place of placesAndClusters) {
          place.isCluster = !!(place.properties && place.properties.cluster);
          place.properties = {
            ...place.properties,
            zoom: mapBounds.zoom
          };
        }
      }
      return placesAndClusters;
    } else {
      return [];
    }
  };

  const getCenterOffsetForAnchor = (
    anchor: any,
    markerWidth: number,
    markerHeight: number
  ) => {
    return {
      x: markerWidth * 0.5 - markerWidth * anchor.x,
      y: markerHeight * 0.5 - markerHeight * anchor.y
    };
  };

  const handleMarkerPress = (place: any) => {
    if (place.isCluster) {
      zoomToCluster(place);
    } else {
    }
  };

  const zoomToCluster = (place: any) => {
    let zoom;

    if (clustererIndex) {
      zoom = clustererIndex.getClusterExpansionZoom(
        place.properties.cluster_id
      );
    }

    if (zoom) {
      let newLongitudeDelta = getLongitudeDeltaFromZoom(zoom);
      let region = {
        latitude: place.geometry.coordinates[1],
        longitude: place.geometry.coordinates[0],
        latitudeDelta: 0.00001,
        longitudeDelta: newLongitudeDelta
      };

      if (mapRef) {
        mapRef.animateToRegion(region);
      }
    }
  };

  const renderObject = (data: any) => {
    if (data.properties.cluster) {
      return (
        <MapClusterMarker
          key={data.properties.cluster_id}
          count={data.properties.point_count}
        />
      );
    } else {
      return (
        <View
          style={{
            width: 37,
            height: 50,
            backgroundColor: 'rgba(52, 52, 52, 0)'
          }}
        >
          {SvgMarkers[data.icon_name] !== undefined
            ? SvgMarkers[data.icon_name]
            : SvgMarkers.universal}
        </View>
      );
    }
  };

  const moveMapToLocation = (lat: number, lng: number, delta?: number) => {
    if (mapRef && lat && lng) {
      mapRef.animateToRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: delta || AppConfig.map.mapDelta,
        longitudeDelta:
          (delta || AppConfig.map.mapDelta) *
          (Metrics.screenDims.width / Metrics.screenDims.height)
      });
    }
  };

  const layerSelected = (layerCode: string) => {
    setMapType(layerCode);
  };

  const toggleObjectCallout = (event: any, object: any) => {
    //event.stopPropagation();
    //object.marker.onPress();

    if (object.open) {
      object.marker.hideCallout();
    } else {
      object.marker.showCallout();
    }

    object.open = !object.open;

    /* Toast.show({
            text: object.title,
            position: "bottom",
            type: "success",
            buttonText: "Ok",
            duration: 3000,
            style: {
                backgroundColor: Colors.infoToast.backgrournd
            },
            textStyle: {
                color: Colors.infoToast.text
            }
        }); */
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        ref={(map: any) => setMapRef(map)}
        initialRegion={region}
        mapType={mapType}
        onRegionChangeComplete={handleRegionChangeComplete}
        onMapReady={handleMapReady}
        customMapStyle={customMapsMapStyle}
        showsUserLocation={true}
        rotateEnabled={true}
        moveOnMarkerPress={false}
        showsMyLocationButton={false}
        toolbarEnabled={false}
        pitchEnabled={false}
        showsTraffic={false}
        showsBuildings={false}
        showsIndoors={false}
        followsUserLocation={false}
        showsCompass={false}
        stopPropagation={true}
        onLongPress={handleMapLongPress}
        //onPress={(event) => console.log("Map Click event", event.nativeEvent)}
      >
        {mapReady &&
          clusterLoaded &&
          getObjectsAndClusters().map((place: any, i: number) => (
            <Marker
              key={
                place.properties.cluster_id
                  ? place.properties.cluster_id
                  : `${place.id}${i}`
              }
              tracksViewChanges={true}
              tracksInfoWindowChanges={true}
              anchor={{ x: 0.5, y: 1 }}
              centerOffset={getCenterOffsetForAnchor({ x: 0.5, y: 1 }, 37, 50)}
              onPress={() => handleMarkerPress(place)}
              coordinate={{
                latitude: place.geometry.coordinates[1],
                longitude: place.geometry.coordinates[0]
              }}
              title={place.title}
            >
              {renderObject(place)}
              {!place.isCluster && (
                <Callout>
                  <View>
                    <View style={styles.bubble}>
                      <Text style={AppStyles.calloutTitle}>{place.title}</Text>
                      {place.image && (
                        <View style={styles.imageContainer}>
                          <WebView
                            source={{ uri: place.image }}
                            style={[styles.image]}
                          />
                        </View>
                      )}
                      <View style={{ marginVertical: Metrics.margin.small }}>
                        {place.town && (
                          <Text style={AppStyles.calloutDescription}>
                            Město: {place.town}
                          </Text>
                        )}
                        {place.street && (
                          <Text style={AppStyles.calloutDescription}>
                            Ulice: {place.street}
                          </Text>
                        )}
                        {place.psc && (
                          <Text style={AppStyles.calloutDescription}>
                            PSČ: {place.psc}
                          </Text>
                        )}
                      </View>
                      {place.description && (
                        <HTML
                          source={{ html: place.description }}
                          onLinkPress={(evt, href) => openLink(href)}
                          tagsStyles={{ p: AppStyles.calloutDescription }}
                          ignoredTags={[...IGNORED_TAGS, 'br']}
                        />
                      )}
                    </View>
                  </View>
                </Callout>
              )}
            </Marker>
          ))}
        {mapObjects.map((obj: any) => {
          if (obj.type === 'polygon') {
            return (
              <View key={obj.id_object}>
                <Polygon
                  coordinates={obj.coords}
                  strokeColor={obj.line_color}
                  strokeWidth={obj.line_width || 1}
                  fillColor={hexToRGBa(obj.fill_color, obj.opacity)}
                  onPress={event => {
                    event.stopPropagation();
                    toggleObjectCallout(event, obj);
                  }}
                  tappable={true}
                ></Polygon>
                <Marker
                  ref={ref => (obj.marker = ref)}
                  //key={`${obj.id_object}${Date.now()}`}
                  coordinate={getCenter(obj.coords)}
                  tracksViewChanges={true}
                  tracksInfoWindowChanges={true}
                  stopPropagation={true}
                  calloutVisible={true}
                >
                  {
                    <View
                      style={{
                        width: 10,
                        height: 10,
                        backgroundColor: 'red'
                      }}
                    />
                  }
                  <Callout>
                    <View style={styles.bubble}>
                      <Text
                        style={[AppStyles.calloutTitle, { marginBottom: 0 }]}
                      >
                        {obj.title}
                      </Text>
                    </View>
                  </Callout>
                </Marker>
              </View>
            );
          }
          if (obj.type === 'line') {
            return (
              <Polyline
                key={obj.id_object}
                coordinates={obj.coords}
                strokeColor={obj.line_color || obj.fill_color}
                strokeWidth={obj.line_width || 1}
              />
            );
          }
        })}
      </MapView>
      <MapLayersButton
        containerStyle={styles.layersButtonContainer}
        onLayerSelected={(layerCode: string) => layerSelected(layerCode)}
      />
    </SafeAreaView>
  );
}

const customMapsMapStyle = [
  {
    featureType: 'poi',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject
  },
  layersButtonContainer: {
    position: 'absolute',
    right: 20,
    top: 20
  },
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    width: Metrics.bubble.width,
    padding: Metrics.bubble.padding
  },
  pStyle: {
    padding: 0
  },
  imageContainer: {
    flex: 1,
    width: Metrics.bubble.imgWidth,
    height: Metrics.bubble.imgHeight,
    borderRadius: Metrics.images.borderRadius,
    backgroundColor: '#fff',
    overflow: 'hidden'
  },
  image: {
    flex: 1
  }
});
