import { NOTICES_SET_TYPES } from "../actions/actionTypes";

const initialState = {
    allTypes: true,
    types: false,
};

function NoticesReducer(state = initialState, action: any) {
    switch (action.type) {
        case NOTICES_SET_TYPES:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
};

export default NoticesReducer;