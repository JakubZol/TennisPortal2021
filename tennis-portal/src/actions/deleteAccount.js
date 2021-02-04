import axios from 'axios';
import { DELETE_ACCOUNT_INIT, DELETE_ACCOUNT_SUCCESS, DELETE_ACCOUNT_FAILURE, UPDATE_DELETE_CONFIRMATION_FORM, CLEAN_DELETE_CONFIRMATION_FORM } from './types'
import { PLAYERS_SERVICE } from "../shared/constants/endpoints";
import formatRequestBody from "../shared/utils/formatRequestBody";


export const updateDeleteAccountForm = deleteConfirmationForm => ({
    type: UPDATE_DELETE_CONFIRMATION_FORM,
    payload: deleteConfirmationForm,
});


const deleteAccountInit = () => ({
    type: DELETE_ACCOUNT_INIT
});

const deleteAccountSuccess = () => {
    localStorage.removeItem('auth_token');

    return {
        type: DELETE_ACCOUNT_SUCCESS,
    };
};

const deleteAccountFailure = error => ({
    type: DELETE_ACCOUNT_FAILURE,
    payload: error,
});

const cleanDeleteAccountForm = () => ({
    type: CLEAN_DELETE_CONFIRMATION_FORM,
});


export const deleteAccount = deleteConfirmationForm => dispatch => {
    dispatch(deleteAccountInit());
    console.log(deleteConfirmationForm);
    console.log(formatRequestBody(deleteConfirmationForm));

    axios({
        url: PLAYERS_SERVICE,
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        },
        data: JSON.stringify(formatRequestBody(deleteConfirmationForm)),
    }).then(() => {
        dispatch(deleteAccountSuccess());
        dispatch(cleanDeleteAccountForm());
    }).catch(error => {
        dispatch(deleteAccountFailure(error));
    })
};
