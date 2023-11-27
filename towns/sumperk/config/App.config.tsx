// Configs
import { NewsConfig } from "./modules/News.config";
import { OnSiteConfig } from "./modules/OnSite.config";
import { EventsConfig } from "./modules/Events.config";
import { ContactsConfig } from "./modules/Contacts.config";
import { SituationsConfig } from "./modules/Situations.config";
//import { HelplinesConfig } from './modules/Helplines.config';
import { BoardConfig } from "./modules/Board.config";
import { ReportsConfig } from "./modules/Reports.config";
import { AboutAppConfig } from "./modules/AboutApp.config";
//import { TouristInfoConfig } from './modules/TouristInfo.config';
import { PlacesConfig } from "./modules/Places.config";
//import { NoticesConfig } from './modules/Notices.config';
//import { ThematicMapConfig } from './modules/ThematicMap.config';
import { SettingsConfig } from "./modules/Settings.config";
import { ReservationConfig } from "./modules/Reservation.config";
import { GuardConfig } from "./modules/Guard.config";
import { WebviewConfig } from "./modules/Webview.config";

// Navigators
import NewsStackNavigator from "../navigation/navigators/NewsStackNavigator";
import OnSiteStackNavigator from "../navigation/navigators/OnSiteStackNavigator";
import EventsStackNavigator from "../navigation/navigators/EventsStackNavigator";
import BoardStackNavigator from "../navigation/navigators/BoardStackNavigator";
import ContactsTabsNavigator from "../navigation/navigators/ContactsTabsNavigator";
import SituationsStackNavigator from "../navigation/navigators/SituationsStackNavigator";
//import HelplinesStackNavigator from '../navigation/navigators/HelplinesStackNavigator';
import AboutAppStackNavigator from "../navigation/navigators/AboutAppStackNavigator";
import ReportsStackNavigator from "../navigation/navigators/ReportsStackNavigator";
//import NoticesStackNavigator from '../navigation/navigators/NoticesStackNavigator';
//import ThematicMapNavigator from '../navigation/navigators/ThematicMapNavigator';
//import TouristInfoStackNavigator from '../navigation/navigators/TouristInfoStackNavigator';
import SettingsStackNavigator from "../navigation/navigators/SettingsStackNavigator";
import ReservationStackNavigator from "../navigation/navigators/ReservationStackNavigator";
import GuardStackNavigator from "../navigation/navigators/GuardStackNavigator";
import PlacesTabsNavigator from "../navigation/navigators/PlacesTabsNavigator";
import WebviewStackNavigator from "../navigation/navigators/WebviewStackNavigator";

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
    env: { appID: 1126, clanek: 78004, slozka: 63793 }
  },
  contacts: {
    config: ContactsConfig,
    navigator: ContactsTabsNavigator
  },
  situations: {
    config: SituationsConfig,
    navigator: SituationsStackNavigator,
    env: { appID: 1140 }
  },
  guard: {
    config: GuardConfig,
    navigator: GuardStackNavigator,
    env: { appID: 3332 }
  },
  webview: {
    config: WebviewConfig,
    navigator: WebviewStackNavigator
  },
  reports: {
    config: ReportsConfig,
    navigator: ReportsStackNavigator
  },
  reservation: {
    config: ReservationConfig,
    navigator: ReservationStackNavigator,
    env: { sbsapp: 2483, portal: 972 }
  },
  places: {
    config: PlacesConfig,
    navigator: PlacesTabsNavigator,
    env: { hkatIDs: "3,8,22,6,5,9" }
  },
  settings: {
    config: SettingsConfig,
    navigator: SettingsStackNavigator
  },
  aboutApp: {
    config: AboutAppConfig,
    navigator: AboutAppStackNavigator
  }
};

export const AppConfig: any = {
  isDev: true,
  appID: "cz.as4u.mmvm.sumperk",
  releaseChannel: "sumperk",
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
  domainUrl: "https://www.sumperk.cz/",
  domainTestUrl: '"http://test.as4u.local/',
  database: {
    name: "_sumperk.db",
    version: "1.0",
    displayName: "SUMPERK_DB",
    location: "default"
  },
  navHeader: {
    showHeader: true,
    useLogo: false
  },
  aboutApp: {
    appName: "Šumperk v mobilu",
    buildDate: "17.4.2023",
    developerEmail: "mobileapp@as4u.cz",
    developerWeb: { pretty: "www.as4u.cz", link: "http://www.as4u.cz" }
  },
  aboutTown: {
    title: "Městský úřad Šumperk",
    address: "náměstí Míru 1, 787 01 Šumperk",
    phone: "583 388 111",
    web: {
      pretty: "www.sumperk.cz",
      link: "https://www.sumperk.cz/"
    },
    email: "posta@sumperk.cz",
    gdpr: {
      pretty: "Ochrana osobních údajů",
      link: "https://www.sumperk.cz/gdpr-mobile"
    }
  },
  map: {
    mapCenter: {
      latitude: 49.965687,
      longitude: 16.976771
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
        {
          module: AppModules.webview,
          title: "screen-title-smart-city",
          iconName: "demands",
          env: { link: "https://www.selectsystem.cz/smart-city" }
        },
        { module: AppModules.onSite },
        { module: AppModules.events },
        { module: AppModules.board },
        {
          module: AppModules.places,
          title: "screen-title-places-firms",
          iconName: "firms",
          pageID: "firms",
          hkatID: 9
        }
      ]
    },
    {
      title: "menu-category-title-citizen",
      items: [
        { module: AppModules.contacts },
        {
          module: AppModules.situations,
          title: "screen-title-needs"
        },
        { module: AppModules.guard },
        { module: AppModules.reports },
        { module: AppModules.reservation }
      ]
    },
    {
      title: "menu-category-title-tourist",
      items: [
        {
          module: AppModules.places,
          title: "screen-title-places-interests",
          iconName: "interests",
          pageID: "interests",
          hkatID: 5
        },
        {
          module: AppModules.places,
          title: "screen-title-places-culture",
          iconName: "culture",
          pageID: "culture",
          hkatID: 6
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
          hkatID: 22
        },
        {
          module: AppModules.places,
          title: "screen-title-places-sport",
          iconName: "sport",
          pageID: "sport",
          hkatID: 8
        }
      ]
    },
    {
      title: "menu-category-title-mmvm",
      items: [{ module: AppModules.settings }, { module: AppModules.aboutApp }]
    }
  ]
};
