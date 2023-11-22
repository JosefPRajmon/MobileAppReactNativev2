// Configs
import { NewsConfig } from './modules/News.config';
import { OnSiteConfig } from './modules/OnSite.config';
import { EventsConfig } from './modules/Events.config';
import { ContactsConfig } from './modules/Contacts.config';
import { SituationsConfig } from './modules/Situations.config';
import { BoardConfig } from './modules/Board.config';
import { ReportsConfig } from './modules/Reports.config';
import { AboutAppConfig } from './modules/AboutApp.config';
import { ReservationConfig } from './modules/Reservation.config';
import { LossesConfig } from './modules/Losses.config';
// Navigators
import NewsStackNavigator from '../navigation/navigators/NewsStackNavigator';
import OnSiteStackNavigator from '../navigation/navigators/OnSiteStackNavigator';
import EventsStackNavigator from '../navigation/navigators/EventsStackNavigator';
import BoardStackNavigator from '../navigation/navigators/BoardStackNavigator';
import ContactsTabsNavigator from '../navigation/navigators/ContactsTabsNavigator';
import SituationsStackNavigator from '../navigation/navigators/SituationsStackNavigator';
import AboutAppStackNavigator from '../navigation/navigators/AboutAppStackNavigator';
import ReportsStackNavigator from '../navigation/navigators/ReportsStackNavigator';
import ReservationStackNavigator from '../navigation/navigators/ReservationStackNavigator';
import LossesStackNavigator from '../navigation/navigators/LossesStackNavigator';

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
    env: { appID: 9, clanek: 1125, slozka: 23 }
  },
  contacts: {
    config: ContactsConfig,
    navigator: ContactsTabsNavigator
  },
  situations: {
    config: SituationsConfig,
    navigator: SituationsStackNavigator,
    env: { appID: 7 }
  },
  losses: {
    config: LossesConfig,
    navigator: LossesStackNavigator
  },
  reports: {
    config: ReportsConfig,
    navigator: ReportsStackNavigator,
    title: 'screen-title-better-jbc'
  },
  reservation: {
    config: ReservationConfig,
    navigator: ReservationStackNavigator,
    env: { sbsapp: 2007, portal: 3 }
  },
  aboutApp: {
    config: AboutAppConfig,
    navigator: AboutAppStackNavigator
  }
};

export const AppConfig: any = {
  isDev: false,
  appID: 'cz.as4u.mmvm.jablonec',
  releaseChannel: 'jablonec',
  forceUpdate: false,
  openDrawerStartup: false,
  showDrawerLogo: true,
  useHomeScreen: true,
  disableYellowBox: true,
  useMenuCategories: true,
  initialModule: 'news',
  enableNotifications: false,
  statusbarStyle: 'light',
  updatesEnabled: true,
  notificationEndpoint: 'mobile/notification.php?akce=set',
  notificationEndpointTest: 'http://192.168.0.216:3001/token',
  domainUrl: 'https://www.mestojablonec.cz/',
  domainTestUrl: '"http://test.as4u.local/',
  database: {
    name: '_jablonec.db',
    version: '1.0',
    displayName: 'JABLONEC_DB',
    location: 'default'
  },
  navHeader: {
    showHeader: true,
    useLogo: false
  },
  aboutApp: {
    appName: 'Jablonec v mobilu',
    buildDate: '30.8.2022',
    developerEmail: 'mobileapp@as4u.cz',
    developerWeb: { pretty: 'www.as4u.cz', link: 'http://www.as4u.cz' }
  },
  aboutTown: {
    title: 'Magistrát města Jablonec nad Nisou',
    address: 'Mírové náměstí 19, 466 01 Jablonec nad Nisou',
    phone: '483 357 777',
    web: {
      pretty: 'www.mestojablonec.cz',
      link: 'https://www.mestojablonec.cz/'
    },
    email: 'mujablonec@mestojablonec.cz',
    gdpr: {
      pretty: 'Ochrana osobních údajů',
      link: 'https://www.mestojablonec.cz/cs/magistrat/povinne-informace/osobni-udaje/'
    }
  },
  map: {
    mapCenter: {
      latitude: 50.725199,
      longitude: 15.169664
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
        { module: AppModules.events },
        { module: AppModules.board }
      ]
    },
    {
      title: 'menu-category-title-citizen',
      items: [
        { module: AppModules.contacts },
        { module: AppModules.situations },
        { module: AppModules.losses },
        { module: AppModules.reservation },
        { module: AppModules.reports }
      ]
    },
    {
      title: 'menu-category-title-mmvm',
      items: [{ module: AppModules.aboutApp }]
    }
  ]
};
