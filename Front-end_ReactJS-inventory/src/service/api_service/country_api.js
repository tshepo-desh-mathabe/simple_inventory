import { API_URL_COUNTRY } from '../../constants/index';
import { request } from './apis_util';

export function saveCountry(requestBody) {
    return request({
        url: API_URL_COUNTRY + '/save',
        method: 'POST',
        body: JSON.stringify(requestBody)
    });
}

export function updateCountry(requestBody) {
    return request({
        url: API_URL_COUNTRY + '/edit',
        method: 'PUT',
        body: JSON.stringify(requestBody)
    });
}

export function getAllCountries() {
    return request({
        url: API_URL_COUNTRY + '/get-all',
        method: 'GET'
    });
}

export function getCountryById(id) {
    return request({
        url: API_URL_COUNTRY + `/get/${id}`,
        method: 'GET'
    });
}

export function getCountryByContinentId(id) {
    return request({
        url: API_URL_COUNTRY + `/get/countries-by-continent/${id}`,
        method: 'GET'
    });
}

export function deleteCountry(id) {
    return request({
        url: API_URL_COUNTRY + `/delete/${id}`,
        method: 'DELETE'
    });
}
