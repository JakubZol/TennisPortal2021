import axios from 'axios';
import { RECEIVE_MESSAGES_INIT, RECEIVE_MESSAGES_SUCCESS, RECEIVE_MESSAGES_FAILURE } from './types'
import { MESSAGES_SERVICE } from "../shared/constants/endpoints";
import formatResponseBody from "../shared/utils/formatResponseBody";
import updateReceivedMessages from '../shared/utils/dataTransformers/updateReceivedMessages'


const receiveMessagesInit = () => ({
    type: RECEIVE_MESSAGES_INIT
});

const receiveMessagesSuccess =  (messages, updatedMessages) => ({
    type: RECEIVE_MESSAGES_SUCCESS,
    payload: updateReceivedMessages(messages, updatedMessages),
});

const receiveMessagesFailure = error => ({
    type: RECEIVE_MESSAGES_FAILURE,
    payload: error,
});


export const receiveMessages = messages => (dispatch, getState) => {
    dispatch(receiveMessagesInit());

    axios({
        url: MESSAGES_SERVICE,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        },
        data: JSON.stringify({ messages }),
    }).then(({ data }) => {
        const allMessages = getState().messages;
        const updatedMessages = data.map(message => formatResponseBody(message));
        dispatch(receiveMessagesSuccess(allMessages, updatedMessages));
    }).catch(error => {
        dispatch(receiveMessagesFailure(error));
    })
};
