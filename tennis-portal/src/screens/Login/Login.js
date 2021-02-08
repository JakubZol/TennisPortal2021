import React, { useState } from 'react';
import { string, func } from 'prop-types';
import TextInput from "../../shared/components/TextInput";
import { emailValidator } from "../../shared/validators";
import Panel from '../../shared/components/Panel'
import Button from '../../shared/components/Button';

import './login-screen.scss';


const Login = ({ loginForm, login, updateLoginForm }) => {

    const [ isFormValid , setIsFormValid ] = useState({ email: false, password: false });

    const onChange = (value, field, isFieldValid) => {
        updateLoginForm({ [field]: value });

        setIsFormValid({ ...isFormValid, [field]: isFieldValid });
    };

    const onSubmit = () => {
        login(loginForm);
    };

    const validators = {
        email: [emailValidator],
    };

    const submitButtonDisabled = !(Object.values(isFormValid).reduce((accumulator, value) => accumulator && value, true));

    return (
        <div className="login-screen">
            <Panel className="login-screen__panel">
                <h2>Panel logowania</h2>
                <TextInput className="login-screen__input" label="E-mail użytkownika" name="email" onChange={onChange} value={loginForm.email} validators={validators.email} required/>
                <TextInput className="login-screen__input" label="Hasło użytkownika" name="password" onChange={onChange} value={loginForm.password} required password/>
                <Button className="login-screen__submit-button" onClick={onSubmit} disabled={submitButtonDisabled} label="Zaloguj"/>
            </Panel>
        </div>
    )
};

Login.propTypes = {
    login: func.isRequired,
    updateLoginForm: func.isRequired,
    loginForm: {
        email: string,
        password: string,
    }
};

export default Login;
