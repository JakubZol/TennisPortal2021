import React from 'react';
import { bool, string, func } from 'prop-types';

import './button.scss';


const Button = ({ label, disabled, onClick, className }) => {

    return (
        <button className={`button ${className}`} onClick={onClick} disabled={disabled}>
            {label}
        </button>
    );
};

Button.propTypes = {
    label: string.isRequired,
    disabled: bool,
    onClick: func,
    className: string,
};

Button.defaultProps = {
    disabled: false,
    className: '',
};

export default Button;
