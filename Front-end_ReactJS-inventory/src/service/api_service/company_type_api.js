import { API_URL_COMPANY_TYPE } from '../../constants/index';
import { request } from './apis_util';

export function getAllCompanyTypes() {
    return request({
        url: API_URL_COMPANY_TYPE + '/get-all/types',
        method: 'GET'
    });
}

export function getAllCompanyTypeDescriptions() {
    return request({
        url: API_URL_COMPANY_TYPE + '/get-all/type-descriptions',
        method: 'GET'
    });
}

export function getCompanyTypeId(id) {
    return request({
        url: API_URL_COMPANY_TYPE + `/get/${id}`,
        method: 'GET'
    });
}
