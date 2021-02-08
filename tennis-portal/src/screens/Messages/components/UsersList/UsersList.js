import React from 'react';
import { arrayOf, shape, string, number, func } from 'prop-types';


const UsersList = ({ users, setCurrentChat, currentChat }) => (
    <div className="messages-screen__users-list">
        {users.map(({ id, firstName, lastName, username, email }, index) => (
            <div className={`messages-screen__user-link ${currentChat === index ? 'active' : ''}`} key={`users-list-${id}`} onClick={() => setCurrentChat(index)}>
                {firstName} {lastName} ({username})
                <div className="messages-screen__email">{email}</div>
            </div>
        ))}
        <div className={`messages-screen__user-link ${currentChat === users.length ? 'active' : ''}`} key={`users-list-${users.length}`} onClick={() => setCurrentChat(users.length)}>
            Nowy chat
        </div>
    </div>
);

UsersList.propTypes = {
    users: arrayOf(shape({
        id: number.isRequired,
        email: string.isRequired,
        username: string.isRequired,
        firstName: string.isRequired,
        lastName: string.isRequired,
    })).isRequired,
    setCurrentChat: func.isRequired,
    currentChat: number.isRequired,
};

export default UsersList;
