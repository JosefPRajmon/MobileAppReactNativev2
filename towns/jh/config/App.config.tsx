// Configs
import { NewsConfig } from "./modules/News.config";
import { OnSiteConfig } from "./modules/OnSite.config";
import { EventsConfig } from "./modules/Events.config";
import { ContactsConfig } from "./modules/Contacts.config";
import { BoardConfig } from "./modules/Board.config";
import { AboutAppConfig } from "./modules/AboutApp.config";
import { PlacesConfig } from "./modules/Places.config";
import { NoticesConfig } from "./modules/Notices.config";
import { HelplinesConfig } from "./modules/Helplines.config";
import { ReportsConfig } from "./modules/Reports.config";

// Navigators
import NewsStackNavigator from "../navigation/navigators/NewsStackNavigator";
import OnSiteStackNavigator from "../navigation/navigators/OnSiteStackNavigator";
import EventsStackNavigator from "../navigation/navigators/EventsStackNavigator";
import BoardStackNavigator from "../navigation/navigators/BoardStackNavigator";
import ContactsTabsNavigator from "../navigation/navigators/ContactsTabsNavigator";
import AboutAppStackNavigator from "../navigation/navigators/AboutAppStackNavigator";
import NoticesStackNavigator from "../navigation/navigators/NoticesStackNavigator";
import PlacesStackNavigator from "../navigation/navigators/PlacesTabsNavigator";
import HelplinesStackNavigator from "../navigation/navigators/HelplinesStackNavigator";
import ReportsStackNavigator from "../navigation/navigators/ReportsStackNavigator";

export type AppModule = {
  config: Object;
  navigator: () => JSX.Element;
  env: Object | undefined;
};

// Enabled pokud je v tomto objektu
export const AppModules: any = {
  news: {
    config: NewsConfig,
    navigator: NewsStackNavigator
  },
  onSite: {
    config: OnSiteConfig,
    navigator: OnSiteStackNavigator
  },
  events: {
    config: EventsConfig,
    navigator: EventsStackNavigator
  },
  board: {
    config: BoardConfig,
    navigator: BoardStackNavigator,
    env: { appID: 2202, clanek: 271612, slozka: 50453 }
  },
  contacts: {
    config: ContactsConfig,
    navigator: ContactsTabsNavigator
  },
  // check
  helplines: {
    config: HelplinesConfig,
    navigator: HelplinesStackNavigator
  },
  places: {
    config: PlacesConfig,
    navigator: PlacesStackNavigator,
    env: { hkatIDs: "3,4,36,28,30,26" }
  },
  // check
  notices: {
    config: NoticesConfig,
    navigator: NoticesStackNavigator,
    env: { appID: 2691 }
  },
  reports: {
    config: ReportsConfig,
    navigator: ReportsStackNavigator
  },
  aboutApp: {
    config: AboutAppConfig,
    navigator: AboutAppStackNavigator
  }
};

export const AppConfig: any = {
  isDev: true,
  appID: "cz.as4u.mmvm.jh",
  releaseChannel: "jh",
  forceUpdate: false,
  openDrawerStartup: false,
  homeScreenLogo: "main",
  drawerLogo: "main",
  useHomeScreen: true,
  homeScreenHeaderInfoAsRow: false,
  disableYellowBox: true,
  useMenuCategories: true,
  initialModule: "news",
  enableNotifications: false,
  statusbarStyle: "light",
  updatesEnabled: true,
  notificationEndpoint: "mobile/notification.php?akce=set",
  notificationEndpointTest: "http://192.168.0.216:3001/token",
  domainUrl: "https://www.jh.cz/",
  domainTestUrl: '"http://test.as4u.local/',
  database: {
    name: "_jh.db",
    version: "1.0",
    displayName: "JH_DB",
    location: "default"
  },
  navHeader: {
    showHeader: true,
    useLogo: false
  },
  aboutApp: {
    appName: "Jindřichův Hradec v mobilu",
    buildDate: "27.3.2023",
    developerEmail: "mobileapp@as4u.cz",
    developerWeb: { pretty: "www.as4u.cz", link: "http://www.as4u.cz" }
  },
  aboutTown: {
    title: "Městský úřad Jindřichův Hradec",
    address: "Klášterská 135/II, 377 01 Jindřichův Hradec",
    phone: "384 351 111",
    web: {
      pretty: "www.jh.cz",
      link: "https://www.jh.cz/"
    },
    email: "podatelna@jh.cz",
    gdpr: {
      pretty: "Ochrana osobních údajů",
      link: "https://www.jh.cz/gdpr/"
    }
  },
  map: {
    mapCenter: {
      latitude: 49.14736,
      longitude: 15.00206
    },
    mapZoom: 10,
    mapDelta: 0.005,
    initMapType: "standard"
  },
  menuItems: [
    {
      title: "menu-category-title-informations",
      items: [
        { module: AppModules.news },
        { module: AppModules.onSite },
        { module: AppModules.events },
        { module: AppModules.board }
      ]
    },
    {
      title: "menu-category-title-usable",
      items: [
        { module: AppModules.contacts },
        { module: AppModules.helplines },
        { module: AppModules.reports, title: "screen-title-reports-2" },
        { module: AppModules.notices }
      ]
    },
    {
      title: "menu-category-title-tourist",
      items: [
        // Modul o městě (tourist_info)
        {
          module: AppModules.places,
          title: "screen-title-places-jh-to-nej",
          iconName: "star",
          pageID: "best",
          hkatID: 26,
          disableCatFilter: true
        },
        {
          module: AppModules.places,
          title: "screen-title-places-jh-pesky",
          iconName: "trips",
          pageID: "walk_bike",
          hkatID: 30,
          disableCatFilter: true
        },
        {
          module: AppModules.places,
          title: "screen-title-places-jh-sport",
          iconName: "sport",
          pageID: "sport",
          hkatID: 28,
          disableCatFilter: true
        },
        {
          module: AppModules.places,
          title: "screen-title-places-jh-pouzij",
          iconName: "guard",
          pageID: "use_jh",
          hkatID: 36
        },
        {
          module: AppModules.places,
          title: "screen-title-places-hotels",
          iconName: "hotels",
          pageID: "hotels",
          hkatID: 3
        },
        {
          module: AppModules.places,
          title: "screen-title-places-restaurants",
          iconName: "restaurants",
          pageID: "restaurants",
          hkatID: 4
        }
      ]
    },
    {
      title: "menu-category-title-mmvm",
      items: [{ module: AppModules.aboutApp }]
    }
  ]
};
