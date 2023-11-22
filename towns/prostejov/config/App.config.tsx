// Configs
import { NewsConfig } from './modules/News.config';
import { OnSiteConfig } from './modules/OnSite.config';
import { EventsConfig } from './modules/Events.config';
import { ContactsConfig } from './modules/Contacts.config';
import { SituationsConfig } from './modules/Situations.config';
import { HelplinesConfig } from './modules/Helplines.config';
import { BoardConfig } from './modules/Board.config';
import { ReportsConfig } from './modules/Reports.config';
import { AboutAppConfig } from './modules/AboutApp.config';
import { TouristInfoConfig } from './modules/TouristInfo.config';
import { ThematicMapConfig } from './modules/ThematicMap.config';
import { SettingsConfig } from './modules/Settings.config';
import { ReservationConfig } from './modules/Reservation.config';

// Navigators
import NewsStackNavigator from '../navigation/navigators/NewsStackNavigator';
import OnSiteStackNavigator from '../navigation/navigators/OnSiteStackNavigator';
import EventsStackNavigator from '../navigation/navigators/EventsStackNavigator';
import BoardStackNavigator from '../navigation/navigators/BoardStackNavigator';
import ContactsTabsNavigator from '../navigation/navigators/ContactsTabsNavigator';
import SituationsStackNavigator from '../navigation/navigators/SituationsStackNavigator';
import HelplinesStackNavigator from '../navigation/navigators/HelplinesStackNavigator';
import AboutAppStackNavigator from '../navigation/navigators/AboutAppStackNavigator';
import ReportsStackNavigator from '../navigation/navigators/ReportsStackNavigator';
import ThematicMapNavigator from '../navigation/navigators/ThematicMapNavigator';
import TouristInfoStackNavigator from '../navigation/navigators/TouristInfoStackNavigator';
import SettingsStackNavigator from '../navigation/navigators/SettingsStackNavigator';
import ReservationStackNavigator from '../navigation/navigators/ReservationStackNavigator';
import { NoticesConfig } from './modules/Notices.config';
import NoticesStackNavigator from '../navigation/navigators/NoticesStackNavigator';

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
    env: { appID: 2779, clanek: 152956, slozka: 128783 }
  },
  helplines: {
    config: HelplinesConfig,
    navigator: HelplinesStackNavigator
  },
  contacts: {
    config: ContactsConfig,
    navigator: ContactsTabsNavigator
  },
  situations: {
    config: SituationsConfig,
    navigator: SituationsStackNavigator,
    env: { appID: 2812 }
  },
  notices: {
    config: NoticesConfig,
    navigator: NoticesStackNavigator,
    env: { appID: 2818 }
  },
  reports: {
    config: ReportsConfig,
    navigator: ReportsStackNavigator
  },
  reservation: {
    config: ReservationConfig,
    navigator: ReservationStackNavigator,
    env: { sbsapp: 2819, portal: 2776 }
  },
  touristInfo: {
    config: TouristInfoConfig,
    navigator: TouristInfoStackNavigator
  },
  thematicMap: {
    config: ThematicMapConfig,
    navigator: ThematicMapNavigator
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
  appID: 'cz.as4u.mmvm.prostejov',
  releaseChannel: 'prostejov',
  forceUpdate: false,
  openDrawerStartup: false,
  homeScreenLogo: 'main',
  drawerLogo: 'main',
  useHomeScreen: true,
  homeScreenHeaderInfoAsRow: false,
  disableYellowBox: true,
  useMenuCategories: false,
  initialModule: 'news',
  enableNotifications: false,
  statusbarStyle: 'light',
  updatesEnabled: false,
  showGDPRAboutApp: false,
  notificationEndpoint: 'mobile/notification.php?akce=set',
  notificationEndpointTest: 'http://192.168.0.216:3001/token',
  domainUrl: 'https://www.prostejov.eu/',
  domainTestUrl: '"http://test.as4u.local/',
  database: {
    name: '_prostejov.db',
    version: '1.0',
    displayName: 'PROSTEJOV_DB',
    location: 'default'
  },
  navHeader: {
    showHeader: true,
    useLogo: false
  },
  aboutApp: {
    appName: 'Prostějov v mobilu',
    version: '3.7.4',
    buildDate: '24.2.2023',
    developerEmail: 'mobileapp@as4u.cz',
    developerWeb: { pretty: 'www.as4u.cz', link: 'http://www.as4u.cz' }
  },
  aboutTown: {
    title: 'Statutární město Prostějov',
    address: 'nám T. G. Masaryka 130/14, 796 01 Prostějov',
    phone: '800 900 001',
    web: {
      pretty: 'www.prostejov.eu',
      link: 'https://www.prostejov.eu/'
    },
    email: 'posta@prostejov.eu',
    gdpr: {
      pretty: 'Ochrana osobních údajů',
      link: 'https://www.prostejov.eu/gdpr/'
    }
  },
  map: {
    mapCenter: {
      latitude: 49.47188,
      longitude: 17.11184
    },
    mapZoom: 12,
    mapDelta: 0.005,
    initMapType: 'standard'
  },
  touristInfoData: {
    img_ids: ['822049', '822050', '822051', '822052', '1069557', '1069558'],
    text: '<p>Prostějov je město nabízející spoustu míst k zastavení, nejen historických památek, ale najdete zde i&nbsp;místa&nbsp;k aktivnímu odpočinku či k relaxaci. Ať už máte chuť na&nbsp;sportovní vyžití, návštěvu divadla či výstavy, vždy Vám můžeme poskytnout širokou paletu zážitků. K získání užitečných informací by měly sloužit tyto stránky.</p> <h3>Mobilní aplikace&nbsp;- poznávejte našeho město s&nbsp;mobilní aplikací v&nbsp;ruce</h3><p><a href="http://m.lwi.cz/prostejov">ke stažení na následujícím odkaze<br /></a></p><p><span><span><span><span><span><span><span><span><span><span><span><span><span><i><span><span><span><span><span><span><span><span><span><span><span><span><span><span><i><span><span><span><span><br /></span></span></span></span></i></span></span></span></span></span></span></span></span></span></span></span></span></span></span></i></span></span></span></span></span></span></span></span></span></span></span></span></span></p><h3>Vyhlídka z&nbsp;radniční věže</h3><p><span style="text-align: justify;">Kapacita návštěvníků věže je stanovena maximálně na&nbsp;13 osob, proto doporučujeme skupinu objednat&nbsp;u&nbsp;pracovnic turistického informačního&nbsp;centra na&nbsp;bezplatné telefonní lince&nbsp;800 900 001 v&nbsp;pracovní dny, pondělí až čtvrtek od 8:00 do 16:00 hod., v pátek od 8:00 do 14:00 hod., e-mail: </span><a style="text-align: justify;" href="mailto:informace@prostejov.eu">informace@prostejov.eu</a><span style="text-align: justify;">, osobně vedle budovy radnice nám. T. G. Masaryka 12.&nbsp;</span><strong style="text-align: justify;">Mimo provozní dobu magistrátu&nbsp;bude prohlídka radniční věže možná</strong><span style="text-align: justify;">&nbsp; po předchozí objednávce a to minimálně 24 hodin předem, kdy minimální počet&nbsp;návštěvníků je stanoven na 5 osob a prohlídky jsou objednávány v rámci provozní doby magistrátu, vždy však nejpozději hodinu před koncem provozní doby.&nbsp;</span><span style="text-align: justify;">Prohlídky radniční věže jsou </span><strong style="text-align: justify;">ZDARMA</strong><span style="text-align: justify;">.</span></p><p style="text-align: justify;"><br /></p>'
  },
  menuItems: [
    {
      title: '',
      items: [
        { module: AppModules.news },
        { module: AppModules.onSite },
        { module: AppModules.events },
        { module: AppModules.board },
        { module: AppModules.helplines },
        { module: AppModules.contacts },
        { module: AppModules.situations },
        { module: AppModules.notices },
        { module: AppModules.reports },
        { module: AppModules.reservation },
        { module: AppModules.touristInfo },
        { module: AppModules.thematicMap },
        { module: AppModules.settings },
        { module: AppModules.aboutApp }
      ]
    }
  ]
};
