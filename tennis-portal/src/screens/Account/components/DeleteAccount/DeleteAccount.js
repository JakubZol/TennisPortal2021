import React, { useState } from 'react'
import Panel from "../../../../shared/components/Panel/Panel";
import TextInput from "../../../../shared/components/TextInput/TextInput";
import Button from "../../../../shared/components/Button/Button";
import { func, shape, string } from "prop-types";

import './delete-account.scss';


const DeleteAccount = ({ deleteConfirmationForm, updateDeleteAccountForm, deleteAccount }) => {

    const [ isFormValid , setIsFormValid ] = useState({
        password1: false,
        password2: false,
    });

    const onChange = (value, field, isFieldValid) => {
        setIsFormValid({ ...isFormValid, [field]: isFieldValid });

        updateDeleteAccountForm({ [field]: value });
    };

    const onSubmit = () => {
        deleteAccount(deleteConfirmationForm);
    };

    const { password1, password2 } = deleteConfirmationForm;
    const submitButtonDisabled = !(Object.values(isFormValid).reduce((accumulator, value) => accumulator && value, true));

    return (
        <div className="delete-account">
            <Panel className="delete-account__panel">
                <h2>Usuń konto</h2>
                <div className="delete-account__warning">Pamiętaj że operacja jest nieodwracalna! Wpisz hasło aby potwierdzić.</div>
                <TextInput className="delete-account__input" value={password1} name="password1" label="Hasło" onChange={onChange} password required/>
                <TextInput className="delete-account__input" value={password2} name="password2" label="Potwierdź hasło" onChange={onChange} password required/>
                <Button className="delete-account__submit-button warning" onClick={onSubmit} label="Usuń konto" disabled={submitButtonDisabled}/>
            </Panel>
        </div>
    )
};

DeleteAccount.propTypes = {
    updateDeleteAccountForm: func.isRequired,
    deleteAccount: func.isRequired,
    deleteConfirmationForm: shape({
        password1: string,
        password2: string,
    }).isRequired,
};

export default DeleteAccount;
