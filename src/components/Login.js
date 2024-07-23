import React from 'react';
import '../styles/login.css'; // Import the regular CSS file

const Login = () => {
  return (
    
    <div className="a-form-container a-sign-in">
      <form>
        <h1>Sign In</h1>
        <div className="a-social-icons">
          <a href="#" className="a-icon"><i className="fa-brands fa-google-plus-g"></i></a>
          <a href="#" className="a-icon"><i className="fa-brands fa-facebook-f"></i></a>
          <a href="#" className="a-icon"><i className="fa-brands fa-github"></i></a>
          <a href="#" className="a-icon"><i className="fa-brands fa-linkedin-in"></i></a>
        </div>
        <span>or use your email password</span>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <a href="#">Forget Your Password?</a>
        <button>Sign In</button>
      </form>
    </div>
  );
};

export default Login;
