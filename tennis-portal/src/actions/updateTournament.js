import axios from 'axios';
import { UPDATE_TOURNAMENT_INIT, UPDATE_TOURNAMENT_SUCCESS, UPDATE_TOURNAMENT_FAILURE, UPDATE_UPDATE_TOURNAMENT_FORM, CLEAN_UPDATE_TOURNAMENT_FORM } from "./types";
import { TOURNAMENTS_SERVICE } from "../shared/constants/endpoints";
import formatResponseBody from "../shared/utils/formatResponseBody";
import formatRequestBody from "../shared/utils/formatRequestBody";


export const updateUpdateTournamentForm = form => ({
    type: UPDATE_UPDATE_TOURNAMENT_FORM,
    payload: form,
});


const cleanUpdateTournamentForm = () => ({
    type: CLEAN_UPDATE_TOURNAMENT_FORM,
});


const updateTournamentInit = () => ({
    type: UPDATE_TOURNAMENT_INIT,
});


const updateTournamentSuccess = tournament => ({
    type: UPDATE_TOURNAMENT_SUCCESS,
    payload: tournament,
});


const updateTournamentFailure = error => ({
    type: UPDATE_TOURNAMENT_FAILURE,
    payload: error,
});


export const updateTournament = tournament => dispatch => {
    dispatch(updateTournamentInit());

    axios({
        url: TOURNAMENTS_SERVICE,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        },
        data: formatRequestBody(tournament),
    }).then(({ data }) => {
        const tournament = formatResponseBody(data);

        dispatch(updateTournamentSuccess(tournament));
        dispatch(cleanUpdateTournamentForm());
    }).catch(error => {
        dispatch(updateTournamentFailure(error));
    });
};
