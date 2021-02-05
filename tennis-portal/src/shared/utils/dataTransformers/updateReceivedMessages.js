export default (allMessages, updatedMessages) => {
    const updatedMessagesId = updatedMessages.map(({ messageId }) => messageId);

    return allMessages.map(({ user, messages }) => ({
        user,
        messages: messages.map(({ received, messageId, ...messageData }) =>  ({ messageId, received: updatedMessagesId.includes(messageId), ...messageData })),
    }));
}
