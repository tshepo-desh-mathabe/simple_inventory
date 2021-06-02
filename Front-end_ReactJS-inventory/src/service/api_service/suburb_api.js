import { API_URL_CITY_SUBURB } from '../../constants/index';
import { request } from './apis_util';

export function saveSuburb(requestBody) {
    return request({
        url: API_URL_CITY_SUBURB + '/save',
        method: 'POST',
        body: JSON.stringify(requestBody)
    });
}

export function updateSuburb(requestBody) {
    return request({
        url: API_URL_CITY_SUBURB + '/edit',
        method: 'PUT',
        body: JSON.stringify(requestBody)
    });
}

export function getAllSuburbs() {
    return request({
        url: API_URL_CITY_SUBURB + '/get-all',
        method: 'GET'
    });
}

export function getSuburbById(id) {
    return request({
        url: API_URL_CITY_SUBURB + `/get/${id}`,
        method: 'GET'
    });
}

export function getSuburbsByCityTownId(id) {
    return request({
        url: API_URL_CITY_SUBURB + `/get/suburbs-by-city-town/${id}`,
        method: 'GET'
    });
}

export function deleteSuburb(id) {
    return request({
        url: API_URL_CITY_SUBURB + `/delete/${id}`,
        method: 'DELETE'
    });
}
