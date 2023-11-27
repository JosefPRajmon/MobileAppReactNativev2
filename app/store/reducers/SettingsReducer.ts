import {
  TOGGLE_NOTIFICATION_ENABLE,
  SET_GPS_NOTIFICATION,
  SET_NOTIFICATION_TOKEN,
  SET_UUID
} from '../actions/actionTypes';
import { AppModules } from '../../config/App.config';

function initModules() {
  let state: any = {
    modules: {},
    gpsNotification: undefined,
    token: undefined,
    settingsChanged: false,
    uuid: null
  };

  Object.entries(AppModules).map(([moduleID, module]: any) => {
    if (module.config.notificationEnabled) {
      state.modules[moduleID] = {
        enable: true
      };
    }
  });
  return state;
}

function SettingsReducer(state = initModules(), action: any) {
  switch (action.type) {
    case TOGGLE_NOTIFICATION_ENABLE:
      const module = state.modules[action.payload];
      state.modules[action.payload] = {
        enable: !module.enable
      };
      return {
        ...state,
        settingsChanged: true
      };
    case SET_GPS_NOTIFICATION:
      return {
        ...state,
        gpsNotification: action.payload,
        settingsChanged: true
      };
    case SET_NOTIFICATION_TOKEN:
      return {
        ...state,
        token: action.payload,
        settingsChanged: false
      };
    case SET_UUID:
      return {
        ...state,
        uuid: action.payload
      };
    default:
      return state;
  }
}

export default SettingsReducer;
