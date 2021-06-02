import { SINGLE_IMAGE_FILE } from '../constants/index';

export function setSingleImageBase64 (image) {
    sessionStorage.setItem( SINGLE_IMAGE_FILE ,JSON.stringify(image) );
}

export function getSingleImageBase64 () {
    return JSON.parse( sessionStorage.getItem(SINGLE_IMAGE_FILE) );
}

export function removeSingleImageBase64 () {
    return sessionStorage.removeItem(SINGLE_IMAGE_FILE);
}
