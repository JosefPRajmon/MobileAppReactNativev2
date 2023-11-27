import { Platform } from 'react-native';
import { translate } from './translate.service';

const LAYERS_IOS = [
  {
    name: translate.get('map-layer-standard'),
    code: 'standard'
  },
  {
    name: translate.get('map-layer-satellite'),
    code: 'satellite'
  },
  {
    name: translate.get('map-layer-hybrid'),
    code: 'hybrid'
  }
];

const LAYERS_ANDROID = [
  {
    name: translate.get('map-layer-standard'),
    code: 'standard'
  },
  {
    name: translate.get('map-layer-satellite'),
    code: 'satellite'
  },
  {
    name: translate.get('map-layer-hybrid'),
    code: 'hybrid'
  },
  {
    name: translate.get('map-layer-terrain'),
    code: 'terrain'
  }
];

export function getLayersNames() {
  if (Platform.OS == 'ios') {
    return getLayersNamesArray(LAYERS_IOS);
  } else {
    return getLayersNamesArray(LAYERS_ANDROID);
  }
}

export function getLayers() {
  if (Platform.OS == 'ios') {
    return LAYERS_IOS;
  } else {
    return LAYERS_ANDROID;
  }
}

export function getLayersNamesArray(layers: any) {
  return layers.map((layer: any) => {
    return layer.name;
  });
}
