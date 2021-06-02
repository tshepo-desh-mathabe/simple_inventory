import { USER_NAME_EMAIL, ACCESS_TOKEN, IS_LOGGED } from '../constants/index';

export function setSecretToken (httpResponse) {
    sessionStorage.setItem( ACCESS_TOKEN ,JSON.stringify(httpResponse) );
}
export function getSecretToken () {
    return JSON.parse( sessionStorage.getItem(ACCESS_TOKEN) );
}

export function setUsername (name) {
    sessionStorage.setItem( USER_NAME_EMAIL ,JSON.stringify(name) );
}
export function getUsername () {
    return JSON.parse( sessionStorage.getItem(USER_NAME_EMAIL) );
}

export function setIsLogged (value) {
    sessionStorage.setItem( IS_LOGGED ,JSON.stringify(value) );
}
export function getIsLogged () {
    return JSON.parse( sessionStorage.getItem(IS_LOGGED) );
}
