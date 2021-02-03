import React, { useState } from 'react'
import Login from './Login';
import Register from './Register';

const Home = () => {
    const [ currentTab, setCurrentTab ] = useState('LOGIN');

    return (
        <div>
            <button onClick={() => setCurrentTab('LOGIN')}>Login</button>
            <button onClick={() => setCurrentTab('REGISTER')}>Register</button>
            <hr />
            <div>
                {currentTab === 'LOGIN' && <Login />}
                {currentTab === 'REGISTER' && <Register />}
            </div>
        </div>
    )
};

export default Home;
