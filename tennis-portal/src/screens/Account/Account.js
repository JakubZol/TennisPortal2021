import React from 'react';
import { func, string, number, shape, bool } from 'prop-types';
import AccountDetails from './components/AccountDetails';
import UpdateAccountDetails from './components/UpdateAccountDetails';
import UpdatePassword from './components/UpdatePassword';
import DeleteAccount from './components/DeleteAccount';
import NavigationTabs from '../../shared/components/NavigationTabs';


const Account = ({ user, userDataForm, updateUserDataForm, updateUserData, passwordForm, updatePasswordForm, updatePassword, updateDeleteAccountForm, deleteAccount, deleteConfirmationForm }) => (
    <div className="account-screen">
        <NavigationTabs tabs={[
            { link: 'Dane użytkownika', component: AccountDetails, props: { user } },
            { link: 'Modyfikacja danych', component: UpdateAccountDetails, props: { user, updateUserDataForm, userDataForm, updateUserData } },
            { link: 'Zmiana hasła', component: UpdatePassword, props: { passwordForm, updatePasswordForm, updatePassword } },
            { link: 'Usuń konto', component: DeleteAccount, props: { deleteConfirmationForm, updateDeleteAccountForm, deleteAccount } },
        ]} />
    </div>
);


Account.propTypes = {
    user: shape({
        email: string.isRequired,
        username: string.isRequired,
        firstName: string.isRequired,
        lastName: string.isRequired,
        gender: string.isRequired,
        height: number.isRequired,
        weight: number.isRequired,
        birthdate: string.isRequired,
        ntrp: number.isRequired,
        plays: string.isRequired,
        backhand: number.isRequired
    }).isRequired,
    userDataForm: shape({
        email: string,
        username: string,
        firstName: string,
        lastName: string,
        gender: string,
        height: number,
        weight: number,
        birthdate: string,
        ntrp: number,
        plays: string,
        backhand:number,
    }).isRequired,
    updateUserData: func.isRequired,
    updateUserDataForm: func.isRequired,
    passwordForm: shape({
        password: string,
        newPassword1: string,
        newPassword2: string,
    }),
    updatePasswordForm: func.isRequired,
    updatePassword: func.isRequired,
    updateDeleteAccountForm: func.isRequired,
    deleteAccount: func.isRequired,
    deleteConfirmationForm: shape({
        password1: string,
        password2: string,
    }).isRequired,
};

export default Account;
