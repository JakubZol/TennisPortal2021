import {CREATE_MATCH_SUCCESS, GET_MATCHES_SUCCESS, UPDATE_MATCH_SUCCESS} from "../actions/types";

export default (state = {}, action) => {
    switch(action.type){
        case GET_MATCHES_SUCCESS:
        case CREATE_MATCH_SUCCESS:
        case UPDATE_MATCH_SUCCESS:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
