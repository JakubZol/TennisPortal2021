import axios from 'axios';
import { GET_MESSAGES_INIT, GET_MESSAGES_SUCCESS, GET_MESSAGES_FAILURE } from './types'
import { MESSAGES_SERVICE } from "../shared/constants/endpoints";
import formatResponseBody from "../shared/utils/formatResponseBody";
import formatMessages from '../shared/utils/dataTransformers/messagesTransformer';


const getMessagesInit = () => ({
    type: GET_MESSAGES_INIT
});

const getMessagesSuccess =  (messages, userId) => ({
    type: GET_MESSAGES_SUCCESS,
    payload: formatMessages(messages, userId),
});

const getMessagesFailure = error => ({
    type: GET_MESSAGES_FAILURE,
    payload: error,
});


export const getMessages = () => (dispatch, getState) => {
    dispatch(getMessagesInit());

    axios({
        url: MESSAGES_SERVICE,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        },
    }).then(({ data }) => {
        const userId = getState().user.user?.id ?? 0;
        const messages = data.map(message => formatResponseBody(message));
        dispatch(getMessagesSuccess(messages, userId));
    }).catch(error => {
        dispatch(getMessagesFailure(error));
    })
};
