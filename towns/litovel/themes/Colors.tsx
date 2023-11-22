// cz.as4u.mmvm.litovel
const colors = {
  blueDark: '#006AB3',
  blueLight: '#009ee0',
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
    headerBg: colors.greyLight,
    headerText: colors.black,
    menuBg: colors.white,
    categoryText: colors.black,
    itemsBorderColor: colors.greyDark,
    itemIconInactive: colors.blueDark,
    itemIconActive: colors.white,
    itemTextInactive: colors.blueDark,
    itemTextActive: colors.white,
    itemBgInactive: colors.white,
    itemBgActive: colors.blueDark
  },
  navHeader: {
    backgroundColor: colors.blueDark,
    inactiveTintColor: colors.greyLight,
    activeTintColor: colors.blueLight, // buttons and title if is the same
    buttonsColor: colors.white, // specify buttons color
    titleColor: colors.white, // specify title color
    searchBarBackground: colors.white
  },
  bottomTabs: {
    backgroundColor: colors.greyDark
  },
  dashBoard: {
    screenBg: colors.white,
    headerBg: colors.greyLight,
    headerPhoneIconBorder: colors.blueDark,
    headerPhoneIconBg: colors.white,
    headerPhoneIcon: colors.blueDark,
    headerPhoneTextBorder: colors.blueDark,
    headerPhoneTextBg: colors.blueDark,
    headerPhoneText: colors.white,
    headerAddressText: colors.black,
    cardBg: colors.blueDark,
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
