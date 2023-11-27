import {
    BOARD_SET_TYPE,
    BOARD_SET_SOURCE,
    BOARD_OPEN_MODAL,
    BOARD_RESET
} from "../actions/actionTypes";

const initialState = {
    type: 0,
    source: 0,
    filterIsOpen: false,
};

function BoardReducer(state = initialState, action: any) {
    switch (action.type) {
        case BOARD_SET_SOURCE:
            return {
                ...state,
                source: action.payload
            }
        case BOARD_SET_TYPE:
            return {
                ...state,
                type: action.payload
            }
        case BOARD_OPEN_MODAL:
            return {
                ...state,
                filterIsOpen: action.payload,
            }
        case BOARD_RESET:
            return initialState;
        default:
            return state;
    }
};

export default BoardReducer;