import React, { useRef, useEffect } from 'react';
import { arrayOf, func, shape, string, number, bool } from 'prop-types';
import Button from "../../../../shared/components/Button/Button";


const SingleUserChat = ({ messages, receiveMessages, user, messageContent, sendMessage, updateMessageForm }) => {

    const chatBottom = useRef(null);

    useEffect(() => {
        const receivedMessages = messages.filter(({ messageTo, received }) => messageTo && !received).map(({ messageId }) => messageId);

        if (receivedMessages.length > 0) {
            receiveMessages(receivedMessages);
        }

        if (chatBottom) {
            chatBottom.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    const onMessageType = ({ target }) => {
        updateMessageForm(target.value);
    };

    const onMessageSubmit = () => {
        sendMessage({ messageTo: user, message: messageContent })
    };

    const sendMessageButtonDisabled = messageContent.length === 0;

    return (
        <div className="messages-screen__chat">
            <div className="messages-screen__chat-header">{user.firstName} {user.lastName}</div>
            <div className="messages-screen__chat-messages">{messages.map(({ messageId, message, messageFrom, received }) =>
                <div key={messageId} className={`messages-screen__message ${messageFrom ? 'from': 'to'}`}>
                    {message}
                    {!received && <div className="messages-screen__message--not-received">nie odczytano</div>}
                </div>)}
                <div ref={chatBottom} className="messages-screen__chat-bottom" />
            </div>
            <div className="messages-screen__send-message-form">
                <input value={messageContent} onChange={onMessageType} type="text" placeholder="Nowa wiadomość" className="messages-screen__send-message-input" required />
                <Button className="messages-screen__send-message-button" label="Wyślij" onClick={onMessageSubmit} disabled={sendMessageButtonDisabled}/>
            </div>
        </div>
    );
};


SingleUserChat.propTypes = {
    messages: arrayOf(shape({
        messageId: number.isRequired,
        message: string.isRequired,
        messageFrom: bool.isRequired,
        received: bool.isRequired,
    })).isRequired,
    receiveMessages: func.isRequired,
    user: shape({
        id: number.isRequired,
        email: string.isRequired,
        username: string.isRequired,
        firstName: string.isRequired,
        lastName: string.isRequired,
    }).isRequired,
    messageContent: string,
    sendMessage: func.isRequired,
    updateMessageForm: func.isRequired,
};

SingleUserChat.defaultProps = {
    messageContent: '',
};

export default SingleUserChat
