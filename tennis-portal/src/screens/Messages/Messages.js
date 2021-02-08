import React, { useEffect, useState } from 'react';
import { func, shape, arrayOf, string } from 'prop-types';
import Panel from "../../shared/components/Panel";
import UsersList from './components/UsersList';
import SingleUserChat from './components/SingleUserChat/SingleUserChat';
import AddNewChat from './components/AddNewChat';

import './messages-screen.scss';


const Messages = ({ getMessages, receiveMessages, sendMessage, updateMessageForm, cleanMessageForm, updateFindPlayersForm, findPlayers, newChatForm, users: foundUsers, messages, messageContent, updateNewChatForm }) => {

    const [ currentChat, setCurrentChat ] = useState(0);

    useEffect(() => {
        getMessages();
    }, []);

    const users = messages.map(({ user }) => user);
    const chatUsers = users.map(({ id }) => id);
    const currentChatMessages = messages?.[currentChat]?.messages ?? [];
    const currentChatUser = messages?.[currentChat]?.user ?? {};

    return (
        <div className="messages-screen">
            <Panel className="messages-screen__panel">
                <div className="messages-screen__content">
                    <UsersList users={users} setCurrentChat={setCurrentChat} currentChat={currentChat} />
                    {currentChat < users.length ?
                        (<SingleUserChat
                            messages={currentChatMessages}
                            receiveMessages={receiveMessages}
                            user={currentChatUser}
                            messageContent={messageContent}
                            sendMessage={sendMessage}
                            updateMessageForm={updateMessageForm}
                        />) : (
                            <AddNewChat
                                users={foundUsers}
                                findPlayers={findPlayers}
                                chatUsers={chatUsers}
                                newChatForm={newChatForm}
                                sendMessage={sendMessage}
                                updateNewChatForm={updateNewChatForm}
                            />
                        )}
                </div>
            </Panel>
        </div>
    );
};


Messages.propTypes = {
    getMessages: func.isRequired,
    receiveMessages: func.isRequired,
    sendMessage: func.isRequired,
    updateMessageForm: func.isRequired,
    cleanMessageForm: func.isRequired,
    updateFindPlayersForm: func.isRequired,
    findPlayers: func.isRequired,
    newChatForm: shape({
        message: string,
    }).isRequired,
    messages: arrayOf(
        shape({})
    ).isRequired,
    users: arrayOf(shape({})),
    updateNewChatForm: func.isRequired,
    messageContent: string,
};

Messages.defaultProps = {
    messageContent: string.isRequired,
};

export default Messages;
