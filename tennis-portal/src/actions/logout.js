import axios from 'axios';
import { LOGOUT_SUCCESS, LOGOUT_FAILURE, LOGOUT_INIT } from './types'
import { LOGOUT_ENDPOINT } from "../shared/constants/endpoints";
import formatResponseBody from "../shared/utils/formatResponseBody";

const logoutInit = () => ({
    type: LOGOUT_INIT
});

const logoutSuccess =  userData => {
    localStorage.removeItem('auth_token');

    return {
        type: LOGOUT_SUCCESS,
        payload: userData,
    }
};

const logoutFailure = error => ({
    type: LOGOUT_FAILURE,
    payload: error,
});


export const logout = () => dispatch => {
    dispatch(logoutInit());

    axios({
        url: LOGOUT_ENDPOINT,
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        },
    }).then(({ data }) => {
        dispatch(logoutSuccess(formatResponseBody(data)));
    }).catch(error => {
        dispatch(logoutFailure(error));
    })
};
