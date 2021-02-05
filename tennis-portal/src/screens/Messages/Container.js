import Messages from './Messages'
import { connect } from 'react-redux';
import { getMessages } from '../../actions/getMessages';
import * as selectors from '../../selectors';

const mapStateToProps = state => ({
    messages: selectors.getMessages(state),
});

const mapDispatchToProps = {
    getMessages,
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
