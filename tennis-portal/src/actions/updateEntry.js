import axios from 'axios';
import { UPDATE_ENTRY_INIT, UPDATE_ENTRY_SUCCESS, UPDATE_ENTRY_FAILURE } from "./types";
import { ENTRIES_SERVICE } from "../shared/constants/endpoints";
import formatRequestBody from "../shared/utils/formatRequestBody";
import formatResponseBody from "../shared/utils/formatResponseBody";


const updateEntryInit = () => ({
    type: UPDATE_ENTRY_INIT,
});


const updateEntrySuccess = tournaments => ({
    type: UPDATE_ENTRY_SUCCESS,
    payload: tournaments,
});

const updateEntryFailure = error => ({
    type: UPDATE_ENTRY_FAILURE,
    payload: error
});

export const updateEntry = entry => (dispatch, getState) => {
    dispatch(updateEntryInit());

    axios({
        url: ENTRIES_SERVICE,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        },
        data: formatRequestBody(entry),
    }).then(({ data }) => {
        const { tournaments } = getState().tournaments;
        const updatedEntry = formatResponseBody(data);

        const updatedTournaments = tournaments.map(tournament =>
            tournament.tournamentId === updatedEntry.tournament.tournamentId ? { ...tournament, entry: tournament.entry.map(currentEntry =>
                    currentEntry.player.id === updatedEntry.player.id ? updatedEntry : currentEntry
                )} : tournament);

        dispatch(updateEntrySuccess(updatedTournaments));
    }).catch(error => {
        dispatch(updateEntryFailure(error));
    });
};
