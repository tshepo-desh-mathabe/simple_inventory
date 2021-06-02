import { API_URL_CITY_TOWN } from '../../constants/index';
import { request } from './apis_util';

export function saveCityTown(requestBody) {
    return request({
        url: API_URL_CITY_TOWN + '/save',
        method: 'POST',
        body: JSON.stringify(requestBody)
    });
}

export function updateCityTown(requestBody) {
    return request({
        url: API_URL_CITY_TOWN + '/edit',
        method: 'PUT',
        body: JSON.stringify(requestBody)
    });
}

export function getAllCityTowns() {
    return request({
        url: API_URL_CITY_TOWN + '/get-all',
        method: 'GET'
    });
}

export function getCityTownById(id) {
    return request({
        url: API_URL_CITY_TOWN + `/get/${id}`,
        method: 'GET'
    });
}

export function getCityTownsByProvinceId(id) {
    return request({
        url: API_URL_CITY_TOWN + `/get/city-towns-by-province/${id}`,
        method: 'GET'
    });
}

export function deleteCityTown(id) {
    return request({
        url: API_URL_CITY_TOWN + `/delete/${id}`,
        method: 'DELETE'
    });
}
