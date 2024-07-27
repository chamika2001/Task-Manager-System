import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from '../components/useAuth';
import { getDatabase, ref, set } from 'firebase/database';
import '../styles/login.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

const Register = ({ onSignUpSuccess, onError }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [universityName, setUniversityName] = useState('');
  const [degreeName, setDegreeName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const auth = getAuth();
    const db = getDatabase();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      localStorage.setItem('loggedInUserId', user.uid); // Store user ID in localStorage

      await set(ref(db, 'userDetails/' + user.uid), {
        email,
        name,
        universityName,
        degreeName,
      });

      onSignUpSuccess(); // Handle the redirection or further actions on success
    } catch (error) {
      let message = 'Unable to create user';
      if (error.code === 'auth/email-already-in-use') {
        message = 'Email Address Already Exists!!!';
      }
      onError(message);
    }
  };

  return (
    <div className="a-form-container a-sign-up">
      <form onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <div className="a-social-icons">
          <a href="#" className="a-icon"><i className="fab fa-google-plus-g"></i></a>
          <a href="#" className="a-icon"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="a-icon"><i className="fab fa-github"></i></a>
          <a href="#" className="a-icon"><i className="fab fa-linkedin-in"></i></a>
        </div>
        <span>or use your email for registration</span>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" placeholder="University Name" value={universityName} onChange={(e) => setUniversityName(e.target.value)} required />
        <input type="text" placeholder="Degree Name" value={degreeName} onChange={(e) => setDegreeName(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
