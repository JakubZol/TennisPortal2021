import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Account from '../screens/Account';


const Main = () => (
    <Switch>
        <Redirect exact from='/' to='/login'/>
        <ProtectedRoute path="/login" component={Login} />
        <ProtectedRoute path="/register" component={Register} />
        <ProtectedRoute path="/account" component={Account} authenticationRequired/>
        <ProtectedRoute path="/messages" component={() => <div>messages</div>} authenticationRequired/>
        <ProtectedRoute path="/matches" component={() => <div>matches</div>} authenticationRequired/>
        <ProtectedRoute path="/tournaments" component={() => <div>tournaments</div>} authenticationRequired/>
        <Route component={() => <div>no content</div>} />
    </Switch>
);


export default Main;