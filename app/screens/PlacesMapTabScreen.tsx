import React, { useState, useEffect, useLayoutEffect } from "react";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import Supercluster from "supercluster";
import * as _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { DatabaseProvider } from "../providers/DatabaseProvider";
import MapClusterMarker from "../components/map/MapClusterMarker";
import {
  getLongitudeDeltaFromZoom,
  getMapBounds,
  createThumbnailUrl
} from "../util/helper";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import { Text } from "native-base";
import { SvgMarkers } from "../components/map/SvgMarkers";
import { AppConfig } from "../config/App.config";
import getCenter from "geolib/es/getCenter";
import MapLayersButton from "../components/map/mapLayerButton";
import { AppStyles, Metrics, Colors } from "../themes";
import {
  PLACES_DETAIL,
  PLACES_CATEGORY_MODAL
} from "../navigation/ScreenNames";
import { MainButton } from "../components/MainButton";
import { translate } from "../services/translate.service";
import { PLACES_OPEN_MODAL } from "../store/actions/actionTypes";
import { HeaderButton } from "../components/header/HeaderButton";

export default function PlacesMapTabScreen({ navigation, route }: any) {
  const dispatch = useDispatch();
  const db: any = DatabaseProvider.getInstance();
  const { moduleID, pageID }: any = useSelector((state: any) => state.nav);
  const { title, hkatID, skatID, disableCatFilter }: any = useSelector(
    (state: any) => state.nav?.params
  );
  const { categories, filterIsOpen, location } = useSelector(
    (state: any) => state.places
  );
  const [mapReady, setMapReady] = useState(false);
  const [clustererIndex, setClustererIndex] = useState(null);
  const [clusterLoaded, setClusterLoaded] = useState(false);
  const [mapBounds, setMapBounds] = useState(null);
  const [mapRef, setMapRef]: any = useState(null);
  const [mapType, setMapType] = useState(AppConfig.map.initMapType);
  const [region, setRegion]: any = useState({
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: translate.get(title),
      headerRight: () => (
        <View style={AppStyles.headerRightContainer}>
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
        </View>
      )
    });
  }, [location, pageID]);

  useEffect(() => {
    filterIsOpen && navigation.navigate(PLACES_CATEGORY_MODAL);
  }, [filterIsOpen]);

  useEffect(() => {
    loadPlaces();
  }, []);

  const loadPlaces = async (catClause?: string) => {
    const sql =
      "SELECT places.id_place AS id, places.id_skat, name AS title, lat, lng, places_skat.name_skat, description, address " +
      "FROM places " +
      "LEFT JOIN places_skat ON places_skat.id_skat = places.id_skat " +
      "WHERE (lat IS NOT NULL) " +
      "AND (lng IS NOT NULL) " +
      "AND places.id_hkat = " +
      hkatID +
      (catClause ? " AND places.id_skat IN (" + catClause + ");" : "");

    db.loadData(sql).then((data: any) => {
      let markers: any[] = [];

      for (let item of data) {
        markers.push({
          ...item,
          image: createThumbnailUrl(item.id_thumb, "callout"),
          geometry: {
            coordinates: [item.lng, item.lat],
            type: "Point"
          },
          type: "Feature"
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
    });
  };

  useEffect(() => {
    let selectedCategories: any[] = _.filter(categories, { checked: true }).map(
      cat => cat.value
    );
    let catClause: string = selectedCategories.toString();
    catClause = catClause.replace("[", "(");
    catClause = catClause.replace("]", ")");

    // console.log("Cat clause: ", catClause);

    loadPlaces(catClause);
  }, [categories]);

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
            backgroundColor: "rgba(52, 52, 52, 0)"
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
    // console.log("moveMapToLocation", lat, lng);
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

  const handleItemPress = async (item: any) => {
    // console.log("handleItemPress", item);
    navigation.navigate(PLACES_DETAIL, {
      id_place: item.id,
      name_skat: item.name_skat
    });
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
              title={place.title}
              tracksViewChanges={true}
              tracksInfoWindowChanges={true}
              anchor={{ x: 0.5, y: 1 }}
              centerOffset={getCenterOffsetForAnchor({ x: 0.5, y: 1 }, 37, 50)}
              onPress={() => handleMarkerPress(place)}
              coordinate={{
                latitude: place.geometry.coordinates[1],
                longitude: place.geometry.coordinates[0]
              }}
            >
              {renderObject(place)}
              {!place.isCluster && (
                <Callout onPress={() => handleItemPress(place)}>
                  <View>
                    <View style={styles.bubble}>
                      <Text style={AppStyles.calloutTitle}>{place.title}</Text>
                      {place.address !== "" && (
                        <Text style={[AppStyles.calloutDescription]}>
                          Adresa: {place.address}
                        </Text>
                      )}
                      {place.description !== "" && (
                        <Text
                          style={[
                            AppStyles.calloutDescription,
                            { marginTop: 6 }
                          ]}
                        >
                          {place.description}
                        </Text>
                      )}
                      <MainButton
                        small
                        text={"Zobrazit detail"}
                        onButtonPress={() => handleItemPress(place)}
                        containerStyle={{ paddingTop: 0, paddingBottom: 0 }}
                        textStyle={{ fontSize: Metrics.font.title }}
                      />
                    </View>
                  </View>
                </Callout>
              )}
            </Marker>
          ))}
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
    featureType: "poi",
    stylers: [
      {
        visibility: "off"
      }
    ]
  }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject
  },
  layersButtonContainer: {
    position: "absolute",
    right: 20,
    top: 20
  },
  bubble: {
    flexDirection: "column",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    width: Metrics.bubble.width,
    padding: Metrics.bubble.padding
  },
  // Arrow below the bubble

  // Character name
  pStyle: {
    padding: 0
  },
  imageContainer: {
    flex: 1,
    width: Metrics.bubble.imgWidth,
    height: Metrics.bubble.imgHeight,
    borderRadius: Metrics.images.borderRadius,
    backgroundColor: "#fff",
    overflow: "hidden"
  },
  image: {
    flex: 1
  }
});
