import React, { PureComponent } from 'react';
import { func, string, number, shape } from 'prop-types';


class Account extends PureComponent {

    componentDidMount() {
        const { user, getUserData } = this.props;

        if(user && Object.keys(user).length === 0){
            console.log('user');
            getUserData();
        }
    }

    render() {
        const {
            user: { email, username, firstName, lastName, gender, height, weight, birthdate, ntrp, plays, backhand }
        } = this.props;

        return (
            <ul>
                <li>username: {username}</li>
                <li>email: {email}</li>
                <li>first name: {firstName}</li>
                <li>last name: {lastName}</li>
                <li>gender: {gender}</li>
                <li>height: {height}</li>
                <li>weight: {weight}</li>
                <li>birthdate: {birthdate}</li>
                <li>ntrp: {ntrp}</li>
                <li>plays: {plays}</li>
                <li>backhand: {backhand}</li>
            </ul>
        )
    }
}

Account.propTypes = {
    getUserData: func.isRequired,
    user: shape({
        email: string.isRequired,
        username: string.isRequired,
        firstName: string.isRequired,
        lastName: string.isRequired,
        gender: string.isRequired,
        height: number.isRequired,
        weight: number.isRequired,
        birthdate: string.isRequired,
        ntrp: number.isRequired,
        plays: string.isRequired,
        backhand: number.isRequired
    }).isRequired,
};


export default Account;
