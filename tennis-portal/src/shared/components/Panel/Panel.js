import React from 'react'

import './panel.scss';


const Panel = ({ children, className }) => (
    <div className={`panel ${className}`}>
        {children}
    </div>
);

export default Panel;
