import React from 'react';
import { func, shape, string, number, oneOf } from 'prop-types';


const Register = ({ registerForm, register, updateRegisterForm }) => {

    const onChange = (value, field) => {
        // TODO: ADD FIELD VALIDATION
        updateRegisterForm({ [field]: value });
    };

    const onSubmit = () => {
        register(registerForm);
    };

    const { email, username, backhand, plays, birthdate, firstName, lastName, ntrp, height, weight, gender, password1, password2 } = registerForm;

    return (
        <div>
            <input onChange={({ target }) => onChange(target.value, 'email')} placeholder="Email" type="email" value={email ?? ''} />
            <input onChange={({ target }) => onChange(target.value, 'username')} placeholder="Username" value={username ?? ''} />
            <input onChange={({ target }) => onChange(target.value, 'firstName')} placeholder="First name" value={firstName ?? ''} />
            <input onChange={({ target }) => onChange(target.value, 'lastName')} placeholder="Last name" value={lastName ?? ''} />
            <input onChange={({ target }) => onChange(target.value, 'gender')} placeholder="Gender" value={gender ?? ''} />
            <input onChange={({ target }) => onChange(target.value, 'birthdate')} placeholder="Birth date" value={birthdate ?? ''} />
            <input onChange={({ target }) => onChange(target.value, 'weight')} placeholder="Weight" type="number" value={weight ?? ''} />
            <input onChange={({ target }) => onChange(target.value, 'height')} placeholder="Height" type="number" value={height ?? ''} />
            <input onChange={({ target }) => onChange(target.value, 'ntrp')} placeholder="Ntrp" value={ntrp ?? ''} />
            <input onChange={({ target }) => onChange(target.value, 'plays')} placeholder="Plays" value={plays ?? ''} />
            <input onChange={({ target }) => onChange(target.value, 'backhand')} placeholder="Backhand" type="number" value={backhand ?? ''} />
            <input onChange={({ target }) => onChange(target.value, 'password1')} placeholder="Password" type="password" value={password1 ?? ''} />
            <input onChange={({ target }) => onChange(target.value, 'password2')} placeholder="Repeat password" type="password" value={password2 ?? ''} />
            <button onClick={onSubmit}>Zarejestruj się</button>
        </div>
    )
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
    })
};

export default Register;
