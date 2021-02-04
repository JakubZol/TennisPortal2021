import Account from './Account';
import { connect } from 'react-redux';
import { getUser } from "../../selectors/selectors";
import { fetchUserData } from "../../actions/fetchUserData";

const mapStateToProps = state => ({
    user: getUser(state),
});

const mapDispatchToProps = {
    getUserData: fetchUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
