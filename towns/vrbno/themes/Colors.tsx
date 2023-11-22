// Jablonec
const colors = {
  blueDark: '#083061',
  blueMedium: '#036cad',
  blueLight: '#0094df',
  green: '#85c226',
  white: '#ffffff',
  black: '#000000',
  greyLight: '#ececec',
  greyMedium: '#777777',
  greyDark: '#333333'
};

const usedColors = {
  main: colors.blueDark,
  appBackround: colors.white,
  statusBar: colors.blueDark,
  filterButtonsContainerBg: colors.greyLight,
  navDrawer: {
    headerBg: colors.blueDark,
    headerText: colors.white,
    menuBg: colors.blueDark,
    categoryText: colors.white,
    itemsBorderColor: colors.blueMedium,
    itemIconInactive: colors.green,
    itemIconActive: colors.blueDark,
    itemTextInactive: colors.white,
    itemTextActive: colors.black,
    itemBgInactive: colors.blueDark,
    itemBgActive: colors.green
  },
  navHeader: {
    backgroundColor: colors.blueDark,
    inactiveTintColor: colors.greyLight,
    activeTintColor: colors.green, // buttons and title if is the same
    buttonsColor: colors.green, // specify buttons color
    titleColor: colors.white, // specify title color
    searchBarBackground: colors.white
  },
  bottomTabs: {
    backgroundColor: colors.greyDark
  },
  dashBoard: {
    screenBg: colors.blueLight,
    headerBg: colors.blueDark,
    headerPhoneIconBorder: colors.green,
    headerPhoneIconBg: colors.blueDark,
    headerPhoneIcon: colors.green,
    headerPhoneTextBorder: colors.green,
    headerPhoneTextBg: colors.green,
    headerPhoneText: colors.black,
    headerAddressText: colors.white,
    cardBg: colors.blueMedium,
    cardIcon: colors.white,
    cardTitle: colors.white
  },
  text: {
    defaultText: colors.greyDark,
    listItemTitle: colors.blueDark,
    detailTitle: colors.blueDark,
    detailCategory: colors.blueDark
  },
  listItemSeparator: colors.greyMedium,
  listItemIcon: colors.blueDark,
  detailItemBorder: colors.greyDark,
  accordion: {
    headerColor: colors.greyLight,
    text: colors.black,
    icon: colors.black,
    separator: colors.greyDark
  },
  mainButton: {
    background: colors.blueDark,
    disabledBackground: colors.greyDark,
    text: colors.white,
    icon: colors.white
  },
  wheelPicker: {
    toolbarBackgroundColor: colors.blueDark,
    confirmTextColor: colors.white
  },
  checkbox: colors.blueDark,
  svgMarkers: {
    primary: colors.blueDark,
    secondary: colors.blueLight
  },
  noData: colors.blueDark,
  swiper: {
    dot: colors.blueDark,
    activeDot: colors.white
  },
  infoToast: {
    backgrournd: colors.blueLight,
    text: colors.white,
    buttonText: colors.white
  },
  input: {
    background: colors.white,
    text: colors.greyDark,
    border: colors.blueDark,
    placeholder: colors.greyMedium
  },
  map: {
    universalMarker: colors.blueDark
  }
};

export default usedColors;
