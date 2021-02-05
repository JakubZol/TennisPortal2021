import Account from './Account';
import { connect } from 'react-redux';
import { getUpdateUserForm, getUser, getUpdatePasswordForm } from "../../selectors";
import { fetchUserData } from "../../actions/fetchUserData";
import { updateUserDataForm, updateUserData } from "../../actions/updateUserData";
import { updatePasswordForm, updatePassword } from "../../actions/updatePassword";

const mapStateToProps = state => ({
    user: getUser(state),
    userDataForm: getUpdateUserForm(state),
    passwordForm: getUpdatePasswordForm(state),
});

const mapDispatchToProps = {
    getUserData: fetchUserData,
    updateUserDataForm,
    updateUserData,
    updatePasswordForm,
    updatePassword
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
