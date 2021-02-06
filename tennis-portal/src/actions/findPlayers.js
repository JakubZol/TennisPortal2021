import axios from 'axios';
import {
    FIND_PLAYERS_INIT,
    FIND_PLAYERS_SUCCESS,
    FIND_PLAYERS_FAILURE,
    CLEAN_PLAYERS_LIST,
    UPDATE_FIND_PLAYERS_FORM, CLEAN_FIND_PLAYERS_FORM
} from "./types";
import { PLAYERS_SERVICE } from "../shared/constants/endpoints";
import formatResponseBody from "../shared/utils/formatResponseBody";
import buildEndpointWithParams from '../shared/utils/buildEndpointWithParams';
import formatRequestBody from "../shared/utils/formatRequestBody";

const findPlayersInit = () => ({
    type: FIND_PLAYERS_INIT,
});


const findPlayersSuccess = players => ({
    type: FIND_PLAYERS_SUCCESS,
    payload: players,
});

const findPlayersFailure = error => ({
    type: FIND_PLAYERS_FAILURE,
    payload: error,
});

export const updateFindPlayersForm = (identifier, form) => ({
    type: UPDATE_FIND_PLAYERS_FORM,
    payload: form,
    identifier,
});

export const cleanFindPlayersForm = identifier => ({
    type: CLEAN_FIND_PLAYERS_FORM,
    payload: identifier,
});


export const cleanPlayersList = identifier => ({
    type: CLEAN_PLAYERS_LIST,
    payload: identifier,
});


export const findPlayers = (identifier, params) => dispatch => {
    dispatch(findPlayersInit());
    const url = buildEndpointWithParams(PLAYERS_SERVICE, formatRequestBody(params));

    axios({
        url,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        },
    }).then(({ data }) => {
        const players = data.map(player => formatResponseBody(player));
        dispatch(findPlayersSuccess({ [identifier]: players }));
        dispatch(cleanFindPlayersForm(identifier));
    }).catch(error => {
        dispatch(findPlayersFailure(error));
    })
};
