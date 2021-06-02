import { CURRENT_USER } from '../constants/index';

export function setCurrentUser (data) {
    sessionStorage.setItem( CURRENT_USER ,JSON.stringify(data) );
}

export function getCurrentUser () {
    return JSON.parse( sessionStorage.getItem(CURRENT_USER) );
}

export function removeCurrentUser () {
    return sessionStorage.removeItem(CURRENT_USER);
}

export function getCurrentUserRole() {
    const userRole = getCurrentUser();
    return userRole.authorities.find(e => { 
        return e.authority === 'ROLE_ADMIN' ? true : alert('You are not authorized to view this page!');
    });
}