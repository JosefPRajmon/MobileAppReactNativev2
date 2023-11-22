// Sumperk
const colors = {
  blueLight: "#0079cc",
  blueDark: "#006ab3",
  yellow: "#efd52c",
  white: "#ffffff",
  black: "#000000",
  greyLight: "#ececec",
  greyMedium: "#777777",
  greyDark: "#333333"
};

const usedColors = {
  main: colors.blueLight,
  appBackround: colors.white,
  statusBar: colors.blueLight,
  filterButtonsContainerBg: colors.greyDark,
  navDrawer: {
    headerBg: colors.blueLight,
    headerText: colors.white,
    menuBg: colors.blueDark,
    categoryText: colors.white,
    itemsBorderColor: colors.greyMedium,
    itemIconInactive: colors.white,
    itemIconActive: colors.yellow,
    itemTextInactive: colors.white,
    itemTextActive: colors.yellow,
    itemBgInactive: colors.blueDark,
    itemBgActive: colors.blueLight
  },
  navHeader: {
    backgroundColor: colors.blueLight,
    inactiveTintColor: colors.greyMedium,
    activeTintColor: colors.white, // buttons and title if is the same
    buttonsColor: colors.white, // specify buttons color
    titleColor: colors.white, // specify title color
    searchBarBackground: colors.white
  },
  dashBoard: {
    screenBg: colors.white,
    headerBg: colors.blueLight,
    headerPhoneIconBorder: colors.white,
    headerPhoneIconBg: colors.greyDark,
    headerPhoneIcon: colors.yellow,
    headerPhoneTextBorder: colors.greyDark,
    headerPhoneTextBg: colors.greyDark,
    headerPhoneText: colors.white,
    headerAddressText: colors.white,
    cardBg: colors.blueLight,
    cardIcon: colors.white,
    cardTitle: colors.white
  },
  bottomTabs: {
    backgroundColor: colors.greyDark
  },
  text: {
    defaultText: colors.greyDark,
    listItemTitle: colors.blueLight,
    detailTitle: colors.blueLight,
    detailCategory: colors.blueLight
  },
  listItemSeparator: colors.greyMedium,
  listItemIcon: colors.blueLight,
  detailItemBorder: colors.greyDark,
  accordion: {
    headerColor: colors.greyLight,
    text: colors.black,
    icon: colors.black,
    separator: colors.greyDark
  },
  mainButton: {
    background: colors.blueLight,
    disabledBackground: colors.blueDark,
    text: colors.white,
    icon: colors.white
  },
  wheelPicker: {
    toolbarBackgroundColor: colors.blueLight,
    confirmTextColor: colors.white
  },
  checkbox: colors.blueLight,
  svgMarkers: {
    primary: colors.blueLight,
    secondary: colors.blueDark
  },
  noData: colors.blueLight,
  swiper: {
    dot: colors.blueLight,
    activeDot: colors.white
  },
  infoToast: {
    backgrournd: colors.greyDark,
    text: colors.blueDark,
    buttonText: colors.white
  },
  input: {
    background: colors.greyDark,
    text: colors.greyDark,
    border: colors.greyDark,
    placeholder: colors.greyMedium
  },
  map: {
    universalMarker: colors.blueLight
  }
};

export default usedColors;
