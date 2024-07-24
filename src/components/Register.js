import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from '../components/firebase-task';
import { getFirestore, setDoc, doc } from '../components/firebase-task';
import '../styles/login.css';

const Register = ({ onSignUpSuccess, onError }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [universityName, setUniversityName] = useState('');
  const [degreeName, setDegreeName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const auth = getAuth();
    const db = getFirestore();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), { email, name, universityName, degreeName });
      onSignUpSuccess();
    } catch (error) {
      let message = 'Unable to create user';
      if (error.code === 'auth/email-already-in-use') {
        message = 'Email Address Already Exists !!!';
      }
      onError(message);
    }
  };

  return (
    <div className="a-form-container a-sign-up">
      <form onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <div className="a-social-icons">
          <a href="#" className="a-icon"><i className="fa-brands fa-google-plus-g"></i></a>
          <a href="#" className="a-icon"><i className="fa-brands fa-facebook-f"></i></a>
          <a href="#" className="a-icon"><i className="fa-brands fa-github"></i></a>
          <a href="#" className="a-icon"><i className="fa-brands fa-linkedin-in"></i></a>
        </div>
        <span>or use your email for registration</span>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" placeholder="University Name" value={universityName} onChange={(e) => setUniversityName(e.target.value)} required />
        <input type="text" placeholder="Degree Name" value={degreeName} onChange={(e) => setDegreeName(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <div className='button'>
        <button type="submit" >Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
