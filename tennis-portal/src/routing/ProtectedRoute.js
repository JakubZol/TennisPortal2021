import React from 'react'
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { bool, elementType, string } from 'prop-types';
import { getAuthenticationState } from "../selectors";

const ProtectedRoute = ({ component: Component, isAuthenticated, path, authenticationRequired }) => {

    const routeRender = props => (
        authenticationRequired === isAuthenticated ? (
            <Component {...props} />
        ) : (
            <Redirect to={{
                pathname: authenticationRequired ? '/login' : '/account',
                state: props.location,
            }} />
        )
    );

    return <Route exact path={path} component={routeRender} />
};


ProtectedRoute.propTypes = {
    component: elementType.isRequired,
    isAuthenticated: bool,
    authenticationRequired: bool,
    path: string.isRequired,
};

ProtectedRoute.defaultProps = {
    isAuthenticated: false,
    authenticationRequired: false,
};

const mapStateToProps = state => ({
    isAuthenticated: getAuthenticationState(state),
});

export default connect(mapStateToProps)(ProtectedRoute);
