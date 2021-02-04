import {
    REGISTER_USER_SUCCESS,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    FETCH_USER_DATA_SUCCESS,
    DELETE_ACCOUNT_SUCCESS
} from "../actions/types";


const authorizationToken = localStorage.getItem('auth_token');
const INITIAL_STATE = { user: {}, isAuthenticated: !!authorizationToken };


export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case REGISTER_USER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
            };
        case FETCH_USER_DATA_SUCCESS:
            return {
                ...state,
                user: action.payload,
            };
        case LOGOUT_SUCCESS:
        case DELETE_ACCOUNT_SUCCESS:
            return {
                ...state,
                user: {},
                isAuthenticated: false,
            };
        default:
            return state;
    }
};
