import { UPDATE_REGISTER_FORM, CLEAN_REGISTER_FORM, UPDATE_LOGIN_FORM, CLEAN_LOGIN_FORM, UPDATE_DELETE_CONFIRMATION_FORM, CLEAN_DELETE_CONFIRMATION_FORM } from "../actions/types";



const INITIAL_STATE = {
    register: {},
    login: {},
    deleteConfirmation: {},
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
        default:
            return state;
    }
}
