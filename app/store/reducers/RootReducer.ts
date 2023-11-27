import { combineReducers } from 'redux';
import { AppModules } from '../../config/App.config';

// Reducers
import ModulesReducer from './ModulesReducer';
import BoardReducer from './BoardReducer';
import NoticesReducer from './NoticesReducer';
import ThematicMapReducer from './ThematicMapReducer';
import NavReducer from './NavReducer';
import EventsReducer from './EventsReducer';
import SettingsReducer from './SettingsReducer';
import PlacesReducer from './PlacesReducer';

let rootReducer: any = {
  modules: ModulesReducer,
  nav: NavReducer,
  settings: SettingsReducer
};

if (AppModules.board) {
  rootReducer.board = BoardReducer;
}

if (AppModules.notices) {
  rootReducer.notices = NoticesReducer;
}

if (AppModules.events) {
  rootReducer.events = EventsReducer;
}

if (AppModules.thematicMap) {
  rootReducer.thematicMap = ThematicMapReducer;
}

if (AppModules.places) {
  rootReducer.places = PlacesReducer;
}

const RootReducer = combineReducers(rootReducer);

export default RootReducer;
