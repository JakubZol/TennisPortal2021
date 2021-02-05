import Account from './Account';
import { connect } from 'react-redux';
import { getUpdateUserForm, getUpdatePasswordForm, getUser } from "../../selectors";
import { updateUserDataForm, updateUserData } from "../../actions/updateUserData";
import { updatePasswordForm, updatePassword } from "../../actions/updatePassword";

const mapStateToProps = state => ({
    userDataForm: getUpdateUserForm(state),
    passwordForm: getUpdatePasswordForm(state),
    user: getUser(state),
});

const mapDispatchToProps = {
    updateUserDataForm,
    updateUserData,
    updatePasswordForm,
    updatePassword
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
