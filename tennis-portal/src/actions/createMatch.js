import { CLEAN_CREATE_MATCH_FORM, UPDATE_CREATE_MATCH_FORM, CREATE_MATCH_INIT, CREATE_MATCH_SUCCESS, CREATE_MATCH_FAILURE, UPDATE_TOURNAMENT_MATCH_FORM, CLEAN_TOURNAMENT_MATCH_FORM, CREATE_TOURNAMENT_MATCH_SUCCESS } from "./types";
import axios from "axios";
import {MATCHES_SERVICE} from "../shared/constants/endpoints";
import formatResponseBody from "../shared/utils/formatResponseBody";
import determineMatchScore from "../shared/utils/determineMatchScore";
import generateH2HStats from "../shared/utils/dataTransformers/generateH2HStats";
import formatRequestBody from "../shared/utils/formatRequestBody";


export const updateCreateMatchForm = matchForm => ({
    type: UPDATE_CREATE_MATCH_FORM,
    payload: matchForm,
});

export const cleanCreateMatchForm = () => ({
    type: CLEAN_CREATE_MATCH_FORM,
});

export const updateTournamentMatchForm = matchForm => ({
    type: UPDATE_TOURNAMENT_MATCH_FORM,
    payload: matchForm,
});

export const cleaTournamentMatchForm = () => ({
    type: CLEAN_TOURNAMENT_MATCH_FORM,
});

const createMatchInit = () => ({
    type: CREATE_MATCH_INIT,
});

const createMatchFailure = error => ({
    type: CREATE_MATCH_FAILURE,
    payload: error,
});

const createMatchSuccess = matches => ({
    type: CREATE_MATCH_SUCCESS,
    payload: matches,
});

const createTournamentMatchSuccess = tournaments => ({
    type: CREATE_TOURNAMENT_MATCH_SUCCESS,
    payload: tournaments,
});

export const createMatch = matchForm => (dispatch, getState) => {
    dispatch(createMatchInit());

    axios({
        url: MATCHES_SERVICE,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        },
        data: JSON.stringify(formatRequestBody(matchForm))
    }).then(({ data }) => {
        const newMatch = formatResponseBody(data);

        if(newMatch.tournament){
            const ownedTournaments = getState()?.tournaments?.ownedTournaments ?? [];
            const updateOwnedTournaments = ownedTournaments.map(tournament => tournament.tournamentId !== newMatch.tournament.tournamentId ? tournament : { ...tournament, matches: [ ...tournament.matches, newMatch ]});

            dispatch(createTournamentMatchSuccess(updateOwnedTournaments));
            dispatch(cleaTournamentMatchForm())
        }
        else {
            const userId = getState().user.user?.id ?? 0;
            const matches = getState()?.matches?.matches ?? [];
            const newMatches = [ ...matches, { ...newMatch, victory: determineMatchScore(newMatch, userId)} ];
            const h2h = generateH2HStats(newMatches, userId);

            dispatch(createMatchSuccess({ matches: newMatches, h2h }));

            dispatch(cleanCreateMatchForm());
        }
    }).catch(error => {
        console.log(error);
        dispatch(createMatchFailure(error));
    })
};

