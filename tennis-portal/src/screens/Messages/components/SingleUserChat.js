import React, { PureComponent } from 'react';
import { arrayOf, func, shape } from 'prop-types';


class SingleUserChat extends PureComponent {

    componentDidMount() {
        const receivedMessages = this.props.messages.filter(({ messageTo, received }) => messageTo && !received).map(({ messageId }) => messageId);

        if (receivedMessages.length > 0) {
            this.props.receiveMessages(receivedMessages);
        }
    }

    render() {
        return(
                <ul>
                    {this.props.messages.map(message => <li key={message.messageId} style={{ color: message.messageFrom ? 'red': 'green' }}>{message.message}</li>)}
                </ul>
        )
    }
}

SingleUserChat.propTypes = {
    messages: arrayOf(shape({})).isRequired,
    receiveMessages: func.isRequired,
};

export default SingleUserChat
