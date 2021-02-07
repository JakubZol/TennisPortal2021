import Messages from './Messages'
import { connect } from 'react-redux';
import { getMessages } from '../../actions/getMessages';
import { receiveMessages } from '../../actions/receiveMessages';
import { sendMessage, updateMessageForm, cleanMessageForm, updateNewChatForm } from '../../actions/sendMessage';
import * as selectors from '../../selectors';
import {getFindPlayersResults} from "../../selectors";
import {getFindPlayersForm} from "../../selectors";
import { findPlayers, updateFindPlayersForm } from "../../actions/findPlayers";
import {getNewChatForm} from "../../selectors";

const mapStateToProps = state => ({
    messages: selectors.getMessages(state),
    messageContent: selectors.getMessageContent(state),
    users: getFindPlayersResults(state),
    findPlayersForm: getFindPlayersForm(state),
    newChatForm: getNewChatForm(state),
});

const mapDispatchToProps = {
    getMessages,
    receiveMessages,
    sendMessage,
    updateMessageForm,
    cleanMessageForm,
    updateFindPlayersForm,
    findPlayers,
    updateNewChatForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
