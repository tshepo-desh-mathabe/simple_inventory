import { API_URL_PROVINCE } from '../../constants/index';
import { request } from './apis_util';

export function saveProvince(requestBody) {
    return request({
        url: API_URL_PROVINCE + '/save',
        method: 'POST',
        body: JSON.stringify(requestBody)
    });
}

export function updateProvince(requestBody) {
    return request({
        url: API_URL_PROVINCE + '/edit',
        method: 'PUT',
        body: JSON.stringify(requestBody)
    });
}

export function getAllProvinces() {
    return request({
        url: API_URL_PROVINCE + '/get-all',
        method: 'GET'
    });
}

export function getProvinceById(id) {
    return request({
        url: API_URL_PROVINCE + `/get/${id}`,
        method: 'GET'
    });
}

export function getProviceByCountryId(id) {
    return request({
        url: API_URL_PROVINCE + `/get/provinces-by-country/${id}`,
        method: 'GET'
    });
}

export function deleteProvince(id) {
    return request({
        url: API_URL_PROVINCE + `/delete/${id}`,
        method: 'DELETE'
    });
}
