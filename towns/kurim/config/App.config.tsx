// Configs
import { NewsConfig } from './modules/News.config';
import { OnSiteConfig } from './modules/OnSite.config';
import { ContactsConfig } from './modules/Contacts.config';
import { SituationsConfig } from './modules/Situations.config';
import { BoardConfig } from './modules/Board.config';
import { ReportsConfig } from './modules/Reports.config';
import { AboutAppConfig } from './modules/AboutApp.config';
import { NoticesConfig } from './modules/Notices.config';
import { WebviewConfig } from './modules/Webview.config';

// Navigators
import NewsStackNavigator from '../navigation/navigators/NewsStackNavigator';
import OnSiteStackNavigator from '../navigation/navigators/OnSiteStackNavigator';
import BoardStackNavigator from '../navigation/navigators/BoardStackNavigator';
import ContactsTabsNavigator from '../navigation/navigators/ContactsTabsNavigator';
import SituationsStackNavigator from '../navigation/navigators/SituationsStackNavigator';
import AboutAppStackNavigator from '../navigation/navigators/AboutAppStackNavigator';
import ReportsStackNavigator from '../navigation/navigators/ReportsStackNavigator';
import NoticesStackNavigator from '../navigation/navigators/NoticesStackNavigator';
import WebviewStackNavigator from '../navigation/navigators/WebviewStackNavigator';

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
  webview: {
    config: WebviewConfig,
    navigator: WebviewStackNavigator
  },
  board: {
    config: BoardConfig,
    navigator: BoardStackNavigator,
    env: { appID: 1774, clanek: 37366, slozka: 66976 }
  },
  contacts: {
    config: ContactsConfig,
    navigator: ContactsTabsNavigator
  },
  situations: {
    config: SituationsConfig,
    navigator: SituationsStackNavigator,
    env: { appID: 1777 }
  },
  notices: {
    config: NoticesConfig,
    navigator: NoticesStackNavigator,
    env: { appID: 2591 }
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
  appID: 'cz.as4u.mmvm.kurim',
  releaseChannel: 'kurim',
  forceUpdate: false,
  openDrawerStartup: false,
  homeScreenLogo: 'main',
  drawerLogo: 'main',
  useHomeScreen: true,
  homeScreenHeaderInfoAsRow: false,
  disableYellowBox: true,
  useMenuCategories: true,
  initialModule: 'news',
  enableNotifications: false,
  statusbarStyle: 'light',
  updatesEnabled: true,
  notificationEndpoint: 'mobile/notification.php?akce=set',
  notificationEndpointTest: 'http://192.168.0.216:3001/token',
  domainUrl: 'https://www.kurim.cz/',
  domainTestUrl: '"http://test.as4u.local/',
  database: {
    name: '_kurim.db',
    version: '1.0',
    displayName: 'KURIM_DB',
    location: 'default'
  },
  navHeader: {
    showHeader: true,
    useLogo: false
  },
  aboutApp: {
    appName: 'Kuřim v mobilu',
    buildDate: '14.2.2023',
    developerEmail: 'mobileapp@as4u.cz',
    developerWeb: { pretty: 'www.as4u.cz', link: 'http://www.as4u.cz' }
  },
  aboutTown: {
    title: 'Město Kuřim',
    address: 'Jungmannova 968/75, 664 34 Kuřim',
    phone: '541 422 311',
    web: {
      pretty: 'www.kurim.cz',
      link: 'https://www.kurim.cz/'
    },
    gdpr: {
      pretty: 'Ochrana osobních údajů',
      link: 'https://www.kurim.cz/gdpr/'
    }
  },
  map: {
    mapCenter: {
      latitude: 49.30922128845522,
      longitude: 16.529390129488387
    },
    mapZoom: 10,
    mapDelta: 0.005,
    initMapType: 'standard'
  },
  menuItems: [
    {
      title: 'menu-category-title-informations',
      items: [
        { module: AppModules.news },
        { module: AppModules.onSite },
        {
          module: AppModules.webview,
          title: 'screen-title-kam-v-kurimi',
          iconName: 'events',
          env: { link: 'https://www.kamvkurimi.cz/' }
        },
        { module: AppModules.board }
      ]
    },
    {
      title: 'menu-category-title-citizen',
      items: [
        { module: AppModules.contacts },
        { module: AppModules.situations }
      ]
    },
    {
      title: 'menu-category-title-maps',
      items: [{ module: AppModules.notices }, { module: AppModules.reports }]
    },
    {
      title: 'menu-category-title-mmvm',
      items: [{ module: AppModules.aboutApp }]
    }
  ]
};
