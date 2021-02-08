import React, { useState } from 'react';
import { string, bool, func, shape, arrayOf } from 'prop-types';
import caret from '../../resources/caret_down.png';

import './select.scss';


const Select = ({ className, name, label, required, onChange, suggestions }) => {

    const [ inputValue, setInputValue ] = useState('');
    const [ isExpanded, setIsExpanded ] = useState(false);

    const onValueChange = (value, label) => {
        setInputValue(label);
        setIsExpanded(false);
        const isValid = required ? value !=='' : true;
        onChange(value, name, isValid);
    };

    return (
        <div className={`select ${className}`}>
            <div className="select__container">
                <div className={`select__label ${required ? 'required' : ''}`} >{label}</div>
                <div className="select__value">
                    <div>{inputValue}</div>
                    <div className="select__expand-button" onClick={() => setIsExpanded(!isExpanded)}>
                        <img style={{ transform: `rotate(${isExpanded ? 180 : 0}deg)`}} src={caret} />
                    </div>
                </div>
            </div>
            {isExpanded && <div className="select__suggestions">{suggestions.map(({ value, label }, index) =>
                <div key={`suggestion-${index}`} className="select__suggestion" onClick={() => onValueChange(value, label)}>{label}</div>)}
            </div>}
        </div>
    )
};

Select.propTypes = {
    className: string,
    name: string.isRequired,
    label: string.isRequired,
    required: bool,
    onChange: func.isRequired,
    suggestions: arrayOf(shape({
        value: string.isRequired,
        label: string.isRequired,
    })).isRequired,
};

Select.defaultProps = {
    className: '',
    required: false,
};

export default Select;

