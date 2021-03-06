import {
    UPDATE_REGISTER_FORM,
    CLEAN_REGISTER_FORM,
    UPDATE_LOGIN_FORM,
    CLEAN_LOGIN_FORM,
    UPDATE_DELETE_CONFIRMATION_FORM,
    CLEAN_DELETE_CONFIRMATION_FORM,
    UPDATE_USER_DATA_FORM,
    CLEAN_USER_DATA_FORM,
    UPDATE_PASSWORD_FORM,
    CLEAN_PASSWORD_FORM,
    UPDATE_SEND_MESSAGE_FORM,
    CLEAN_SEND_MESSAGE_FORM,
    LOGOUT_SUCCESS,
    UPDATE_FIND_PLAYERS_FORM,
    CLEAN_FIND_PLAYERS_FORM,
    UPDATE_CREATE_MATCH_FORM,
    CLEAN_CREATE_MATCH_FORM,
    UPDATE_UPDATE_MATCH_FORM,
    CLEAN_UPDATE_MATCH_FORM,
    CLEAN_CREATE_TOURNAMENT_FORM,
    UPDATE_CREATE_TOURNAMENT_FORM,
    CLEAN_UPDATE_TOURNAMENT_FORM,
    UPDATE_UPDATE_TOURNAMENT_FORM,
    UPDATE_TOURNAMENT_MATCH_FORM,
    CLEAN_TOURNAMENT_MATCH_FORM,
    CLEAN_NEW_CHAT_FORM,
    UPDATE_NEW_CHAT_FORM,
} from "../actions/types";



const INITIAL_STATE = {
    register: {},
    login: {},
    deleteConfirmation: {},
    updateUser: {},
    updatePassword: {},
    message: '',
    newChat: {},
    findPlayers: {},
    match: {},
    updateMatch: {},
    createTournament: {},
    updateTournament: {},
    tournamentMatch: {},
};


export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case UPDATE_REGISTER_FORM:
            return { ...state, register: { ...state.register, ...action.payload } };
        case CLEAN_REGISTER_FORM:
            return { ...state, register: {} };
        case UPDATE_LOGIN_FORM:
            return { ...state, login: { ...state.login, ...action.payload } };
        case CLEAN_LOGIN_FORM:
            return { ...state, login: {} };
        case UPDATE_DELETE_CONFIRMATION_FORM:
            return { ...state, deleteConfirmation: { ...state.deleteConfirmation, ...action.payload } };
        case CLEAN_DELETE_CONFIRMATION_FORM:
            return { ...state, deleteConfirmation: {} };
        case UPDATE_USER_DATA_FORM:
            return { ...state, updateUser: { ...state.updateUser, ...action.payload } };
        case CLEAN_USER_DATA_FORM:
            return { ...state, updateUser: INITIAL_STATE.updateUser };
        case UPDATE_PASSWORD_FORM:
            return { ...state, updatePassword: { ...state.updatePassword, ...action.payload } };
        case CLEAN_PASSWORD_FORM:
            return { ...state, updatePassword: {} };
        case UPDATE_SEND_MESSAGE_FORM:
            return { ...state, message: action.payload };
        case CLEAN_SEND_MESSAGE_FORM:
            return { ...state, message: '' };
        case UPDATE_NEW_CHAT_FORM:
            return { ...state, newChat: { ...state.newChat, ...action.payload }};
        case CLEAN_NEW_CHAT_FORM:
            return { ...state, newChat: { }};
        case UPDATE_FIND_PLAYERS_FORM:
            return { ...state, findPlayers: { ...state.findPlayers, [action.identifier]: { ...state.findPlayers[action.identifier], ...action.payload } }};
        case CLEAN_FIND_PLAYERS_FORM:
            const findPlayers = Object.keys(state.findPlayers).filter(key => key !== action.payload).reduce((newState, key) => ({ ...newState, [key]: state.findPlayers[key] }), {});
            return { ...state, findPlayers };
        case UPDATE_CREATE_MATCH_FORM:
            return { ...state, match: { ...state.match, ...action.payload } };
        case CLEAN_CREATE_MATCH_FORM:
            return { ...state, match: { } };
        case UPDATE_UPDATE_MATCH_FORM:
            return { ...state, updateMatch: { ...state.updateMatch, ...action.payload } };
        case CLEAN_UPDATE_MATCH_FORM:
            return { ...state, updateMatch: { } };
        case UPDATE_CREATE_TOURNAMENT_FORM:
            return { ...state, createTournament: { ...state.createTournament, ...action.payload } };
        case CLEAN_CREATE_TOURNAMENT_FORM:
            return { ...state, createTournament: { } };
        case UPDATE_UPDATE_TOURNAMENT_FORM:
            return { ...state, updateTournament: { ...state.updateTournament, ...action.payload } };
        case CLEAN_UPDATE_TOURNAMENT_FORM:
            return { ...state, updateTournament: { } };
        case UPDATE_TOURNAMENT_MATCH_FORM:
            return { ...state, tournamentMatch: { ...state.tournamentMatch, ...action.payload }};
        case CLEAN_TOURNAMENT_MATCH_FORM:
            return { ...state, tournamentMatch: { } };
        case LOGOUT_SUCCESS:
            return INITIAL_STATE;
        default:
            return state;
    }
}
