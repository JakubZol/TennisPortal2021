import Account from './Account';
import { connect } from 'react-redux';
import { getUpdateUserForm, getUser } from "../../selectors/selectors";
import { fetchUserData } from "../../actions/fetchUserData";
import { updateUserDataForm, updateUserData } from "../../actions/updateUserData";

const mapStateToProps = state => ({
    user: getUser(state),
    userDataForm: getUpdateUserForm(state),
});

const mapDispatchToProps = {
    getUserData: fetchUserData,
    updateUserDataForm,
    updateUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
