import { FIND_PLAYERS_SUCCESS, CLEAN_PLAYERS_LIST } from "../actions/types";


export default (state = {}, action) => {
    switch(action.type) {
        case FIND_PLAYERS_SUCCESS:
            return {...state, ...action.payload };
        case CLEAN_PLAYERS_LIST:
            return Object.keys(state).filter(key => key !== action.payload).reduce((newState, key) => ({
                ...newState,
                [key]: state[key]
            }), {});
        default:
            return state;
    }
}
