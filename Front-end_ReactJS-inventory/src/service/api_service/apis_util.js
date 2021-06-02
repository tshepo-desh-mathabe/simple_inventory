import { getSecretToken } from '../signin_data_model';

export const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if( getSecretToken() ) {
        headers.append('Authorization', 'Bearer ' + getSecretToken() )
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response =>
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};