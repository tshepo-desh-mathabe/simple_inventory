import { API_URL_COMPANY } from '../../constants/index';
import { request } from './apis_util';

export function saveCompany(requestBody) {
    return request({
        url: API_URL_COMPANY + '/save',
        method: 'POST',
        body: JSON.stringify(requestBody)
    });
}

export function updateCompany(requestBody) {
    return request({
        url: API_URL_COMPANY + '/edit',
        method: 'PUT',
        body: JSON.stringify(requestBody)
    });
}

export function getAllCompanies() {
    return request({
        url: API_URL_COMPANY + '/get-all',
        method: 'GET'
    });
}

export function getCompanyById(id) {
    return request({
        url: API_URL_COMPANY + `/get/${id}`,
        method: 'GET'
    });
}

export function deleteCompany(id) {
    return request({
        url: API_URL_COMPANY + `/delete/${id}`,
        method: 'DELETE'
    });
}
