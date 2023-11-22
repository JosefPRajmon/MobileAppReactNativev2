// Sumperk
const colors = {
  redLight: '#D70912',
  redDark: '#8A060C',
  white: '#ffffff',
  black: '#000000',
  greyLight: '#ececec',
  greyMedium: '#777777',
  greyDark: '#333333'
};

const usedColors = {
  main: colors.redLight,
  appBackround: colors.white,
  statusBar: colors.redLight,
  filterButtonsContainerBg: colors.greyDark,
  navDrawer: {
    headerBg: colors.redLight,
    headerText: colors.white,
    menuBg: colors.redDark,
    categoryText: colors.greyLight,
    itemsBorderColor: colors.redLight,
    itemIconInactive: colors.white,
    itemIconActive: colors.black,
    itemTextInactive: colors.white,
    itemTextActive: colors.black,
    itemBgInactive: colors.redDark,
    itemBgActive: colors.redLight
  },
  navHeader: {
    backgroundColor: colors.redLight,
    inactiveTintColor: colors.greyMedium,
    activeTintColor: colors.white, // buttons and title if is the same
    buttonsColor: colors.white, // specify buttons color
    titleColor: colors.white, // specify title color
    searchBarBackground: colors.white
  },
  dashBoard: {
    screenBg: colors.white,
    headerBg: colors.redLight,
    headerPhoneIconBorder: colors.white,
    headerPhoneIconBg: colors.greyDark,
    headerPhoneIcon: colors.white,
    headerPhoneTextBorder: colors.greyDark,
    headerPhoneTextBg: colors.greyDark,
    headerPhoneText: colors.white,
    headerAddressText: colors.white,
    cardBg: colors.redLight,
    cardIcon: colors.white,
    cardTitle: colors.white
  },
  bottomTabs: {
    backgroundColor: colors.greyDark
  },
  text: {
    defaultText: colors.greyDark,
    listItemTitle: colors.redLight,
    detailTitle: colors.redLight,
    detailCategory: colors.redLight
  },
  listItemSeparator: colors.greyMedium,
  listItemIcon: colors.redLight,
  detailItemBorder: colors.greyDark,
  accordion: {
    headerColor: colors.greyLight,
    text: colors.black,
    icon: colors.black,
    separator: colors.greyDark
  },
  mainButton: {
    background: colors.redLight,
    disabledBackground: colors.redDark,
    text: colors.white,
    icon: colors.white
  },
  wheelPicker: {
    toolbarBackgroundColor: colors.redLight,
    confirmTextColor: colors.white
  },
  checkbox: colors.redLight,
  svgMarkers: {
    primary: colors.redLight,
    secondary: colors.redDark
  },
  noData: colors.redLight,
  swiper: {
    dot: colors.redLight,
    activeDot: colors.white
  },
  infoToast: {
    backgrournd: colors.greyDark,
    text: colors.redDark,
    buttonText: colors.white
  },
  input: {
    background: colors.greyDark,
    text: colors.greyDark,
    border: colors.greyDark,
    placeholder: colors.greyMedium
  },
  map: {
    universalMarker: colors.redLight
  }
};

export default usedColors;
