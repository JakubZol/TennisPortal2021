import React, { PureComponent } from 'react';
import { func, shape, arrayOf } from 'prop-types';
import SingleUserChat from './components/SingleUserChat';
import {sendMessage} from "../../actions/sendMessage";

class Messages extends PureComponent {

    constructor(props){
        super(props);

        this.state = {
            currentChat: undefined,
        };

        this.setCurrentTab.bind(this);
    }

    componentDidMount(){
        this.props.getMessages();
    }

    setCurrentTab(id) {
        this.setState({ currentChat: id });
        this.props.cleanMessageForm();
    }

    onMessageFieldChange = ({ target }) => {
        this.props.updateMessageForm(target.value);
    };

    onMessageSend = messageTo => {
        this.props.sendMessage({ messageTo, message: this.props.messageContent })
    };

    render() {
        return (<ul>
            {this.props.messages.map(({ user, messages }) =>
                <li key={user.id}>
                    <button onClick={() => this.setCurrentTab(user.id)}>{user.username} ({messages.length} wiadomości)</button>
                    {this.state.currentChat === user.id && <div>
                        <SingleUserChat messages={messages} receiveMessages={this.props.receiveMessages}/>
                        <input type="text" value={this.props.messageContent} onChange={this.onMessageFieldChange}/>
                        <button onClick={() => this.onMessageSend(user)} disabled={!this.props.messageContent || this.props.messageContent.length === 0}>Wyślij</button>
                    </div>}
                </li>)
            }
        </ul>)
    }
}

Messages.propTypes = {
    getMessages: func.isRequired,
    receiveMessages: func.isRequired,
    messages: arrayOf(
        shape({})
    ).isRequired
};

export default Messages;
