import React, { PureComponent } from 'react';
import { func, string, number, shape, bool } from 'prop-types';


class Account extends PureComponent {

    updateFieldState = field => {
        const { userDataForm, updateUserDataForm } = this.props;
        const writable = !userDataForm[field].writable;

        updateUserDataForm(field, { writable, value: writable ? userDataForm[field].value : '' });
    };

    updateFieldValue = (field, value) => {
        const { userDataForm, updateUserDataForm } = this.props;
        updateUserDataForm(field, { writable: userDataForm[field].writable, value });
    };

    updatePasswordFieldValue = (field, value) => {
        this.props.updatePasswordForm({ [field]: value });
    };

    onPasswordFormSubmit = () => {
        this.props.updatePassword(this.props.passwordForm);
    };

    updateUserData = () => {
        const { userDataForm, updateUserData } = this.props;

        const dataToChange = Object.keys(userDataForm).reduce((form, field) => {

            const value = userDataForm[field].value;
            return value ? { ...form, [field]: userDataForm[field].value } : form;
            }, {});

        updateUserData(dataToChange);
    };

    render() {
        const {
            props: { user: { email, username, firstName, lastName, gender, height, weight, birthdate, ntrp, plays, backhand }, userDataForm,
                 passwordForm: { password, newPassword1, newPassword2 } },
            updateFieldState,
            updateFieldValue,
            updateUserData,
            updatePasswordFieldValue,
            onPasswordFormSubmit,
        } = this;

        const saveButtonDisabled = Object.keys(userDataForm).filter(field => userDataForm[field].value && userDataForm[field].value !== this.props.user[field]).length === 0;

        return (
            <>
                <ul>
                    <li>
                        {userDataForm.username.writable ?
                            (<input value={userDataForm.username.value} placeholder={username} type="text" onChange={({ target }) => updateFieldValue('username', target.value)}/>) :
                            (<>username: {username}</>)
                        }
                        <button onClick={() => updateFieldState('username')}>{userDataForm.username.writable ? 'Zamknij' : 'Edytuj'}</button>
                    </li>
                    <li>
                        {userDataForm.email.writable ?
                            (<input value={userDataForm.username.email} placeholder={email} type="email" onChange={({ target }) => updateFieldValue('email', target.value)}/>) :
                            (<>email: {email}</>)
                        }
                        <button onClick={() => updateFieldState('email')}>{userDataForm.email.writable ? 'Zamknij' : 'Edytuj'}</button>
                    </li>
                    <li>
                        {userDataForm.firstName.writable ?
                            (<input value={userDataForm.firstName.value} placeholder={firstName} type="text" onChange={({ target }) => updateFieldValue('firstName', target.value)}/>) :
                            (<>firstName: {firstName}</>)
                        }
                        <button onClick={() => updateFieldState('firstName')}>{userDataForm.firstName.writable ? 'Zamknij' : 'Edytuj'}</button>
                    </li>
                    <li>
                        {userDataForm.lastName.writable ?
                            (<input value={userDataForm.lastName.value} placeholder={lastName} type="text" onChange={({ target }) => updateFieldValue('lastName', target.value)}/>) :
                            (<>lastName: {lastName}</>)
                        }
                        <button onClick={() => updateFieldState('lastName')}>{userDataForm.lastName.writable ? 'Zamknij' : 'Edytuj'}</button>
                    </li>
                    <li>
                        {userDataForm.gender.writable ?
                            (<select placeholder="gender" onChange={({ target }) => updateFieldValue('gender', target.value)} value={userDataForm.gender.value}>
                                <option>M</option>
                                <option>W</option>
                            </select>) :
                            (<>gender: {gender}</>)
                        }
                        <button onClick={() => updateFieldState('gender')}>{userDataForm.gender.writable ? 'Zamknij' : 'Edytuj'}</button>
                    </li>
                    <li>
                        {userDataForm.height.writable ?
                            (<input value={userDataForm.height.value} placeholder={height} type="number" onChange={({ target }) => updateFieldValue('height', target.value)}/>) :
                            (<>height: {height}</>)
                        }
                        <button onClick={() => updateFieldState('height')}>{userDataForm.height.writable ? 'Zamknij' : 'Edytuj'}</button>
                    </li>
                    <li>
                        {userDataForm.weight.writable ?
                            (<input value={userDataForm.weight.value} placeholder={weight} type="number" onChange={({ target }) => updateFieldValue('weight', target.value)}/>) :
                            (<>weight: {weight}</>)
                        }
                        <button onClick={() => updateFieldState('weight')}>{userDataForm.weight.writable ? 'Zamknij' : 'Edytuj'}</button>
                    </li>
                    <li>
                        {userDataForm.birthdate.writable ?
                            (<input value={userDataForm.birthdate.value} placeholder={birthdate} type="date" onChange={({ target }) => updateFieldValue('birthdate', target.value)} />) :
                            (<>birthdate: {birthdate}</>)
                        }
                        <button onClick={() => updateFieldState('birthdate')}>{userDataForm.birthdate.writable ? 'Zamknij' : 'Edytuj'}</button>
                    </li>
                    <li>
                        {userDataForm.ntrp.writable ?
                            (<input value={userDataForm.ntrp.value} placeholder={ntrp} type="number" min="1" max="7" step="0.5" onChange={({ target }) => updateFieldValue('ntrp', target.value)}/>) :
                            (<>ntrp: {ntrp}</>)
                        }
                        <button onClick={() => updateFieldState('ntrp')}>{userDataForm.ntrp.writable ? 'Zamknij' : 'Edytuj'}</button>
                    </li>
                    <li>
                        {userDataForm.plays.writable ?
                            (<select placeholder={plays} onChange={({ target }) => updateFieldValue('plays', target.value)} value={userDataForm.plays.value}>
                                <option>R</option>
                                <option>L</option>
                            </select>) :
                            (<>plays: {plays}</>)
                        }
                        <button onClick={() => updateFieldState('plays')}>{userDataForm.plays.writable ? 'Zamknij' : 'Edytuj'}</button>
                    </li>
                    <li>
                        {userDataForm.backhand.writable ?
                            (<input value={userDataForm.backhand.value} placeholder={backhand} type="number" min="1" max="2" step="1" onChange={({ target }) => updateFieldValue('backhand', target.value)}/>) :
                            (<>backhand: {backhand}</>)
                        }
                        <button onClick={() => updateFieldState('backhand')}>{userDataForm.backhand.writable ? 'Zamknij' : 'Edytuj'}</button>
                    </li>
                    <button disabled={saveButtonDisabled} onClick={updateUserData}>Zapisz zmiany</button>
                </ul>
                <div>
                    <input value={password} type="password" placeholder="Obecne hasło" onChange={({ target }) => updatePasswordFieldValue('password', target.value)} />
                    <input value={newPassword1} type="password" placeholder="Nowe hasło" onChange={({ target }) => updatePasswordFieldValue('newPassword1', target.value)} />
                    <input value={newPassword2} type="password" placeholder="Powtórz nowe hasło" onChange={({ target }) => updatePasswordFieldValue('newPassword2', target.value)} />
                    <button onClick={onPasswordFormSubmit}>Zmień hasło</button>
                </div>
            </>
        )
    }
}

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
        email: shape({ writable: bool.isRequired, value: string }).isRequired,
        username: shape({ writable: bool.isRequired, value: string }).isRequired,
        firstName: shape({ writable: bool.isRequired, value: string }).isRequired,
        lastName: shape({ writable: bool.isRequired, value: string }).isRequired,
        gender: shape({ writable: bool.isRequired, value: string }).isRequired,
        height: shape({ writable: bool.isRequired, value: string }).isRequired,
        weight: shape({ writable: bool.isRequired, value: string }).isRequired,
        birthdate: shape({ writable: bool.isRequired, value: string }).isRequired,
        ntrp: shape({ writable: bool.isRequired, value: string }).isRequired,
        plays: shape({ writable: bool.isRequired, value: string }).isRequired,
        backhand: shape({ writable: bool.isRequired, value: string }).isRequired,
    }).isRequired,
    updateUserData: func.isRequired,
    updateUserDataForm: func.isRequired,
};


export default Account;
