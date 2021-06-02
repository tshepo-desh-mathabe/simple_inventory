import { API_URL_CONTINENT } from '../../constants/index';
import { request } from './apis_util';

export function saveContinent(requestBody) {
    return request({
        url: API_URL_CONTINENT + '/save',
        method: 'POST',
        body: JSON.stringify(requestBody)
    });
}

export function updateContinent(requestBody) {
    return request({
        url: API_URL_CONTINENT + '/edit',
        method: 'PUT',
        body: JSON.stringify(requestBody)
    });
}

export function getAllContinents() {
    return request({
        url: API_URL_CONTINENT + '/get-all',
        method: 'GET'
    });
}

export function getContinentById(id) {
    return request({
        url: API_URL_CONTINENT + `/get/${id}`,
        method: 'GET'
    });
}

export function deleteContinent(id) {
    return request({
        url: API_URL_CONTINENT + `/delete/${id}`,
        method: 'DELETE'
    });
}
