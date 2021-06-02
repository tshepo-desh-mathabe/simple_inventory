import { API_URL_USER_ROLE } from '../../constants/index';
import { request } from './apis_util';

export function getAllUserRoles() {
    return request({
        url: API_URL_USER_ROLE + '/get-all',
        method: 'GET'
    });
}

export function getUserRoleById(id) {
    return request({
        url: API_URL_USER_ROLE + `/get/${id}`,
        method: 'GET'
    });
}
