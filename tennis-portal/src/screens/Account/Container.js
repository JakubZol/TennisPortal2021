import Account from './Account';
import { connect } from 'react-redux';
import { getUpdateUserForm, getUpdatePasswordForm, getUser, getDeleteConfirmationForm } from "../../selectors";
import { updateUserDataForm, updateUserData } from "../../actions/updateUserData";
import { updatePasswordForm, updatePassword } from "../../actions/updatePassword";
import { deleteAccount, updateDeleteAccountForm } from "../../actions/deleteAccount";

const mapStateToProps = state => ({
    userDataForm: getUpdateUserForm(state),
    passwordForm: getUpdatePasswordForm(state),
    user: getUser(state),
    deleteConfirmationForm: getDeleteConfirmationForm(state),
});

const mapDispatchToProps = {
    updateUserDataForm,
    updateUserData,
    updatePasswordForm,
    updatePassword,
    updateDeleteAccountForm,
    deleteAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
