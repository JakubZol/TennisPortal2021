import axios from 'axios';
import { SEND_MESSAGE_INIT, SEND_MESSAGE_SUCCESS, SEND_MESSAGE_FAILURE, UPDATE_SEND_MESSAGE_FORM, CLEAN_SEND_MESSAGE_FORM } from './types'
import { MESSAGES_SERVICE } from "../shared/constants/endpoints";
import formatResponseBody from "../shared/utils/formatResponseBody";
import formatRequestBody from "../shared/utils/formatRequestBody";
import { appendNewMessage } from '../shared/utils/dataTransformers/messagesTransformer';


export const updateMessageForm = message => ({
    type: UPDATE_SEND_MESSAGE_FORM,
    payload: message,
});

const sendMessageInit = () => ({
    type: SEND_MESSAGE_INIT
});

const sendMessageSuccess =  messages => ({
    type: SEND_MESSAGE_SUCCESS,
    payload: messages,
});

const sendMessageFailure = error => ({
    type: SEND_MESSAGE_FAILURE,
    payload: error,
});

export const cleanMessageForm = () => ({
    type: CLEAN_SEND_MESSAGE_FORM,
});


export const sendMessage = ({ message, messageTo }) => (dispatch, getState) => {
    dispatch(sendMessageInit());

    const messageFrom = getState().user.user;
    const requestData = formatRequestBody({ messageFrom, messageTo, message });

    axios({
        url: MESSAGES_SERVICE,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        },
        data: JSON.stringify(requestData),
    }).then(({ data }) => {
        const { messages, user: { user: { id: userId } } } = getState();
        const updatedMessages = appendNewMessage(formatResponseBody(data), messages, userId);

        dispatch(sendMessageSuccess(updatedMessages));
        dispatch(cleanMessageForm());
    }).catch(error => {
        dispatch(sendMessageFailure(error));
    })
};
