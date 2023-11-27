import { Dimensions } from "react-native";
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import icoMoonConfig from '../assets/fonts/mmvm-icons.config.json';

export const MmvmIcon = createIconSetFromIcoMoon(icoMoonConfig, 'mmvm-icons', 'mmvm-icons');

const { width, height } = Dimensions.get("window");

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

/* const type = {
  helveticaRegular: "Helvetica",
  helveticaNeueLight: "HelveticaNeue-Light",
  helveticaNeueBold: "HelveticaNeue-Bold",
  helveticaNeueRegular: "HelveticaNeue-Regular",
  robotoRegular: "Roboto-Regular",
  robotoMedium: "Roboto-Medium",
  robotoItalic: "Roboto-Italic"
}; */

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  h4: 26,
  h5: 20,
  h6: 19,
  input: 18,
  regular: 17,
  medium: 14,
  small: 12,
  tiny: 8.5
};

const style = {
  /*   h1: {
      fontFamily: type.robotoRegular,
      fontSize: size.h1
    },
    h2: {
      fontWeight: "bold",
      fontSize: size.h2
    },
    h3: {
      fontFamily: type.robotoRegular,
      fontSize: size.h3
    },
    h4: {
      fontFamily: type.robotoRegular,
      fontSize: size.h4
    },
    h5: {
      fontFamily: type.robotoRegular,
      fontSize: size.h5
    },
    h6: {
      fontFamily: type.robotoMedium,
      fontSize: size.h6
    },
    normal: {
      fontFamily: type.robotoMedium,
      fontSize: size.regular
    },
    description: {
      fontFamily: type.robotoMedium,
      fontSize: size.medium
    } */
};

export default {
  MmvmIcon,
  size,
  style,
  scale,
  verticalScale,
  moderateScale
};
