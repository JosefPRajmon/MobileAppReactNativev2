import {
    THEMATIC_MAP_SET_TYPES,
    THEMATIC_MAP_OPEN_MODAL,
    THEMATIC_MAP_RESET
} from "../actions/actionTypes";

const initialState = {
    categories: [],
    allCategories: true,
    filterIsOpen: false
};

function ThematicMapReducer(state = initialState, action: any) {
    switch (action.type) {
        case THEMATIC_MAP_SET_TYPES:
            return {
                ...state,
                ...action.payload,
            }
        case THEMATIC_MAP_OPEN_MODAL:
            return {
                ...state,
                filterIsOpen: action.payload,
            }
        case THEMATIC_MAP_RESET:
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

export default ThematicMapReducer;