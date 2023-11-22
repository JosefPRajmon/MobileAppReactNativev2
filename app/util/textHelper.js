import { PixelRatio, Dimensions, StyleSheet } from 'react-native';

const ratio = PixelRatio.get();

const normalize = size => {
  const { width, height } = Dimensions.get('window');

  if (typeof size === 'string') {
    return size;
  }

  if (ratio >= 2 && ratio < 3) {
    if (width < 360) {
      return size * 0.95;
    } else if (height < 667) {
      return size;
    } else if (height >= 667 && height <= 735) {
      return size * 1.15;
    }

    return size * 1.25;
  } else if (ratio >= 3 && ratio < 3.5) {
    if (width < 360) {
      return size;
    } else if (height < 667) {
      return size * 1.15;
    } else if (height >= 667 && height <= 735) {
      return size * 1.2;
    }

    return size * 1.27;
  } else if (ratio >= 3.5) {
    if (width < 360) {
      return size;
    } else if (height < 667) {
      return size * 1.2;
    } else if (height >= 667 && height <= 735) {
      return size * 1.25;
    }

    return size * 1.4;
  }

  return size;
};

export const createNormalizeStyle = (
  styles,
  targetProperties = [
    'margin',
    'marginHorizontal',
    'marginLeft',
    'marginTop',
    'marginRight',
    'marginBottom',
    'marginVertical',
    'padding',
    'paddingVertical',
    'paddingHorizontal',
    'paddingLeft',
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'radius',
    'height',
    'width'
  ]
) => {
  const normalizedStyles = {};

  Object.keys(styles).forEach(key => {
    normalizedStyles[key] = {};
    Object.keys(styles[key]).forEach(property => {
      if (targetProperties.includes(property)) {
        normalizedStyles[key][property] = styles[key][property];
      } else {
        normalizedStyles[key][property] = styles[key][property];
      }
    });
  });

  return StyleSheet.create(normalizedStyles);
};

export default createNormalizeStyle;
