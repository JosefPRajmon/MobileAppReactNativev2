import { Dimensions, PixelRatio } from 'react-native';

const width = Math.floor(Dimensions.get('window').width);
const height = Math.floor(Dimensions.get('window').height);
const scale = Math.floor(Dimensions.get('window').scale);

// Based on iPhone 13 Pro
const widthBaseScale = width / 390;
const heightBaseScale = height / 844;

const isTablet = width > 500;

console.log('Base Dimensions', width, height);

const normalize = (size: number, based = 'height', moderate: number = 1) => {
  const newSize =
    based === 'height' ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize * moderate));
};

// Used via Metrics.baseMargin
const metrics = {
  screenDims: {
    width: width,
    height: height,
    scale: scale
  },
  homeCardsCount: isTablet ? 3 : 2,
  padding: {
    big: 20,
    normal: 16,
    small: 10,
    tinny: 8,
    micro: 4
  },
  margin: {
    big: 20,
    normal: 16,
    small: 10,
    tinny: 8,
    micro: 4
  },
  font: {
    screen: 20,
    detailTitle: 18,
    title: 16,
    subtitle: 14,
    text: 13
  },
  icon: {
    screen: 80,
    big: 30,
    normal: 25,
    small: 20
  },
  images: {
    thumbnail: 80,
    borderRadius: 2
  },
  radius: {
    small: 6,
    normal: 10
  },
  imageSwiper: {
    width: width,
    height: Math.floor((width / 4) * 3)
  },
  bubble: {
    width: width * 0.6,
    padding: 5,
    imgWidth: Math.floor(width * 0.6 - 10),
    imgHeight: Math.floor(((width * 0.6 - 10) / 16) * 9)
  }
};

export { normalize };

export default metrics;
