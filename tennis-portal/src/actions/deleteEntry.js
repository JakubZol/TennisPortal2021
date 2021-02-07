import axios from 'axios';
import { DELETE_ENTRY_INIT, DELETE_ENTRY_SUCCESS, DELETE_ENTRY_FAILURE } from "./types";
import { ENTRIES_SERVICE } from "../shared/constants/endpoints";
import formatRequestBody from "../shared/utils/formatRequestBody";


const deleteEntryInit = () => ({
    type: DELETE_ENTRY_INIT,
});


const deleteEntrySuccess = tournaments => ({
    type: DELETE_ENTRY_SUCCESS,
    payload: tournaments,
});

const deleteEntryFailure = error => ({
    type: DELETE_ENTRY_FAILURE,
    payload: error
});

export const deleteEntry = entry => (dispatch, getState) => {
    dispatch(deleteEntryInit());

    axios({
        url: ENTRIES_SERVICE,
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        },
        data: formatRequestBody(entry),
    }).then(() => {
        const { tournaments } = getState().tournaments;

        // TODO: co jak usuwamy innego zawodnika z naszego turnieju?
        const updatedTournaments = tournaments.filter(({ tournamentId }) => tournamentId !== entry.tournament.tournamentId);
        dispatch(deleteEntrySuccess(updatedTournaments));
    }).catch(error => {
        dispatch(deleteEntryFailure(error));
    });
};
