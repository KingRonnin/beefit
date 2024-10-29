import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation
import './SignIn.css';
import loadingGif from '../../images/loading-gif.gif'; // Make sure to adjust the path to your loading GIF

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(false); // Track loading state

  const navigate = useNavigate(); // For navigation

  // Simplified password validation function
  const validatePassword = (password) => {
    return password.length >= 8 && password.length <= 16;
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const existingUser = users.find((user) => user.email === email && user.password === password);
    if (existingUser) {
      setLoggedInUser(existingUser);
      setErrorMessage('');
      console.log('Logged in successfully:', existingUser);
    } else {
      setErrorMessage('Invalid credentials');
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage('Password must be between 8-16 characters.');
      return;
    }

    const newUser = {
      email,
      password,
      phone: phoneNumber,
    };

    const userExists = users.some((user) => user.email === email);
    if (userExists) {
      setErrorMessage('User already exists');
    } else {
      setUsers([...users, newUser]);
      setErrorMessage('');
      setIsSignUp(false);
      console.log('Account created successfully:', newUser);
    }
  };

  const handleGetStartedClick = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate('/logfitness'); // Redirect to the "LogFitness" page
    }, 2000); // Simulate a 2-second loading delay
  };

  return (
    <div className={`sign-in-container ${isSignUp ? 'flip' : ''}`}>
      <div className="sign-in-box">
        <div className="sign-in-box-inner">
          <div className="sign-in-form">
            <div className="header-section">
              <h1>Welcome To Beefit!</h1>
              <p>{loggedInUser ? `Logged in as ${loggedInUser.email}` : 'Sign in to Get Started.'}</p>
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            {!loggedInUser && (
              <form onSubmit={handleSignIn} className='form'>
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
            )}

            {loggedInUser && (
              <div>
                <button className="cta-button" onClick={handleGetStartedClick}>
                  Get Started
                </button>
              </div>
            )}

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

      {/* Loading overlay */}
      {loading && (
        <div className="loading-overlay">
          <img src={loadingGif} alt="Loading..." className="loading-spinner" />
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}