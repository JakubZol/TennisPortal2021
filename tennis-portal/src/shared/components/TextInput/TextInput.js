import React, { useState } from 'react';
import { string, func, bool, arrayOf, shape, number } from 'prop-types';

import './text-input.scss'

const TextInput = ({ label, name, onChange, value, validators, required, className, date, password, maxLength, minLength }) => {

    const [ validationErrorMessage, setValidationErrorMessage ] = useState(undefined);
    const [ valid, setValid ] = useState(true);

    const validateInput = value => {
        for (let { validator, errorMessage } of validators) {

            if(!validator(value) && value !== ''){
                setValid(false);
                setValidationErrorMessage(errorMessage);

                return false;
            }
        }

        if (value === '' &&  required){
            setValid(false);
            setValidationErrorMessage("To pole jest wymagane.");

            return false
        }

        setValidationErrorMessage(undefined);
        setValid(true);
        return true;
    };

    const inputOnChange = ({ target }) => {
        const inputValid = validateInput(target.value);

        onChange(target.value, name, inputValid);
    };

    const type = password ? 'password' : date ? 'date' : 'text';

    return (
        <div className={`text-input ${!valid ? 'invalid' : ''} ${className}`}>
            <div className="text-input__container">
                <div className={`text-input__label ${required ? 'required' : ''}`} >{label}</div>
                <input value={value} onChange={inputOnChange} className="text-input__input" type={type} maxLength={maxLength} minLength={minLength}/>
            </div>
            {!valid && <div className="text-input__validation-error">{validationErrorMessage}</div>}
        </div>
    )
};


TextInput.propTypes = {
    className: string,
    label: string.isRequired,
    name: string.isRequired,
    onChange: func,
    validators: arrayOf(shape({
        validator: func.isRequired,
        errorMessage: string.isRequired,
    })),
    required: bool,
    date: bool,
    value: string,
    password: bool,
    maxLength: number,
    minLength: number,
};

TextInput.defaultProps = {
    validators: [],
    required: false,
    className: '',
    date: false,
    value: '',
    password: false,
    maxLength: undefined,
    minLength: undefined,
};


export default TextInput
