import React, {useState} from 'react';
import Panel from "../../../../shared/components/Panel";
import TextInput from "../../../../shared/components/TextInput";
import {emailValidator} from "../../../../shared/validators";
import Select from "../../../../shared/components/Select";
import {BACKHAND, BETTER_HAND, GENDER, NTRP} from "../../../../shared/constants/selectFields";
import { GENDER_LABELS, BACKHAND_LABELS, BETTER_HAND_LABELS } from "../../../../shared/constants/dataMappings";
import Button from "../../../../shared/components/Button";
import { func, number, shape, string } from "prop-types";

import './update-account-details.scss';


const UpdateAccountDetails = ({ user, userDataForm, updateUserDataForm, updateUserData }) => {

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
    });

    const onChange = (value, field, isFieldValid) => {
        setIsFormValid({ ...isFormValid, [field]: isFieldValid });

        updateUserDataForm({ [field]: value });
    };

    const onSubmit = () => {
        updateUserData(userDataForm);
    };

    const { email, username, birthdate, firstName, lastName, height, weight } = userDataForm;
    const submitButtonDisabled = !(Object.values(isFormValid).reduce((accumulator, value) => accumulator || value, false));

    return (
        <div className="update-account-details-screen">
            <Panel className="update-account-details-screen__panel">
                <h2>Zmień wybrane dane</h2>
                <div className="update-account-details-screen__form-container">
                    <div className="update-account-details-screen__form-tab">
                        <TextInput className="update-account-details-screen__input" label={`E-mail (${user.email})`} name="email" value={email} onChange={onChange} validators={[ emailValidator ]} />
                        <TextInput className="update-account-details-screen__input" label={`Login (${user.username})`} name="username" value={username} onChange={onChange} />
                        <TextInput className="update-account-details-screen__input" label={`Imię (${user.firstName})`} name="firstName" value={firstName} onChange={onChange} />
                        <TextInput className="update-account-details-screen__input" label={`Nazwisko (${user.lastName})`} name="lastName" value={lastName} onChange={onChange} />
                        <Select className="update-account-details-screen__input" label={`Płeć (${GENDER_LABELS[user.gender]})`} onChange={onChange} suggestions={GENDER} name="gender" />
                        <TextInput className="update-account-details-screen__input" label={`Data urodzenia (${user.birthdate})`} name="birthdate" value={birthdate} onChange={onChange} date />
                    </div>
                    <div className="update-account-details-screen__form-tab">
                        <TextInput className="update-account-details-screen__input" label={`Waga (${user.weight} kg)`} name="weight" value={weight} onChange={onChange} />
                        <TextInput className="update-account-details-screen__input" label={`Wzrost (${user.height} cm)`} name="height" value={height} onChange={onChange} />
                        <Select className="update-account-details-screen__input" label={`Poziom NTRP (${user.ntrp})`} onChange={onChange} suggestions={NTRP} name="ntrp" />
                        <Select className="update-account-details-screen__input" label={`Preferowana ręka (${BETTER_HAND_LABELS[user.plays]})`} onChange={onChange} suggestions={BETTER_HAND} name="plays" />
                        <Select className="update-account-details-screen__input" label={`Backhand (${BACKHAND_LABELS[user.backhand]})`} onChange={onChange} suggestions={BACKHAND} name="backhand" />
                    </div>
                </div>
                <Button className="update-account-details-screen__submit-button" label="Modyfikuj wybrane dane" onClick={onSubmit} disabled={submitButtonDisabled}/>
            </Panel>
        </div>
    );
};


UpdateAccountDetails.propTypes = {
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
};

export default UpdateAccountDetails
