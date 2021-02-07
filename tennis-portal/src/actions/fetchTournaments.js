import axios from 'axios';
import { FETCH_TOURNAMENTS_FAILURE, FETCH_TOURNAMENTS_INIT, FETCH_TOURNAMENTS_SUCCESS } from "./types";
import { TOURNAMENTS_SERVICE } from "../shared/constants/endpoints";
import formatResponseBody from "../shared/utils/formatResponseBody";


const fetchTournamentsInit = () => ({
    type: FETCH_TOURNAMENTS_INIT,
});

const fetchTournamentsSuccess = tournaments => ({
    type: FETCH_TOURNAMENTS_SUCCESS,
    payload: tournaments,
});

const fetchTournamentsFailure = error => ({
    type: FETCH_TOURNAMENTS_FAILURE,
    payload: error,
});

export const fetchTournaments = () => dispatch => {
    dispatch(fetchTournamentsInit());

    axios({
        url: TOURNAMENTS_SERVICE,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        },
    }).then(({ data }) => {
        const tournaments = data.map(tournament => formatResponseBody(tournament));
        dispatch(fetchTournamentsSuccess(tournaments));
    }).catch(error => {
        dispatch(fetchTournamentsFailure(error));
    })


};
