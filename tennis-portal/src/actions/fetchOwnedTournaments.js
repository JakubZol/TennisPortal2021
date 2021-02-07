import axios from 'axios';
import { FETCH_OWNED_TOURNAMENTS_FAILURE, FETCH_OWNED_TOURNAMENTS_INIT, FETCH_OWNED_TOURNAMENTS_SUCCESS } from "./types";
import { OWNED_TOURNAMENTS_ENDPOINT } from "../shared/constants/endpoints";
import formatResponseBody from "../shared/utils/formatResponseBody";


const fetchOwnedTournamentsInit = () => ({
    type: FETCH_OWNED_TOURNAMENTS_INIT,
});

const fetchOwnedTournamentsSuccess = tournaments => ({
    type: FETCH_OWNED_TOURNAMENTS_SUCCESS,
    payload: tournaments,
});

const fetchOwnedTournamentsFailure = error => ({
    type: FETCH_OWNED_TOURNAMENTS_FAILURE,
    payload: error,
});

export const fetchOwnedTournaments = () => dispatch => {
    dispatch(fetchOwnedTournamentsInit());

    axios({
        url: OWNED_TOURNAMENTS_ENDPOINT,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        },
    }).then(({ data }) => {
        const tournaments = data.map(tournament => formatResponseBody(tournament));
        dispatch(fetchOwnedTournamentsSuccess(tournaments));
    }).catch(error => {
        dispatch(fetchOwnedTournamentsFailure(error));
    })


};
