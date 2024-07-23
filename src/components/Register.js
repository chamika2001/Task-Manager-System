import React from 'react';
import '../styles/login.css'; // Import the regular CSS file

const Register = () => {
  return (
    
    <div className="a-form-container a-sign-up">
      <form>
        <h1>Create Account</h1>
        <div className="a-social-icons">
          <a href="#" className="a-icon"><i className="fa-brands fa-google-plus-g"></i></a>
          <a href="#" className="a-icon"><i className="fa-brands fa-facebook-f"></i></a>
          <a href="#" className="a-icon"><i className="fa-brands fa-github"></i></a>
          <a href="#" className="a-icon"><i className="fa-brands fa-linkedin-in"></i></a>
        </div>
        <span>or use your email for registration</span>
        <input type="text" placeholder="Name" required />
        <input type="email" placeholder="Email" />
        <input type="text" placeholder="University Name" />
        <input type="text" placeholder="Degree Name" />
        <input type="password" placeholder="Password" />
        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
