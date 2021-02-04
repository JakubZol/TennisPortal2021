import axios from 'axios';
import { FETCH_USER_DATA_INIT, FETCH_USER_DATA_SUCCESS, FETCH_USER_DATA_FAILURE } from './types'
import { PLAYERS_SERVICE } from "../shared/constants/endpoints";
import formatResponseBody from "../shared/utils/formatResponseBody";


const fetchUserDataInit = () => ({
    type: FETCH_USER_DATA_INIT
});

const fetchUserDataSuccess =  userData => ({
    type: FETCH_USER_DATA_SUCCESS,
    payload: userData,
});

const fetchUserDataFailure = error => ({
    type: FETCH_USER_DATA_FAILURE,
    payload: error,
});


export const fetchUserData = () => dispatch => {
    dispatch(fetchUserDataInit());

    axios({
        url: PLAYERS_SERVICE,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        },
    }).then(({ data }) => {
        dispatch(fetchUserDataSuccess(formatResponseBody(data)));
    }).catch(error => {
        dispatch(fetchUserDataFailure(error));
    })
};
