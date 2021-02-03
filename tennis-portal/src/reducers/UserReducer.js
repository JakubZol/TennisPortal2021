import { REGISTER_USER_SUCCESS, LOGIN_SUCCESS } from "../actions/types";


export default (state = {}, action) => {
    switch(action.type) {
        case REGISTER_USER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state
    }
};
