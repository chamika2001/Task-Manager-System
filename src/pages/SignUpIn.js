import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/login.css';
import Login from '../components/Login';
import Register from '../components/Register';
import Toggle from '../components/Toggle';

const SignUpIn = () => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const handleSignInSuccess = () => {
    console.log("Sign-in successful"); // Debugging
    toast.success('Login is successful');
    setTimeout(() => {
      navigate('/dashboard'); // Use navigate to redirect
    }, 3000); // Navigate after 3 seconds
  };

  const handleSignUpSuccess = () => {
    console.log("Sign-up successful"); // Debugging
    toast.success('Account Created Successfully');
    setTimeout(() => {
      navigate('/'); // Redirect to the home page after sign-up success
    }, 3000); // Navigate after 3 seconds
  };

  const handleError = (message) => {
    console.log("Error occurred:", message); // Debugging
    toast.error(message);
  };

  return (
    <div className="a-body">
      <div className={`a-container ${isActive ? 'a-active' : ''}`} id="a-container">
        <Register onSignUpSuccess={handleSignUpSuccess} onError={handleError} />
        <Login onSignInSuccess={handleSignInSuccess} onError={handleError} />
        <Toggle onSignInClick={() => setIsActive(false)} onSignUpClick={() => setIsActive(true)} />
      </div>
    </div>
  );
};

export default SignUpIn;
