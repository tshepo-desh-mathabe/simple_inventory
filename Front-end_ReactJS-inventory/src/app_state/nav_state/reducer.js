import { SHOW_CONTENT, ROUTER_CHANGED, USER_NAME, IS_LOGGED_IN } from '../action_const/const';

const initialState = {
    isLoggedIn: false,
    routeState: null,
    showLogIn_signUp: null,
    username: null
}

const navReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_CONTENT:
            return {
                ...state,
                showLogIn_signUp: action.showContentPage
            }
        case ROUTER_CHANGED:
            return {
                ...state,
                routeState: action.routerChanged
            }
        case IS_LOGGED_IN:
            return {
                ...state,
                isLoggedIn: action.isUserLoggedIn
            }
        case USER_NAME:
            return {
                ...state,
                username: action.systemUsername
            }
        default:
            return state;
    }
};

export default navReducer;