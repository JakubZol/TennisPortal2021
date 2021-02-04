import axios from 'axios';

import { PLAYERS_SERVICE } from "../shared/constants/endpoints";
import {
    UPDATE_USER_DATA_FORM,
    CLEAN_USER_DATA_FORM,
    UPDATE_USER_DATA_INIT,
    UPDATE_USER_DATA_SUCCESS,
    UPDATE_USER_DATA_FAILURE
} from "./types";
import formatRequestBody from '../shared/utils/formatRequestBody';
import formatResponseBody from '../shared/utils/formatResponseBody';


export const updateUserDataForm = (field, formData) => ({
    type: UPDATE_USER_DATA_FORM,
    payload: formData,
    field,
});


const updateUserDataInit = () => ({
    type: UPDATE_USER_DATA_INIT
});

const updateUserDataSuccess = (userData) => ({
    type: UPDATE_USER_DATA_SUCCESS,
    payload: userData,
});

const updateUserDataFailure = error => ({
    type: UPDATE_USER_DATA_FAILURE,
    payload: error,
});

const cleanUserDataForm = () => ({
    type: CLEAN_USER_DATA_FORM,
});


export const updateUserData = userForm => dispatch => {
    dispatch(updateUserDataInit());

    axios({
        url: `${PLAYERS_SERVICE}/`,  // todo: FIX SLASH
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        },
        data: JSON.stringify(formatRequestBody(userForm)),
    }).then(({ data }) => {
        dispatch(updateUserDataSuccess(formatResponseBody(data)));
        dispatch(cleanUserDataForm());
    }).catch(error => {
        dispatch(updateUserDataFailure(error));
    })
};
