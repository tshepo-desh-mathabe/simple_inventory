
import { API_URL_USER } from '../../constants/index';
import { request } from './apis_util';

export function login(requestBody) {
    return request({
        url: API_URL_USER + '/signin',
        method: 'POST',
        body: JSON.stringify(requestBody)
    });
}

export function saveUser(requestBody) {
    return request({
        url: API_URL_USER + '/save',
        method: 'POST',
        body: JSON.stringify(requestBody)
    });
}

export function updateUser(requestBody) {
    return request({
        url: API_URL_USER + '/edit',
        method: 'PUT',
        body: JSON.stringify(requestBody)
    });
}

export function getAllUsers() {
    return request({
        url: API_URL_USER + '/get-all',
        method: 'GET'
    });
}

export function getUserById(id) {
    return request({
        url: API_URL_USER + `/get/${id}`,
        method: 'GET'
    });
}

export function getCurrentUser() {
    return request({
        url: API_URL_USER + '/get/current-user',
        method: 'GET'
    });
}

export function deleteUser(id) {
    return request({
        url: API_URL_USER + `/delete/${id}`,
        method: 'DELETE'
    });
}
