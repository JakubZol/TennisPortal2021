import axios from 'axios';
import { CREATE_ENTRY_INIT, CREATE_ENTRY_SUCCESS, CREATE_ENTRY_FAILURE } from "./types";
import { ENTRIES_SERVICE } from "../shared/constants/endpoints";
import formatRequestBody from "../shared/utils/formatRequestBody";
import formatResponseBody from "../shared/utils/formatResponseBody";


const createEntryInit = () => ({
    type: CREATE_ENTRY_INIT,
});


const createEntrySuccess = tournaments => ({
    type: CREATE_ENTRY_SUCCESS,
    payload: tournaments,
});

const createEntryFailure = error => ({
    type: CREATE_ENTRY_FAILURE,
    payload: error
});

export const createEntry = entry => (dispatch, getState) => {
    dispatch(createEntryInit());

    axios({
        url: ENTRIES_SERVICE,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        },
        data: formatRequestBody(entry),
    }).then(({ data }) => {
        const { ownedTournaments } = getState().tournaments;
        const createdEntry = formatResponseBody(data);

        const updatedTournaments = ownedTournaments.map(tournament =>
            tournament.tournamentId === createdEntry.tournament.tournamentId ? { ...tournament, entry: [ ...tournament.entry, createdEntry ] } : tournament);

        dispatch(createEntrySuccess(updatedTournaments));
    }).catch(error => {
        dispatch(createEntryFailure(error));
    });
};
