import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_INIT, CLEAN_LOGIN_FORM, UPDATE_LOGIN_FORM } from './types'
import { LOGIN_ENDPOINT } from "../shared/constants/endpoints";
import formatRequestBody from "../shared/utils/formatRequestBody";
import formatResponseBody from "../shared/utils/formatResponseBody";


export const updateLoginForm = loginForm => ({
    type: UPDATE_LOGIN_FORM,
    payload: loginForm
});

const loginInit = () => ({
    type: LOGIN_INIT
});

const loginSuccess =  ({ authToken, ...userData }) => {
    localStorage.setItem('auth_token', authToken);

    return {
        type: LOGIN_SUCCESS,
        payload: userData,
    }
};

const loginFailure = error => ({
    type: LOGIN_FAILURE,
    payload: error,
});

const cleanLoginForm = () => ({
    type: CLEAN_LOGIN_FORM,
});

export const login = loginCredentials => dispatch => {
    dispatch(loginInit());

    axios({
        url: LOGIN_ENDPOINT,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        data: JSON.stringify(formatRequestBody(loginCredentials)),
    }).then(({ data }) => {
        dispatch(loginSuccess(formatResponseBody(data)));
        dispatch(cleanLoginForm());
    }).catch(error => {
        dispatch(loginFailure(error));
    })
};
