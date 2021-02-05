import Messages from './Messages'
import { connect } from 'react-redux';
import { getMessages } from '../../actions/getMessages';
import { receiveMessages } from '../../actions/receiveMessages';
import { sendMessage, updateMessageForm, cleanMessageForm } from '../../actions/sendMessage';
import * as selectors from '../../selectors';

const mapStateToProps = state => ({
    messages: selectors.getMessages(state),
    messageContent: selectors.getMessageContent(state),
});

const mapDispatchToProps = {
    getMessages,
    receiveMessages,
    sendMessage,
    updateMessageForm,
    cleanMessageForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
