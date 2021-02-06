import axios from 'axios';
import { GET_MATCHES_INIT, GET_MATCHES_FAILURE, GET_MATCHES_SUCCESS } from './types';
import { MATCHES_SERVICE } from "../shared/constants/endpoints";
import formatResponseBody from "../shared/utils/formatResponseBody";
import determineMatchScore from "../shared/utils/determineMatchScore";
import generateH2HStats from "../shared/utils/dataTransformers/generateH2HStats";


const fetchMatchesInit = () => ({
    type: GET_MATCHES_INIT,
});

const fetchMatchesFailure = error => ({
    type: GET_MATCHES_FAILURE,
    payload: error,
});

const fetchMatchesSuccess = matches => ({
    type: GET_MATCHES_SUCCESS,
    payload: matches,
});

export const fetchMatches = () => (dispatch, getState) => {
    dispatch(fetchMatchesInit());

    axios({
        url: MATCHES_SERVICE,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        },
    }).then(({ data }) => {
        const userId = getState().user.user?.id ?? 0;
        const matches = data.map(match => formatResponseBody(match)).map(match => ({ ...match, victory: determineMatchScore(match, userId)}));
        const h2h = generateH2HStats(matches, userId);
        dispatch(fetchMatchesSuccess({ matches, h2h }));
    }).catch(error => {
        dispatch(fetchMatchesFailure(error));
    })
};

