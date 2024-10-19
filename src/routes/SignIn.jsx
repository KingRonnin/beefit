import React, { useState } from 'react';
import './SignIn.css';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); 

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

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    const apiUrl = 'https://your-backend-api.com/sign-up';

    const userData = {
      email,
      password,
      phone: phoneNumber
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
        console.log('Account created successfully:', data);
        setErrorMessage('');
        setIsSignUp(false);
      } else {
        setErrorMessage(data.message || 'Error creating account');
      }
    } catch (error) {
      setErrorMessage('An error occurred during sign-up. Please try again.');
    }
  };

  return (
    <div className={`sign-in-container ${isSignUp ? 'flip' : ''}`}>
      <div className="sign-in-box">
        <div className="sign-in-box-inner">
        
          <div className="sign-in-form">
            <div className="header-section">
              <h1>Welcome To Beefit!</h1>
              <p>Sign in to Get Started.</p>
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <form onSubmit={handleSignIn}>
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
              <p>
                Don't have an account?{' '}
                <span onClick={() => setIsSignUp(true)} className="toggle-link">
                  Create an account
                </span>
              </p>
            </div>
          </div>

          <div className="sign-up-form">
            <div className="header-section">
              <h1>Create an Account!</h1>
              <p>Sign up to start your fitness journey.</p>
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <form onSubmit={handleSignUp}>
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
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  placeholder="Enter your phone number"
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
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm your password"
                />
              </div>
              <button type="submit" className="sign-up-button">
                Sign Up
              </button>
            </form>

            <div className="alternative-action">
              <p>
                Already have an account?{' '}
                <span onClick={() => setIsSignUp(false)} className="toggle-link">
                  Sign in

                 
                  
            
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
