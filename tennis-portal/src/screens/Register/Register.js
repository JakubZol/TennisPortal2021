import React, { useState } from 'react';
import { func, shape, string, number, oneOf } from 'prop-types';
import Select from '../../shared/components/Select';
import TextInput from "../../shared/components/TextInput";
import { emailValidator } from "../../shared/validators";
import { NTRP, GENDER, BETTER_HAND, BACKHAND } from "../../shared/constants/selectFields";
import Panel from '../../shared/components/Panel'
import Button from '../../shared/components/Button';

import './register-screen.scss'


const Register = ({ registerForm, register, updateRegisterForm }) => {

    const [ isFormValid , setIsFormValid ] = useState({
        email: false,
        username: false,
        firstName: false,
        lastName: false,
        gender: false,
        birthdate: false,
        weight: false,
        height: false,
        ntrp: false,
        plays: false,
        backhand: false,
        password1: false,
        password2: false
    });

    const onChange = (value, field, isFieldValid) => {
        setIsFormValid({ ...isFormValid, [field]: isFieldValid });

        updateRegisterForm({ [field]: value });
    };

    const onSubmit = () => {
        register(registerForm);
    };

    const { email, username, birthdate, firstName, lastName, height, weight, password1, password2 } = registerForm;
    const submitButtonDisabled = !(Object.values(isFormValid).reduce((accumulator, value) => accumulator && value, true));

    return (
        <div className="register-screen">
            <Panel className="register-screen__panel">
                <h2>Panel rejestracji</h2>
                <div className="register-screen__form-container">
                    <div className="register-screen__form-tab">
                        <TextInput className="register-screen__input" label="E-mail" name="email" value={email} onChange={onChange} validators={[ emailValidator ]} required/>
                        <TextInput className="register-screen__input" label="Login" name="username" value={username} onChange={onChange} required/>
                        <TextInput className="register-screen__input" label="Imię" name="firstName" value={firstName} onChange={onChange} required/>
                        <TextInput className="register-screen__input" label="Nazwisko" name="lastName" value={lastName} onChange={onChange} required/>
                        <Select className="register-screen__input" label="Płeć" onChange={onChange} suggestions={GENDER} name="gender" required/>
                        <TextInput className="register-screen__input" label="Data urodzenia" name="birthdate" value={birthdate} onChange={onChange} date required/>
                        <TextInput className="register-screen__input" label="Waga (kg)" name="weight" value={weight} onChange={onChange} required/>
                    </div>
                    <div className="register-screen__form-tab">
                        <TextInput className="register-screen__input" label="Wzrost (cm)" name="height" value={height} onChange={onChange} required/>
                        <Select className="register-screen__input" label="Poziom NTRP" onChange={onChange} suggestions={NTRP} name="ntrp" required/>
                        <Select className="register-screen__input" label="Preferowana ręka" onChange={onChange} suggestions={BETTER_HAND} name="plays" required/>
                        <Select className="register-screen__input" label="Backhand" onChange={onChange} suggestions={BACKHAND} name="backhand" required/>
                        <TextInput className="register-screen__input" label="Hasło" name="password1" value={password1} onChange={onChange} password required/>
                        <TextInput className="register-screen__input" label="Powtórz hasło" name="password2" value={password2} onChange={onChange} password required/>
                    </div>
                </div>
                <Button className="register-screen__submit-button" label="Utwórz konto" onClick={onSubmit} disabled={submitButtonDisabled}/>
            </Panel>
        </div>
    );
};

Register.propTypes = {
    register: func.isRequired,
    updateRegisterForm: func.isRequired,
    registerForm: shape({
        email: string,
        username: string,
        backhand: oneOf([1, 2]),
        plays: oneOf(['L', 'R']),
        birthdate: string,
        firstName: string,
        lastName: string,
        ntrp: number,
        height: number,
        weight: number,
        gender: oneOf(['M', 'W']),
    }).isRequired,
};

export default Register;
