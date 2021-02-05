import axios from 'axios';

import { PASSWORD_SERVICE } from "../shared/constants/endpoints";
import {
    UPDATE_PASSWORD_FORM,
    CLEAN_PASSWORD_FORM,
    UPDATE_PASSWORD_INIT,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAILURE
} from "./types";
import formatRequestBody from '../shared/utils/formatRequestBody';


export const updatePasswordForm = passwordForm => ({
    type: UPDATE_PASSWORD_FORM,
    payload: passwordForm,
});


const updatePasswordInit = () => ({
    type: UPDATE_PASSWORD_INIT
});

const updatePasswordSuccess = () => ({
    type: UPDATE_PASSWORD_SUCCESS,
});

const updatePasswordFailure = error => ({
    type: UPDATE_PASSWORD_FAILURE,
    payload: error,
});

const cleanPasswordForm = () => ({
    type: CLEAN_PASSWORD_FORM,
});


export const updatePassword = passwordForm => dispatch => {
    dispatch(updatePasswordInit());

    axios({
        url: PASSWORD_SERVICE,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        },
        data: JSON.stringify(formatRequestBody(passwordForm)),
    }).then(() => {
        dispatch(updatePasswordSuccess());
        dispatch(cleanPasswordForm());
    }).catch(error => {
        dispatch(updatePasswordFailure(error));
    })
};
