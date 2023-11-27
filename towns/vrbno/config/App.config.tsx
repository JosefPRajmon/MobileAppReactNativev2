// Configs
import { NewsConfig } from "./modules/News.config";
import { OnSiteConfig } from "./modules/OnSite.config";
import { EventsConfig } from "./modules/Events.config";
import { ContactsConfig } from "./modules/Contacts.config";
import { SituationsConfig } from "./modules/Situations.config";
import { ReportsConfig } from "./modules/Reports.config";
import { AboutAppConfig } from "./modules/AboutApp.config";
import { NoticesConfig } from "./modules/Notices.config";

// Navigators
import NewsStackNavigator from "../navigation/navigators/NewsStackNavigator";
import OnSiteStackNavigator from "../navigation/navigators/OnSiteStackNavigator";
import EventsStackNavigator from "../navigation/navigators/EventsStackNavigator";
import ContactsTabsNavigator from "../navigation/navigators/ContactsTabsNavigator";
import SituationsStackNavigator from "../navigation/navigators/SituationsStackNavigator";
import AboutAppStackNavigator from "../navigation/navigators/AboutAppStackNavigator";
import ReportsStackNavigator from "../navigation/navigators/ReportsStackNavigator";
import NoticesStackNavigator from "../navigation/navigators/NoticesStackNavigator";
import { WebviewConfig } from "./modules/Webview.config";
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
  contacts: {
    config: ContactsConfig,
    navigator: ContactsTabsNavigator
  },
  situations: {
    config: SituationsConfig,
    navigator: SituationsStackNavigator,
    env: { appID: 1141 }
  },
  notices: {
    config: NoticesConfig,
    navigator: NoticesStackNavigator,
    env: { appID: 3431 }
  },
  webview: {
    config: WebviewConfig,
    navigator: WebviewStackNavigator
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
  isDev: false,
  appID: "cz.as4u.mmvm.vrbno",
  releaseChannel: "vrbno",
  forceUpdate: false,
  openDrawerStartup: false,
  homeScreenLogo: "main",
  drawerLogo: "alternative",
  useHomeScreen: true,
  homeScreenHeaderInfoAsRow: false,
  disableYellowBox: true,
  useMenuCategories: false,
  initialModule: "news",
  enableNotifications: false,
  statusbarStyle: "light",
  updatesEnabled: true,
  notificationEndpoint: "mobile/notification.php?akce=set",
  notificationEndpointTest: "http://192.168.0.216:3001/token",
  domainUrl: "https://www.vrbnopp.cz/",
  domainTestUrl: '"http://test.as4u.local/',
  database: {
    name: "vrbno.db",
    version: "1.0",
    displayName: "VRBNO_DB",
    location: "default"
  },
  navHeader: {
    showHeader: true,
    useLogo: true
  },
  aboutApp: {
    appName: "Vrbno v mobilu",
    buildDate: "27.4.2023",
    developerEmail: "mobileapp@as4u.cz",
    developerWeb: { pretty: "www.as4u.cz", link: "http://www.as4u.cz" }
  },
  aboutTown: {
    title: "Městský úřad Vrbno pod Pradědem",
    address: "Nádražní 389, 793 26 Vrbno pod Pradědem",
    phone: "554 795 111",
    web: {
      pretty: "www.vrbnopp.cz",
      link: "https://www.vrbnopp.cz/"
    },
    email: "podatelna@vrbnopp.cz",
    gdpr: {
      pretty: "Ochrana osobních údajů",
      link: "https://www.vrbnopp.cz/cs/mesto-a-urad/povinne-zverejnovane-informace/zasady-zpracovani-osobnich-udaju-v-mobilni-aplikaci-vrbno-v-mobilu.html"
    }
  },
  map: {
    mapCenter: {
      latitude: 50.118149,
      longitude: 17.3842625
    },
    mapZoom: 10,
    mapDelta: 0.005,
    initMapType: "standard"
  },
  menuItems: [
    {
      items: [
        { module: AppModules.news },
        { module: AppModules.onSite },
        { module: AppModules.events },
        { module: AppModules.contacts },
        { module: AppModules.situations },
        { module: AppModules.notices },
        {
          module: AppModules.webview,
          pageID: "webview_reservation",
          title: "screen-title-reservation-2",
          env: { link: "https://portal.vrbnopp.cz" }
        },
        { module: AppModules.reports },
        { module: AppModules.aboutApp }
      ]
    }
  ]
};
