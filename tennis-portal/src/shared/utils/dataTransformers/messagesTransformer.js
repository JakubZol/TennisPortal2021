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
