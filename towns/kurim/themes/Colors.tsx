// Jablonec
const colors = {
  greyLight: '#bbbbbb',
  greyMedium: '#777777',
  greyDark: '#363636',
  red: '#E4342D',
  yellow: '#FDCC19',
  blue: '#0096D1',
  white: '#ffffff',
  black: '#000000'
};

const usedColors = {
  main: colors.white,
  appBackround: colors.white,
  statusBar: colors.greyDark,
  filterButtonsContainerBg: colors.greyDark,
  navDrawer: {
    headerBg: colors.greyDark,
    headerText: colors.white,
    menuBg: colors.greyLight,
    categoryText: colors.black,
    itemsBorderColor: colors.greyMedium,
    itemIconInactive: colors.black,
    itemIconActive: colors.white,
    itemTextInactive: colors.black,
    itemTextActive: colors.white,
    itemBgInactive: colors.greyLight,
    itemBgActive: colors.greyDark
  },
  navHeader: {
    backgroundColor: colors.greyDark,
    inactiveTintColor: colors.greyLight,
    activeTintColor: colors.white, // buttons and title if is the same
    buttonsColor: colors.white, // specify buttons color
    titleColor: colors.white, // specify title color
    searchBarBackground: colors.white
  },
  dashBoard: {
    screenBg: colors.white,
    headerBg: colors.greyDark,
    headerPhoneIconBorder: colors.white,
    headerPhoneIconBg: colors.greyDark,
    headerPhoneIcon: colors.white,
    headerPhoneTextBorder: colors.greyDark,
    headerPhoneTextBg: colors.white,
    headerPhoneText: colors.greyDark,
    headerAddressText: colors.white,
    cardBg: colors.greyLight,
    cardIcon: colors.black,
    cardTitle: colors.black
  },
  bottomTabs: {
    backgroundColor: colors.greyDark
  },
  text: {
    defaultText: colors.greyDark,
    listItemTitle: colors.red,
    detailTitle: colors.red,
    detailCategory: colors.red
  },
  listItemSeparator: colors.greyLight,
  listItemIcon: colors.greyDark,
  detailItemBorder: colors.black,
  accordion: {
    headerColor: colors.greyLight,
    text: colors.black,
    icon: colors.black,
    separator: colors.greyDark
  },
  mainButton: {
    background: colors.red,
    disabledBackground: colors.greyLight,
    text: colors.white,
    icon: colors.white
  },
  wheelPicker: {
    toolbarBackgroundColor: colors.greyLight,
    confirmTextColor: colors.white
  },
  checkbox: colors.red,
  svgMarkers: {
    primary: colors.greyLight,
    secondary: colors.greyDark
  },
  noData: colors.greyLight,
  swiper: {
    dot: colors.greyLight,
    activeDot: colors.white
  },
  infoToast: {
    backgrournd: colors.greyDark,
    text: colors.greyDark,
    buttonText: colors.white
  },
  input: {
    background: colors.greyDark,
    text: colors.greyDark,
    border: colors.greyDark,
    placeholder: colors.greyDark
  },
  map: {
    universalMarker: colors.greyLight
  }
};

export default usedColors;
