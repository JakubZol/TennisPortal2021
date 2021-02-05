import {
    UPDATE_REGISTER_FORM,
    CLEAN_REGISTER_FORM,
    UPDATE_LOGIN_FORM,
    CLEAN_LOGIN_FORM,
    UPDATE_DELETE_CONFIRMATION_FORM,
    CLEAN_DELETE_CONFIRMATION_FORM,
    UPDATE_USER_DATA_SUCCESS, UPDATE_USER_DATA_FORM, CLEAN_USER_DATA_FORM, UPDATE_PASSWORD_FORM, CLEAN_PASSWORD_FORM
} from "../actions/types";



const INITIAL_STATE = {
    register: {},
    login: {},
    deleteConfirmation: {},
    updateUser: {
        username: { writable: false },
        email: { writable: false },
        firstName: { writable: false },
        lastName: { writable: false },
        height: { writable: false },
        weight: { writable: false },
        gender: { writable: false },
        birthdate: { writable: false },
        plays: { writable: false },
        backhand: { writable: false },
        ntrp: { writable: false },
    },
    updatePassword: {}
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
            return { ...state, updateUser: { ...state.updateUser, [action.field]: action.payload } };
        case CLEAN_USER_DATA_FORM:
            return { ...state, updateUser: INITIAL_STATE.updateUser };
        case UPDATE_PASSWORD_FORM:
            return { ...state, updatePassword: { ...state.updatePassword, ...action.payload } };
        case CLEAN_PASSWORD_FORM:
            return { ...state, updatePassword: {} };
        default:
            return state;
    }
}
