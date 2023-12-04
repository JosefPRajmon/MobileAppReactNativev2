// Configs
import { NewsConfig } from './modules/News.config';
import { OnSiteConfig } from './modules/OnSite.config';
import { EventsConfig } from './modules/Events.config';
import { ContactsConfig } from './modules/Contacts.config';
 import { SituationsConfig } from './modules/Situations.config';
import { BoardConfig } from './modules/Board.config';
import { ReportsConfig } from './modules/Reports.config';
import { AboutAppConfig } from './modules/AboutApp.config';
import { NoticesConfig } from './modules/Notices.config';
import { SettingsConfig } from './modules/Settings.config';

// Navigators
import NewsStackNavigator from '../navigation/navigators/NewsStackNavigator';
import OnSiteStackNavigator from '../navigation/navigators/OnSiteStackNavigator';
import EventsStackNavigator from '../navigation/navigators/EventsStackNavigator';
import BoardStackNavigator from '../navigation/navigators/BoardStackNavigator';
import ContactsTabsNavigator from '../navigation/navigators/ContactsTabsNavigator';
 import SituationsStackNavigator from '../navigation/navigators/SituationsStackNavigator';
import AboutAppStackNavigator from '../navigation/navigators/AboutAppStackNavigator';
import ReportsStackNavigator from '../navigation/navigators/ReportsStackNavigator';
import NoticesStackNavigator from '../navigation/navigators/NoticesStackNavigator';
import SettingsStackNavigator from '../navigation/navigators/SettingsStackNavigator';

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
    navigator: OnSiteStackNavigator,
    title: 'screen-title-onsite-2'
  },
  events: {
    config: EventsConfig,
    navigator: EventsStackNavigator
  },
  board: {
    config: BoardConfig,
    navigator: BoardStackNavigator,
    env: { appID: 2136, clanek: 47101, slozka: 47816 }
  },
  contacts: {
    config: ContactsConfig,
    navigator: ContactsTabsNavigator
  },
   situations: {
    config: SituationsConfig,
    navigator: SituationsStackNavigator,
    env: { appID: 2148 }
  }, 
  notices: {
    config: NoticesConfig,
    navigator: NoticesStackNavigator,
    env: { appID: 2800 }
  },
  reports: {
    config: ReportsConfig,
    navigator: ReportsStackNavigator,
    title: 'screen-title-reports-2'
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
  isDev: false,
  appID: 'cz.as4u.mmvm.litovel',
  releaseChannel: 'litovel',
  forceUpdate: false,
  openDrawerStartup: false,
  homeScreenLogo: 'main',
  drawerLogo: 'main',
  useHomeScreen: true,
  disableYellowBox: true,
  useMenuCategories: false,
  initialModule: 'news',
  enableNotifications: false,
  statusbarStyle: 'dark',
  updatesEnabled: true,
  notificationEndpoint: 'mobile/notification.php?akce=set',
  notificationEndpointTest: 'http://192.168.0.216:3001/token',
  domainUrl: 'https://www.litovel.eu/',
  domainTestUrl: '"http://test.as4u.local/',
  database: {
    name: 'litovel.db',
    version: '1.0',
    displayName: 'LITOVEL_DB',
    location: 'default'
  },
  navHeader: {
    showHeader: true,
    useLogo: true
  },
  aboutApp: {
    appName: 'Litovel v mobilu',
    buildDate: '19.1.2022',
    developerEmail: 'mobileapp@as4u.cz',
    developerWeb: { pretty: 'www.as4u.cz', link: 'http://www.as4u.cz' }
  },
  aboutTown: {
    title: 'Městský úřad Litovel',
    address: 'nám. Přemysla Otakara 778, 784 01 Litovel',
    phone: '585 153 111',
    web: {
      pretty: 'www.litovel.eu/',
      link: 'https://www.litovel.eu/'
    },
    email: 'e-podatelna@mestolitovel.cz',
    gdpr: {
      pretty: 'Ochrana osobních údajů',
      link: 'https://www.litovel.eu/cs/o-webu/zasady-ochrany-osobnich-udaju.html'
    }
  },
  map: {
    mapCenter: {
      latitude: 49.701631,
      longitude: 17.075023
    },
    mapZoom: 10,
    mapDelta: 0.005,
    initMapType: 'standard'
  },
  menuItems: [
    {
      items: [
            { module: AppModules.news },
            { module: AppModules.onSite },
            { module: AppModules.onSite },
            { module: AppModules.events },
            { module: AppModules.board },
            { module: AppModules.contacts },
            { module: AppModules.situations }, 
            { module: AppModules.notices },
            { module: AppModules.reports },
            { module: AppModules.settings },
            { module: AppModules.aboutApp }
      ]
    }
  ]

};
