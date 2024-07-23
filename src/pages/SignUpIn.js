import React, { useState } from 'react';
import '../styles/login.css';
import Login from '../components/Login';
import Register from '../components/Register';
import Toggle from '../components/Toggle';

function SignUpIn() {
    const [isActive, setIsActive] = useState(false);

    const handleSignInClick = () => {
        setIsActive(false);
    };

    const handleSignUpClick = () => {
        setIsActive(true);
    };

    return (
        <div className='a-body'>
        <div className={`a-container ${isActive ? 'a-active' : ''}`} id="a-container">
            <Register />
            <Login />
            <Toggle onSignInClick={handleSignInClick} onSignUpClick={handleSignUpClick} />
        </div>
        </div>
    );
}

export default SignUpIn;
