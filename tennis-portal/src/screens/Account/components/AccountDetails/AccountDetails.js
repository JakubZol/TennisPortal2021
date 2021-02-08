import React from 'react'
import Panel from '../../../../shared/components/Panel';
import { GENDER_LABELS, BACKHAND_LABELS, BETTER_HAND_LABELS } from "../../../../shared/constants/dataMappings";
import { shape, string, number } from 'prop-types';

import './account-details.scss';


const AccountDetails = ({ user }) => (
    <div className="account-details">
        <Panel className="account-details__panel">
            <h2>Dane użytkownika</h2>
            <div className="account-details__detail" >Login: {user.username}</div>
            <div className="account-details__detail" >Imię: {user.firstName}</div>
            <div className="account-details__detail" >Nazwisko: {user.lastName}</div>
            <div className="account-details__detail" >E-mail: {user.email}</div>
            <div className="account-details__detail" >Płeć: {GENDER_LABELS[user.gender]}</div>
            <div className="account-details__detail" >Poziom NTRP: {user.ntrp}</div>
            <div className="account-details__detail" >Data urodzenia: {user.birthdate}</div>
            <div className="account-details__detail" >Wzrost: {user.height} cm</div>
            <div className="account-details__detail" >Waga: {user.weight} kg</div>
            <div className="account-details__detail" >Preferowana ręka: {BETTER_HAND_LABELS[user.plays]}</div>
            <div className="account-details__detail" >Backhand: {BACKHAND_LABELS[user.backhand]}</div>
        </Panel>
    </div>
);

AccountDetails.propTypes = {
    user: shape({
        id: number.isRequired,
        username: string.isRequired,
        email: string.isRequired,
        firstName: string.isRequired,
        lastName: string.isRequired,
        gender: string.isRequired,
        ntrp: number.isRequired,
        birthdate: string.isRequired,
        weight: number.isRequired,
        height: number.isRequired,
        plays: string.isRequired,
        backhand: number.isRequired,
    }).isRequired,
};

export default AccountDetails;
