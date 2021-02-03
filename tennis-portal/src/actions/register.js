import axios from 'axios';

import { REGISTER_USER_ENDPOINT } from "../shared/constants/endpoints";
import {
    REGISTER_USER_INIT,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    CLEAN_REGISTER_FORM,
    UPDATE_REGISTER_FORM
} from "./types";
import formatRequestBody from '../shared/utils/formatRequestBody';
import formatResponseBody from '../shared/utils/formatResponseBody';


export const updateRegisterForm = registerForm => ({
    type: UPDATE_REGISTER_FORM,
    payload: registerForm,
});


const registerUserInit = () => ({
    type: REGISTER_USER_INIT
});

const registerUserSuccess = userData => {
    localStorage.setItem('user', userData);

    return {
        type: REGISTER_USER_SUCCESS,
        payload: userData,
    }
};

const registerUserFailure = error => ({
    type: REGISTER_USER_FAILURE,
    payload: error,
});

const cleanRegisterForm = () => ({
    type: CLEAN_REGISTER_FORM,
});



export const register = registerForm => dispatch => {
    dispatch(registerUserInit());

    axios({
        url: REGISTER_USER_ENDPOINT,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        data: JSON.stringify(formatRequestBody(registerForm)),
    }).then(response => {
        dispatch(registerUserSuccess(formatResponseBody(response.data)));
        dispatch(cleanRegisterForm());
    }).catch(error => {
        dispatch(registerUserFailure(error));
    })
};
