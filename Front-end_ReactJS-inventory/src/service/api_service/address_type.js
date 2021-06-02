import { API_URL_ADDRESS_TYPE } from '../../constants/index';
import { request } from './apis_util';

export function getAllAddressTypes() {
    return request({
        url: API_URL_ADDRESS_TYPE + '/get-all',
        method: 'GET'
    });
}

export function getAddressTypeById(id) {
    return request({
        url: API_URL_ADDRESS_TYPE + `/get/${id}`,
        method: 'GET'
    });
}
