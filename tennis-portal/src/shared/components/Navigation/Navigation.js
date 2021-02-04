import React from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { AUTHENTICATED_NAVIGATION, PUBLIC_NAVIGATION } from "../../constants/navigation";
import { getAuthenticationState } from "../../../selectors";
import { logout } from '../../../actions/logout';
import { bool, func } from 'prop-types';
import { deleteAccount, updateDeleteAccountForm } from '../../../actions/deleteAccount';
import { getDeleteConfirmationForm } from "../../../selectors/selectors";


const Navigation = ({ isAuthenticated, logout, updateDeleteAccountForm, deleteConfirmationForm, deleteAccount }) => {

    const navigationBar = isAuthenticated ? AUTHENTICATED_NAVIGATION : PUBLIC_NAVIGATION;
    const { pathname: currentPath } = useLocation();

    const onChange = (value, field) => {
        // TODO: ADD FIELD VALIDATION
        updateDeleteAccountForm({ [field]: value });
    };

    const onDelete = () => {
        console.log(deleteConfirmationForm);
        deleteAccount(deleteConfirmationForm)
    };

    return (
        <nav>
            {Object.keys(navigationBar).map(link => (
                <Link to={`/${link.toLowerCase()}`}>{navigationBar[link]}</Link>
            ))}
            {currentPath === '/account' && <>
                <input onChange={({ target }) => onChange(target.value, 'password1')} type="password" placeholder="Hasło" />
                <input onChange={({ target }) => onChange(target.value, 'password2')} type="password" placeholder="Potwierdź hasło" />
                <button onClick={onDelete}>Usuń konto</button>
            </>}
            {isAuthenticated && <button onClick={logout}>Wyloguj się</button>}
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
    deleteConfirmationForm: getDeleteConfirmationForm(state),
});

const mapDispatchToProps = {
    logout,
    updateDeleteAccountForm,
    deleteAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
