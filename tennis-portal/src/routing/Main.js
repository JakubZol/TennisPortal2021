import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Account from '../screens/Account';
import Messages from '../screens/Messages';
import Matches from '../screens/Matches';
import Tournaments from '../screens/Tournaments';


const Main = () => (
    <Switch>
        <Redirect exact from='/' to='/login'/>
        <ProtectedRoute path="/login" component={Login} />
        <ProtectedRoute path="/register" component={Register} />
        <ProtectedRoute path="/account" component={Account} authenticationRequired/>
        <ProtectedRoute path="/messages" component={Messages} authenticationRequired/>
        <ProtectedRoute path="/matches" component={Matches} authenticationRequired/>
        <ProtectedRoute path="/tournaments" component={Tournaments} authenticationRequired/>
        <Route component={() => <div>no content</div>} />
    </Switch>
);


export default Main;
