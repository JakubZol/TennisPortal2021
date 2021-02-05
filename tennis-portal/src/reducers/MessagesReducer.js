import { GET_MESSAGES_SUCCESS } from "../actions/types";

export default (state = [], action) => {
    switch(action.type) {
        case GET_MESSAGES_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
