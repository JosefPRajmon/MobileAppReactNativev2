import React, { useState } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as _ from 'lodash';
import { DatabaseProvider } from '../../providers/DatabaseProvider';
import { getLongitudeDeltaFromZoom, getMapBounds } from '../../util/helper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { AppConfig } from '../../config/App.config';
import MapLayersButton from '../../components/map/mapLayerButton';
import { Metrics } from '../../themes';

export function MapComponent({
  children,
  onMapLongPress,
  onMapPress,
  buttons
}: any) {
  const db: any = DatabaseProvider.getInstance();
  const [mapRef, setMapRef] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  const [mapType, setMapType] = useState(AppConfig.map.initMapType);
  const [mapBounds, setMapBounds] = useState(null);
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

  const handleMapReady = () => {
    setMapReady(true);
  };

  const handleRegionChangeComplete = (region: any) => {
    if (!mapReady) {
      return;
    }

    setRegion(region);
    setMapBounds(getMapBounds(region));
  };

  const layerSelected = (layerCode: string) => {
    setMapType(layerCode);
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        ref={(map: any) => setMapRef(map)}
        initialRegion={region}
        mapType={mapType}
        onRegionChangeComplete={handleRegionChangeComplete}
        onMapReady={handleMapReady}
        onLongPress={onMapLongPress}
        onPress={onMapPress}
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
      >
        {children}
      </MapView>
      <MapLayersButton
        containerStyle={styles.layersButtonContainer}
        onLayerSelected={(layerCode: string) => layerSelected(layerCode)}
      />
      {buttons}
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
  }
});
