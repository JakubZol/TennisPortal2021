import React from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { AUTHENTICATED_NAVIGATION, PUBLIC_NAVIGATION } from "../../constants/navigation";
import { getAuthenticationState } from "../../../selectors";
import { logout } from '../../../actions/logout';
import { bool, func } from 'prop-types';

import './navigation.scss';


const Navigation = ({ isAuthenticated, logout }) => {

    const navigationBar = isAuthenticated ? AUTHENTICATED_NAVIGATION : PUBLIC_NAVIGATION;
    const { pathname: currentPath } = useLocation();

    return (
        <nav className="navigation">
            {Object.keys(navigationBar).map(link => {
                const path = `/${link.toLowerCase()}`;

                return (
                <Link className={`navigation__link ${path === currentPath ? 'active' : ''}`} to={path}
                      key={navigationBar[link]}>{navigationBar[link]}</Link>)
            })}
            <div className="navigation__additional-buttons">
                {isAuthenticated && <button className="navigation__link navigation__logout" onClick={logout}>Wyloguj się</button>}
            </div>
        </nav>
    )
};

Navigation.propTypes = {
    isAuthenticated: bool,
    logout: func.isRequired,
};

Navigation.defaultProps = {
    isAuthenticated: false,
};

const mapStateToProps = state => ({
    isAuthenticated: getAuthenticationState(state),
});

const mapDispatchToProps = {
    logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
