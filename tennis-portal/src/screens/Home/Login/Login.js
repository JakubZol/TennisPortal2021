import React from 'react';
import { string, func } from 'prop-types';


const Login = ({ loginForm, login, updateLoginForm }) => {

    const onChange = (value, field) => {
        // TODO: ADD FIELD VALIDATION
        updateLoginForm({ [field]: value });
    };

    const onSubmit = () => {
        login(loginForm);
    };

    return (
        <div>
            <input value={loginForm.email ?? ''} onChange={({ target }) => onChange(target.value, 'email')} placeholder='email' type="email" />
            <input value={loginForm.password ?? ''} onChange={({ target }) => onChange(target.value, 'password')} placeholder='password' type='password' />
            <button onClick={onSubmit}>Zaloguj się</button>
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
