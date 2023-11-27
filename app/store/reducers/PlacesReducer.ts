import {
    PLACES_SET_LOCATION,
    PLACES_SET_CATEGORY,
    PLACES_OPEN_MODAL,
    PLACES_CATEGORIES_CLEAR,
    PLACES_RESET,
    PLACES_SET_ORDER_BY
} from "../actions/actionTypes";

const initialState = {
    allCategories: true,
    categories: [],
    filterIsOpen: false,
    orderByDistance: true,
    location: false
};

function PlacesReducer(state = initialState, action: any) {
    switch (action.type) {
        case PLACES_SET_LOCATION:
            return {
                ...state,
                location: action.payload,
            }
        case PLACES_SET_ORDER_BY:
            return {
                ...state,
                orderByDistance: !state.orderByDistance,
            }
        case PLACES_SET_CATEGORY:
            return {
                ...state,
                ...action.payload
            }
        case PLACES_OPEN_MODAL:
            return {
                ...state,
                filterIsOpen: action.payload,
            }
        case PLACES_RESET:
            return {
                ...initialState,
                categories: state.categories.map((category: any) => {
                    category.checked = false
                    return category
                })
            };
        case PLACES_CATEGORIES_CLEAR:
            return initialState
        default:
            return state;
    }
};

export default PlacesReducer;