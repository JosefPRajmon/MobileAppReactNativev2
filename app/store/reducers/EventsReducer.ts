import {
    EVENTS_SET_CATEGORY,
    EVENTS_SET_DATE_CHOICE,
    EVENTS_RESET,
    EVENTS_OPEN_MODAL
} from "../actions/actionTypes";

const initialState = {
    filterIsOpen: false,
    allCategories: true,
    categories: [],
    dateFilterChoice: -1
};

function EventsReducer(state = initialState, action: any) {
    switch (action.type) {
        case EVENTS_SET_CATEGORY:
            return {
                ...state,
                ...action.payload,
            }
        case EVENTS_SET_DATE_CHOICE:
            return {
                ...state,
                ...action.payload,
            }
        case EVENTS_OPEN_MODAL:
            return {
                ...state,
                filterIsOpen: action.payload,
            }
        case EVENTS_RESET:
            return {
                ...initialState,
                categories: state.categories.map((category: any) => {
                    category.checked = false
                    return category
                })
            };
        default:
            return state;
    }
};

export default EventsReducer;