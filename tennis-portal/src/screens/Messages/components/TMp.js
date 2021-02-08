import React, { PureComponent } from 'react';
import { func, shape, arrayOf } from 'prop-types';
import SingleUserChat from './components/SingleUserChat';

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

    onFindPlayerFilterChange = (value, key) => {
        this.props.updateFindPlayersForm('newChat', { [key]: value });
    };

    searchPlayers = () => {
        this.props.findPlayers('newChat', this.props.findPlayersForm['newChat']);
    };

    render() {
        const { name, minNtrp, maxNtrp, minAge, maxAge, gender } = this.props.findPlayersForm ?? {};

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
            <div>
                New chat
                <div>
                    <input type="text" placeholder='Imię lub nick' value={name}
                           onChange={({target}) => this.onFindPlayerFilterChange(target.value, 'name')}/>
                    <input type="number" min="1" max="7" step="0.5" placeholder="Min. NTRP" value={minNtrp}
                           onChange={({target}) => this.onFindPlayerFilterChange(target.value, 'minNtrp')}/>
                    <input type="number" min="1" max="7" step="0.5" placeholder="Max. NTRP" value={maxNtrp}
                           onChange={({target}) => this.onFindPlayerFilterChange(target.value, 'maxNtrp')}/>
                    <input type="number" placeholder="Min. wiek" value={minAge}
                           onChange={({target}) => this.onFindPlayerFilterChange(target.value, 'minAge')}/>
                    <input type="number" placeholder="Max. wiek" value={maxAge}
                           onChange={({target}) => this.onFindPlayerFilterChange(target.value, 'maxAge')}/>
                    <select placeholder="Płeć" value={gender}
                            onChange={({target}) => this.onFindPlayerFilterChange(target.value, 'gender')}>
                        <option>M</option>
                        <option>W</option>
                    </select>
                    <button onClick={() => this.searchPlayers()}>Szukaj</button>
                </div>
                <div> {/* todo: update new chat psuje się dla zawodników z okrągłym ntrp (int -> double)*/}
                    {(this.props.users?.newChat?.filter(({ id }) => this.props.messages.map(({ user }) => user.id).indexOf(id) === -1) ?? []).map((player) => <button key={`newChat-${player.id}`} onClick={() => {this.props.updateNewChatForm({ messageTo: player })}}>{player.username}</button> )}
                </div>
                <div>
                    <div> Message To: {this.props?.newChatForm?.messageTo?.username ?? ''} </div>
                    <div><input type="text" value={this.props.newChatForm.message} placeholder="Wiadomość" onChange={({ target }) => this.props.updateNewChatForm({ message: target.value })} /></div>
                    <button onClick={() => this.props.sendMessage(this.props.newChatForm)}>Wyślij</button>
                </div>
            </div>
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
