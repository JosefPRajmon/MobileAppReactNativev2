import { AppConfig } from "../../config/App.config";
import { SET_FOCUSED_ROUTE } from "../actions/actionTypes";

const initialState = {
  moduleID: AppConfig.useHomeScreen ? "Home" : AppConfig.ititialModule,
  pageID: AppConfig.useHomeScreen ? "Home" : AppConfig.ititialModule,
  params: undefined
};

function NavReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_FOCUSED_ROUTE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}

export default NavReducer;
