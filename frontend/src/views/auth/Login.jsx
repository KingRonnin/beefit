import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Login.css';

import apiInstance from '../../utils/axios.js';
import { useAuthStore } from '../../store/auth.js';
import { login } from '../../utils/auth.js';

function Login() {
    const [bioData, setBioData] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const navigate = useNavigate();

    const handleBioDataChange = (event) => {
        setBioData({
            ...bioData,
            [event.target.name]: event.target.value,
        });
    };

    const resetForm = () => {
        setBioData({
            email: "",
            password: "",
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const { error } = await login(bioData.email, bioData.password);
        if (error) {
            alert(JSON.stringify(error));
        } else {
            navigate('/');
        }
        setIsLoading(false);
    };

    return (
        <>
            <section className="container">
                <div className="box">
                    <div className="box-inner">
                        <div className="header-section">
                            <h1>Welcome to Beefit</h1>
                            <p>Sign In to Get Started</p>
                        </div>
                        <div className="form">
                            <form className='needs-validation' onSubmit={handleLogin} noValidate>
                                {/* username */}
                                <label htmlFor="email" className='form-label'>
                                    Email Address
                                </label>
                                <input type="email" onChange={handleBioDataChange} value={bioData.email} id='email' className='form-control' name='email' placeholder='Email' required />
                                {/* password */}
                                <label htmlFor="password" className='form-label'>
                                    Password
                                </label>
                                <input type="password" onChange={handleBioDataChange} value={bioData.password} id='password' className='form-control' name='password' placeholder='Password' required />
                                <div>
                                    {/* Forgot Password */}
                                </div>
                                <button type='submit' disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <span>Processing...</span>
                                            <i className='fas fa-spinner fa-spin' />
                                        </>
                                    ) : (
                                        <>
                                            <span>
                                                Sign In
                                            </span>
                                            <i className='fas fa-sign-in-alt' />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                        <span>
                            Don't have an account? {' '}
                            <Link to='/register/'>
                                Sign Up
                            </Link>
                        </span>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;