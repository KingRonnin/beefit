import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignIn.css'; 

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();

    const apiUrl = 'https://your-backend-api.com/sign-in';

    const userData = {
      email,
      password
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
       
        console.log('Logged in successfully:', data);
      } else {
      
        setErrorMessage(data.message || 'Invalid credentials');
      }
    } catch (error) {
      setErrorMessage('An error occurred during sign-in. Please try again.');
    }
  };

  return (
    <div className="sign-in-container">
      <div className="sign-in-box">
        <div className="header-section">
          <h1>Welcome Back!</h1>
          <p>Sign in to continue tracking your fitness journey.</p>
        </div>
        
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        
        <form onSubmit={handleSignIn} className="sign-in-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>

        <div className="alternative-action">
          <p>Don't have an account?</p>
          <Link to="/SignUp" className="create-account-link">Create an account</Link>
        </div>
      </div>
    </div>
  );
}
