import React, { useState, useMemo } from 'react';

import './navigation-tabs.scss';


const NavigationTabs = ({ tabs }) => {

    const [ activeTab, setActiveTab ] = useState(0);

    const navigation = useMemo(() => tabs.map(({ link }) => link), [tabs]);
    const components = useMemo(() => tabs.map(({ component, props }) => ({ component, props})), [tabs]);

    const { component: Component, props } = components[activeTab];

    return (
        <div className="navigation-tabs">
            <div className="navigation-tabs__menu">
                {navigation.map((link, index) =>
                    <div key={`navigation-tab-link-${index}`} className={`navigation-tabs__link ${activeTab === index ? 'active' : ''}`} onClick={() => setActiveTab(index)}>{link}</div>
                )}
            </div>
            <div className="navigation-tabs__content">
                <Component {...props}/>
            </div>
        </div>
    )
};


export default NavigationTabs;
