import React from 'react';

const Toggle = ({ onSignInClick, onSignUpClick }) => {
    return (
        
        <div className="a-toggle-container">
            <div className="a-toggle">
                <div className="a-toggle-panel a-toggle-left">
                    <h1>Welcome Back!</h1>
                    <p className='msg'>Enter your personal details to Access TaskMe !</p>
                    <button className="a-hidden" onClick={onSignInClick} id="a-login">Sign In</button>
                </div>
                <div className="a-toggle-panel a-toggle-right">
                    <h1>Hello, Friend!</h1>
                    <p className='msg'>Register with your personal details to Access TaskMe !</p>
                    <button className="a-hidden" onClick={onSignUpClick} id="a-register">Sign Up</button>
                </div>
            </div>
        </div>
    );
};

export default Toggle;
