// Prostejov
const colors = {
  blue: '#1c71c2',
  yellow: '#ffd100',
  white: '#ffffff',
  light: '#cccccc',
  black: '#000000',
  middle: '#777777',
  dark: '#333333'
};

const usedColors = {
  main: colors.blue,
  appBackround: colors.white,
  statusBar: colors.blue,
  filterButtonsContainerBg: colors.dark,
  navDrawer: {
    headerBg: colors.blue,
    headerText: colors.white,
    menuBg: colors.yellow,
    categoryText: colors.black,
    itemsBorderColor: colors.black,
    itemIconInactive: colors.black,
    itemIconActive: colors.white,
    itemTextInactive: colors.black,
    itemTextActive: colors.white,
    itemBgInactive: colors.yellow,
    itemBgActive: colors.blue
  },
  navHeader: {
    backgroundColor: colors.blue,
    inactiveTintColor: colors.light,
    activeTintColor: colors.yellow, // buttons and title if is the same
    buttonsColor: colors.white, // specify buttons color
    titleColor: colors.white, // specify title color
    searchBarBackground: colors.white
  },
  bottomTabs: {
    backgroundColor: colors.dark
  },
  text: {
    defaultText: colors.dark,
    listItemTitle: colors.blue,
    detailTitle: colors.blue,
    detailCategory: colors.blue
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
    background: colors.blue,
    text: colors.white,
    icon: colors.white
  },
  wheelPicker: {
    toolbarBackgroundColor: colors.blue,
    confirmTextColor: colors.white
  },
  checkbox: colors.blue,
  svgMarkers: {
    primary: colors.blue,
    secondary: colors.yellow
  },
  noData: colors.blue,
  dashBoard: {
    screenBg: colors.white,
    headerBg: colors.blue,
    headerPhoneIconBorder: colors.yellow,
    headerPhoneIconBg: colors.dark,
    headerPhoneIcon: colors.yellow,
    headerPhoneTextBorder: colors.dark,
    headerPhoneTextBg: colors.dark,
    headerPhoneText: colors.white,
    headerAddressText: colors.white,
    cardBg: colors.blue,
    cardIcon: colors.yellow,
    cardTitle: colors.white
  },
  swiper: {
    dot: colors.blue,
    activeDot: colors.white
  },
  infoToast: {
    backgrournd: colors.dark,
    text: colors.yellow,
    buttonText: colors.white
  },
  map: {
    universalMarker: colors.blue
  },
  input: {
    background: colors.dark,
    text: colors.dark
  }
};

export default usedColors;
