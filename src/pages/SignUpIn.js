import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import Login from '../components/Login';
import Register from '../components/Register';
import Toggle from '../components/Toggle';
import Modal from '../components/Modal'; // Ensure correct path

const SignUpIn = () => {
  const [isActive, setIsActive] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignInSuccess = () => {
    console.log("Sign-in successful"); // Debugging
    setModalMessage('Login is successful');
    setIsModalOpen(true);
    setTimeout(() => {
      navigate('/dashboard'); // Use navigate to redirect
    }, 3000); // Navigate after 3 seconds
  };

  const handleSignUpSuccess = () => {
    console.log("Sign-up successful"); // Debugging
    setModalMessage('Account Created Successfully');
    setIsModalOpen(true);
    setTimeout(() => {
      navigate('/'); // Redirect to the home page after sign-up success
    }, 3000); // Navigate after 3 seconds
  };

  const handleError = (message) => {
    console.log("Error occurred:", message); // Debugging
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="a-body">
      <div className={`a-container ${isActive ? 'a-active' : ''}`} id="a-container">
        <Register onSignUpSuccess={handleSignUpSuccess} onError={handleError} />
        <Login onSignInSuccess={handleSignInSuccess} onError={handleError} />
        <Toggle onSignInClick={() => setIsActive(false)} onSignUpClick={() => setIsActive(true)} />
      </div>
      {isModalOpen && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  );
};

export default SignUpIn;
