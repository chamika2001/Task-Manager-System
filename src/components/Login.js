// Login.js
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import '../styles/login.css';

const Login = ({ onSignInSuccess, onError }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Use useNavigate hook to navigate

  const handleSubmit = async (event) => {
    event.preventDefault();
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Store user ID in localStorage
      localStorage.setItem('loggedInUserId', user.uid);
      
      // Call the success callback
      onSignInSuccess();
    } catch (error) {
      let message = 'Unable to log in';
      if (error.code === 'auth/wrong-password') {
        message = 'Invalid Email or Password';
      } else if (error.code === 'auth/user-not-found') {
        message = 'Account does not Exist';
      }
      // Call the error callback with the error message
      onError(message);
    }
  };

  const handleForgotPasswordClick = (event) => {
    event.preventDefault();
    navigate('/forgot-password'); 
  };

  return (
    <div className="a-form-container a-sign-in">
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <div className="a-social-icons">
          <a href="#" className="a-icon"><i className="fa-brands fa-google-plus-g"></i></a>
          <a href="#" className="a-icon"><i className="fa-brands fa-facebook-f"></i></a>
          <a href="#" className="a-icon"><i className="fa-brands fa-github"></i></a>
          <a href="#" className="a-icon"><i className="fa-brands fa-linkedin-in"></i></a>
        </div>
        <span>or use your email and password</span>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <a href="#" onClick={handleForgotPasswordClick}>Forget Your Password?</a>
        <button>Sign In</button>
      </form>
    </div>
  );
};

export default Login;
