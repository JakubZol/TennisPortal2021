export default (messages, userId) => {
    const formattedMessagesList = [];

    for(let message of messages){
        const { messageFrom, messageTo, ...messageData } = message;

        const isMessageFrom = messageFrom.id === userId;
        const messagingUser = !isMessageFrom ? messageFrom : messageTo;
        const userIndex = formattedMessagesList.findIndex(({ user }) => user.id === messagingUser.id);
        const newMessage = { ...messageData, messageFrom: isMessageFrom, messageTo: !isMessageFrom };
        if(userIndex === -1) {
            formattedMessagesList.push({
                user: messagingUser,
                messages: [newMessage],
            });
        } else {
            formattedMessagesList[userIndex].messages.push(newMessage);
        }
    }

    return formattedMessagesList;
}

export const appendNewMessage = (message, messages, userId) => {
    const { messageFrom, messageTo, ...messageData } = message;

    const isMessageFrom = messageFrom.id === userId;
    const messagingUser = !isMessageFrom ? messageFrom : messageTo;
    return messages.map(({ user, messages }) => ({
        user,
        messages: user.id === messagingUser.id ? [ ...messages, { ...messageData, messageFrom: isMessageFrom, messageTo: !isMessageFrom } ] : messages,
    }))
};
