import * as Application from 'expo-application';
import {
  MODULE_UPDATING,
  MODULE_UPDATED,
  MODULE_FAILED,
  MODULE_HIDE_READED_ITEMS,
  MODULE_ADD_REDED_ITEM_ID
} from '../actions/actionTypes';
import { AppModules } from '../../config/App.config';

type UpdateStatus = 'none' | 'updating' | 'updated' | 'failed';

function initModules() {
  let state: any = {};
  Object.entries(AppModules).map(([moduleID, module]: any) => {
    if (module.config.updateable) {
      state[moduleID] = {
        lastUpdated: 0,
        updateStatus: 'none',
        buildVersion: false
      };

      /* if (module.moduleID === ModulesConfig.news.moduleID || ModulesConfig.onSite.moduleID) {
                state[module.moduleID].readedItemsHidden = false;
            } */
    }
  });
  return state;
}

function ModulesReducer(state = initModules(), action: any) {
  switch (action.type) {
    case MODULE_UPDATING:
      state[action.moduleID] = {
        ...state[action.moduleID],
        updateStatus: 'updating',
        lastUpdated: new Date().getTime()
      };
      return {
        ...state
      };
    case MODULE_UPDATED:
      state[action.moduleID] = {
        ...state[action.moduleID],
        updateStatus: 'updated',
        lastUpdated: new Date().getTime(),
        buildVersion: Application.nativeApplicationVersion
      };
      return {
        ...state
      };
    case MODULE_FAILED:
      state[action.moduleID] = {
        ...state[action.moduleID],
        updateStatus: 'failed',
        lastUpdated: new Date().getTime()
      };
      return {
        ...state
      };
    case MODULE_HIDE_READED_ITEMS:
      state[action.moduleID] = {
        ...state[action.moduleID],
        readedItemsHidden: action.payload
      };
      return {
        ...state
      };
    case MODULE_ADD_REDED_ITEM_ID:
      state[action.moduleID] = {
        ...state[action.moduleID],
        readedItems: action.payload
      };
      return {
        ...state
      };
    default:
      return state;
  }
}

export default ModulesReducer;
