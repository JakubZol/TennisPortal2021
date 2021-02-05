import React, { PureComponent } from 'react';
import { func, shape, arrayOf } from 'prop-types';
import SingleUserChat from './components/SingleUserChat';

class Messages extends PureComponent {

    constructor(props){
        super(props);

        this.state = {
            currentChat: props.messages?.user?.id ?? 0,
        };

        this.setCurrentTab.bind(this);
    }

    componentDidMount(){
        this.props.getMessages();
    }

    setCurrentTab(id) {
        this.setState({ currentChat: id })
    }

    render(){
        return (<ul>
            {this.props.messages.map(({ user, messages }) =>
                <li key={user.id}>
                    <button onClick={() => this.setCurrentTab(user.id)}>{user.username} ({messages.length} wiadomości)</button>
                    {this.state.currentChat === user.id && <SingleUserChat messages={messages} receiveMessages={() => {}}/>}
                </li>)
            }
        </ul>)
    }
}

Messages.propTypes = {
    getMessages: func.isRequired,
    messages: arrayOf(
        shape({})
    ).isRequired
};

export default Messages;
