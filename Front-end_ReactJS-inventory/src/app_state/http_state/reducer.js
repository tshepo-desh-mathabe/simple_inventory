import { SIGNIN_HTTP, SIGNUP_HTTP, CURRENT_USER } from '../action_const/const';

const initialState = {
    signin_http: null,
    signup_http: null,
    currentUser: null,
}

const httpResponse = (state = initialState, action) => {
    switch (action.type) {
        case SIGNIN_HTTP:
            return {
                ...state,
                signin_http: action.signInHttp
            }
        case SIGNUP_HTTP:
            return {
                ...state,
                signup_http: action.signUpHttp
            }
            case CURRENT_USER:
            return {
                ...state,
                currentUser: action.systemUser
            }
        default:
            return state;
    }
};

export default httpResponse;