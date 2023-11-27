// Jablonec
const colors = {
  greenLight: '#118441',
  greenDark: '#0F6F37',
  white: '#ffffff',
  light: '#cccccc',
  black: '#000000',
  middle: '#888888',
  dark: '#333333'
};

const usedColors = {
  main: colors.greenLight,
  appBackround: colors.white,
  statusBar: colors.greenLight,
  filterButtonsContainerBg: colors.dark,
  navDrawer: {
    headerBackgound: colors.greenLight,
    backgroundColor: colors.greenDark,
    itemsBorderColor: colors.greenLight,
    activeTintColor: colors.black,
    inactiveTintColor: colors.white,
    activeBackgroundColor: colors.greenLight,
    inactiveBackgroundColor: colors.greenDark
  },
  navHeader: {
    backgroundColor: colors.greenLight,
    inactiveTintColor: colors.middle,
    activeTintColor: colors.white, // buttons and title if is the same
    buttonsColor: colors.white, // specify buttons color
    titleColor: colors.white, // specify title color
    searchBarBackground: colors.white
  },
  bottomTabs: {
    backgroundColor: colors.dark
  },
  text: {
    defaultText: colors.dark,
    listItemTitle: colors.greenLight,
    detailTitle: colors.greenLight
  },
  listItemSeparator: colors.light,
  listItemIcon: colors.dark,
  detailItemBorder: colors.black,
  accordion: {
    headerColor: colors.light,
    text: colors.dark,
    icon: colors.dark,
    separator: colors.dark
  },
  mainButton: {
    background: colors.greenLight,
    disabledBackground: colors.middle,
    text: colors.white,
    icon: colors.white
  },
  wheelPicker: {
    toolbarBackgroundColor: colors.greenLight,
    confirmTextColor: colors.white
  },
  checkbox: colors.greenLight,
  svgMarkers: {
    primary: colors.greenLight,
    secondary: colors.greenDark
  },
  noData: colors.greenLight,
  dashBoard: {
    cardBg: colors.greenLight,
    icon: colors.white,
    title: colors.white,
    phoneBtnBg: colors.dark
  },
  swiper: {
    dot: colors.greenLight,
    activeDot: colors.white
  },
  infoToast: {
    backgrournd: colors.dark,
    text: colors.greenDark,
    buttonText: colors.white
  },
  input: {
    background: colors.dark,
    text: colors.dark,
    border: colors.dark,
    placeholder: colors.middle
  },
  map: {
    universalMarker: colors.greenLight
  }
};

export default usedColors;
