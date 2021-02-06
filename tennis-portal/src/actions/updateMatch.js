import axios from 'axios';
import {
    UPDATE_UPDATE_MATCH_FORM,
    CLEAN_UPDATE_MATCH_FORM,
    UPDATE_MATCH_INIT,
    UPDATE_MATCH_SUCCESS,
    UPDATE_MATCH_FAILURE,
} from "./types";
import {MATCHES_SERVICE} from "../shared/constants/endpoints";
import formatRequestBody from "../shared/utils/formatRequestBody";
import formatResponseBody from "../shared/utils/formatResponseBody";
import determineMatchScore from "../shared/utils/determineMatchScore";
import generateH2HStats from "../shared/utils/dataTransformers/generateH2HStats";


export const updateUpdateMatchForm = matchForm => ({
    type: UPDATE_UPDATE_MATCH_FORM,
    payload: matchForm,
});

export const cleanUpdateMatchForm = () => ({
    type: CLEAN_UPDATE_MATCH_FORM,
});

const updateMatchInit = () => ({
    type: UPDATE_MATCH_INIT,
});

const updateMatchFailure = error => ({
    type: UPDATE_MATCH_FAILURE,
    payload: error,
});

const updateMatchSuccess = matches => ({
    type: UPDATE_MATCH_SUCCESS,
    payload: matches,
});

export const updateMatch = updateMatchForm => (dispatch, getState) => {
    dispatch(updateMatchInit());

    axios({
        url: MATCHES_SERVICE,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        },
        data: JSON.stringify(formatRequestBody(updateMatchForm))
    }).then(({ data }) => {
        const userId = getState().user.user?.id ?? 0;
        const { matches } = getState().matches;
        const updatedMatch = formatResponseBody(data);
        const newMatches = matches.map(({ matchId, ...matchData }) => ({ matchId, victory: determineMatchScore(updatedMatch, userId), ...(matchId === updatedMatch.matchId ? updatedMatch : matchData) }));
        const h2h = generateH2HStats(newMatches, userId);

        dispatch(updateMatchSuccess({ matches: newMatches, h2h }));
        dispatch(cleanUpdateMatchForm());
    }).catch(error => {
        dispatch(updateMatchFailure(error));
    })
};
