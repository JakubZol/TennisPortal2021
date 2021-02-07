import {
    CREATE_ENTRY_SUCCESS, CREATE_TOURNAMENT_SUCCESS,
    DELETE_ENTRY_SUCCESS,
    FETCH_OWNED_TOURNAMENTS_SUCCESS,
    FETCH_TOURNAMENTS_SUCCESS,
    UPDATE_ENTRY_SUCCESS,
    UPDATE_TOURNAMENT_SUCCESS,
    CREATE_TOURNAMENT_MATCH_SUCCESS,
} from "../actions/types";

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_TOURNAMENTS_SUCCESS:
        case UPDATE_ENTRY_SUCCESS:
        case DELETE_ENTRY_SUCCESS:
            return { ...state, tournaments: action.payload };
        case FETCH_OWNED_TOURNAMENTS_SUCCESS:
        case CREATE_ENTRY_SUCCESS:
        case CREATE_TOURNAMENT_MATCH_SUCCESS:
            return { ...state, ownedTournaments: action.payload };
        case CREATE_TOURNAMENT_SUCCESS:
            return { ...state, ownedTournaments: [ ...state.ownedTournaments, action.payload ]};
        case UPDATE_TOURNAMENT_SUCCESS:
            return { ...state, ownedTournaments: state.ownedTournaments.map(({ tournamentId, ...tournamentData }) => tournamentId !== action.payload.tournamentId ? { tournamentId, ...tournamentData } : action.payload) };
        default:
            return state;
    }
}
