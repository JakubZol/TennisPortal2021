import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { bool, elementType, number, shape, string } from 'prop-types';
import { getAuthenticationState, getUser } from "../selectors";
import { fetchUserData } from "../actions/fetchUserData";

const ProtectedRoute = ({ component: Component, isAuthenticated, path, authenticationRequired, user, fetchUserData }) => {

    useEffect(() => {
        if(isAuthenticated && Object.keys(user).length === 0){
            fetchUserData();
        }
    }, [path]);

    const routeRender = props => (
        authenticationRequired === isAuthenticated ? (
            <Component {...props} />
        ) : (
            <Redirect to={{
                pathname: authenticationRequired ? '/login' : '/account',
                state: props.location,
            }}/>
        )
    );

    return <Route exact path={path} component={routeRender} />
};


ProtectedRoute.propTypes = {
    component: elementType.isRequired,
    isAuthenticated: bool,
    authenticationRequired: bool,
    path: string.isRequired,
    user: shape({
        email: string,
        username: string,
        firstName: string,
        lastName: string,
        gender: string,
        height: number,
        weight: number,
        birthdate: string,
        ntrp: number,
        plays: string,
        backhand: number,
    }),
};

ProtectedRoute.defaultProps = {
    isAuthenticated: false,
    authenticationRequired: false,
    user: {},
};

const mapStateToProps = state => ({
    isAuthenticated: getAuthenticationState(state),
    user: getUser(state),
});

const mapDispatchToProps = {
    fetchUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
