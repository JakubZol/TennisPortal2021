import axios from 'axios';
import { CREATE_TOURNAMENT_INIT, CREATE_TOURNAMENT_SUCCESS, CREATE_TOURNAMENT_FAILURE, UPDATE_CREATE_TOURNAMENT_FORM, CLEAN_CREATE_TOURNAMENT_FORM } from "./types";
import { TOURNAMENTS_SERVICE } from "../shared/constants/endpoints";
import formatResponseBody from "../shared/utils/formatResponseBody";
import formatRequestBody from "../shared/utils/formatRequestBody";


export const updateCreateTournamentForm = form => ({
    type: UPDATE_CREATE_TOURNAMENT_FORM,
    payload: form,
});


const cleanCreateTournamentForm = () => ({
    type: CLEAN_CREATE_TOURNAMENT_FORM,
});


const createTournamentInit = () => ({
    type: CREATE_TOURNAMENT_INIT,
});


const createTournamentSuccess = tournament => ({
    type: CREATE_TOURNAMENT_SUCCESS,
    payload: tournament,
});


const createTournamentFailure = error => ({
    type: CREATE_TOURNAMENT_FAILURE,
    payload: error,
});


export const createTournament = tournament => dispatch => {
    dispatch(createTournamentInit());

    axios({
        url: TOURNAMENTS_SERVICE,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        },
        data: formatRequestBody(tournament),
    }).then(({ data }) => {
        const tournament = formatResponseBody(data);

        dispatch(createTournamentSuccess(tournament));
        dispatch(cleanCreateTournamentForm());
    }).catch(error => {
        dispatch(createTournamentFailure(error));
    });
};
