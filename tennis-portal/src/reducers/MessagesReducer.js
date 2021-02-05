import { GET_MESSAGES_SUCCESS, RECEIVE_MESSAGES_SUCCESS, LOGOUT_SUCCESS, SEND_MESSAGE_SUCCESS } from "../actions/types";

export default (state = [], action) => {
    switch(action.type) {
        case GET_MESSAGES_SUCCESS:
        case RECEIVE_MESSAGES_SUCCESS:
        case SEND_MESSAGE_SUCCESS:
            return action.payload;
        case LOGOUT_SUCCESS:
            return [];
        default:
            return state;
    }
}
