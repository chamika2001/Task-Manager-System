import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'; 

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const navigate = useNavigate();

  const handlePasswordReset = async () => {
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      setResetMessage('Password reset email sent successfully.');
      setTimeout(() => {
        navigate('/');
      }, 3000); 
    } catch (error) {
      setResetMessage(`Error sending password reset email: ${error.message}`);
    }
  };

  return (
    <div className="a-form-container a-forgot-password">
      <h2>Reset Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      
      <button onClick={handlePasswordReset}>Send Reset Email</button>
      {resetMessage && <p>{resetMessage}</p>}
      
    </div>
  );
};

export default ForgotPassword;
