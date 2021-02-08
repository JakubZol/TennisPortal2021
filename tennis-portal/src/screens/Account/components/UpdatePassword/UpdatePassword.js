import React, { useState } from 'react';
import TextInput from "../../../../shared/components/TextInput/TextInput";
import Button from "../../../../shared/components/Button/Button";
import Panel from "../../../../shared/components/Panel/Panel";
import { func, shape, string } from "prop-types";

import './update-password.scss';


const UpdatePassword = ({ passwordForm, updatePasswordForm, updatePassword }) => {

    const [ isFormValid , setIsFormValid ] = useState({
        password: false,
        newPassword1: false,
        newPassword2: false,
    });

    const onChange = (value, field, isFieldValid) => {
        setIsFormValid({ ...isFormValid, [field]: isFieldValid });

        updatePasswordForm({ [field]: value });
    };

    const onSubmit = () => {
        updatePassword(passwordForm);
    };

    const { password, newPassword1, newPassword2 } = passwordForm;
    const submitButtonDisabled = !(Object.values(isFormValid).reduce((accumulator, value) => accumulator && value, true));

    return (
        <div className="update-password">
            <Panel className="update-password__panel">
                <h2>Zmień hasło</h2>
                <TextInput className="update-password__input" value={password} name="password" label="Obecne hasło" onChange={onChange} password required/>
                <TextInput className="update-password__input" value={newPassword1} name="newPassword1" label="Nowe hasło" onChange={onChange} password required/>
                <TextInput className="update-password__input" value={newPassword2} name="newPassword2" label="Powtórz nowe hasło" onChange={onChange} password required/>
                <Button className="update-password__submit-button" onClick={onSubmit} label="Zmień hasło" disabled={submitButtonDisabled}/>
            </Panel>
        </div>
    )
};

UpdatePassword.propTypes = {
    passwordForm: shape({
        password: string,
        newPassword1: string,
        newPassword2: string,
    }).isRequired,
    updatePasswordForm: func.isRequired,
    updatePassword: func.isRequired,
};


export default UpdatePassword;
