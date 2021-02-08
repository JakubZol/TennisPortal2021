import React from 'react';
import Button from "../../../../shared/components/Button/Button";
import { arrayOf, shape, func, number, string } from 'prop-types';

const AddNewChat = ({ users, findPlayers, chatUsers, newChatForm, updateNewChatForm, sendMessage }) => {


    const onUserInputType = ({ target }) => {
        if (target.value.length > 0) {
            findPlayers('newChat', {name: target.value})
        }
    };

    const onNewChatUserSelect = user => {
        updateNewChatForm({ messageTo: user });
    };

    const onNewMessageInputType = ({ target }) => {
        updateNewChatForm({ message: target.value })
    };

    const sendNewMessage = () => {
        sendMessage(newChatForm);
    };

    const newChatUser = newChatForm?.messageTo;
    const results = users?.newChat?.filter(({ id }) => !chatUsers.includes(id)) ?? [];
    const sendMessageButtonDisabled = newChatForm?.message?.length === 0;

    return (
        <div className="messages-screen__chat">
            <div className="messages-screen__chat-header">Utwórz nowy chat</div>
            <div className="messages-screen__new-chat-search">
                <input className="messages-screen__search-users-input" placeholder="Szukaj użytkownika" onChange={onUserInputType} />
                <div className="messages-screen__search-results-container" >
                    {results.map(user =>
                        <div className="messages-screen__search-user-tab" onClick={() => onNewChatUserSelect(user)}>
                            <div>{user.firstName} {user.lastName}</div>
                            <div className="messages-screen__email">{user.email}</div>
                        </div>)}
                </div>
            </div>
            {newChatUser && (
                <div className="messages-screen__new-chat">
                    <div className="messages-screen__new-chat-user">{newChatUser.firstName} {newChatUser.lastName}</div>
                    <div className="messages-screen__new-chat-controls">
                        <input placeholder="Wiadomość" value={newChatForm.message} onChange={onNewMessageInputType}/>
                        <Button label="Wyślij wiadomość" disabled={sendMessageButtonDisabled} onClick={sendNewMessage}/>
                    </div>
                </div>
            )}
        </div>
    );
};

AddNewChat.propTypes = {
    users: shape({
        newChat: arrayOf(shape({}))
    }).isRequired,
    findPlayers: func.isRequired,
    chatUsers: arrayOf(number).isRequired,
    updateNewChatForm: func.isRequired,
    sendMessage: func.isRequired,
    newChatForm: shape({
        message: string,
    }).isRequired,
};

export default AddNewChat;
