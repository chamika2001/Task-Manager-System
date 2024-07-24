import React, { useState } from 'react';
import '../styles/login.css';
import Login from '../components/Login';
import Register from '../components/Register';
import Toggle from '../components/Toggle';

const SignUpIn = () => {
  const [isActive, setIsActive] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSignInSuccess = () => {
    setModalMessage('Login is successful');
    setIsModalOpen(true);
    setTimeout(() => {
      window.location.href = '/pages/dashboard.html'; // Adjust the redirect URL
    }, 4000);
  };

  const handleSignUpSuccess = () => {
    setModalMessage('Account Created Successfully');
    setIsModalOpen(true);
    setTimeout(() => {
      window.location.href = 'index.html'; // Adjust the redirect URL
    }, 4000);
  };

  const handleError = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  return (
    <div className="a-body">
      <div className={`a-container ${isActive ? 'a-active' : ''}`} id="a-container">
        <Register onSignUpSuccess={handleSignUpSuccess} onError={handleError} />
        <Login onSignInSuccess={handleSignInSuccess} onError={handleError} />
        <Toggle onSignInClick={() => setIsActive(false)} onSignUpClick={() => setIsActive(true)} />
      </div>
      {isModalOpen && (
        <div className="modal" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
            <p>{modalMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUpIn;
