import { SIGNIN_HTTP, SIGNUP_HTTP, CURRENT_USER } from '../action_const/const';

export const signInHttpResponse = (signInHttp) => ({
    type: SIGNIN_HTTP,
    signInHttp
});

export const signUpHttpResponse = (signUpHttp) => ({
    type: SIGNUP_HTTP,
    signUpHttp
});

export const systemUserHttpResponse = (systemUser) => ({
    type: CURRENT_USER,
    systemUser
});





