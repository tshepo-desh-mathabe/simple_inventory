import { SHOW_CONTENT, ROUTER_CHANGED, USER_NAME, IS_LOGGED_IN } from '../action_const/const';

export const showPage = (showContentPage) => ({
    type: SHOW_CONTENT,
    showContentPage
});

export const router_state = (routerChanged) => ({
    type: ROUTER_CHANGED,
    routerChanged
});

export const userLoggedIn = (isUserLoggedIn) => ({
    type: IS_LOGGED_IN,
    isUserLoggedIn
});

export const username = (systemUsername) => ({
    type: USER_NAME,
    systemUsername
});
