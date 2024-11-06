import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Register.css';

import apiInstance from '../../utils/axios.js';
import useUserData from '../../plugin/useUserData.js';
import { useAuthStore } from '../../store/auth.js';
import { register } from '../../utils/auth.js';

import Header from '../component/Header.jsx';

function Register() {
    const [bioData, setBioData] = useState({ email: "", password: "", password2: ""  });
    const [isLoading, setIsLoading] = useState(false);
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const navigate = useNavigate();

    const userId = useUserData()?.user_id;

    useEffect(() => {
        const handleRegisterStatus = async () => {
            if(userId > 0) {
                navigate('/')
            }
        };
        handleRegisterStatus();
    }, [userId, navigate]);

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
            password2: "",
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const { error } = await register(bioData.email, bioData.password, bioData.password2);
        if (error) {
            alert(JSON.stringify(error));
            resetForm();
        } else {
            navigate("/login");
        }
        setIsLoading(false);
    };

    return (
        <>
            <Header />
            <section className="register-container">
                <div className="register-box">
                    <div className="register-header-section">
                        <h2>Registration</h2>
                    </div>
                    <div className="redirect-signin">
                        <span>
                            Already have an account? {' '}
                            <Link to='/login/'>Sign In</Link>
                        </span>
                    </div>
                    <div className="register-form">
                        <form className='needs-validation' onSubmit={handleRegister} noValidate>
                            <label htmlFor='email' className='form-label'>Email Address</label>
                            <input type="email" onChange={handleBioDataChange} value={bioData.email} id='email' className='form-control' name='email' placeholder='johndoe@gmail.com' required />
                            <label htmlFor="password" className='form-label'>Password</label>
                            <input type="password" onChange={handleBioDataChange} value={bioData.password} className='form-control' name='password' placeholder='********' required />
                            <label htmlFor="password2" className='form-label'>Confirm Password</label>
                            <input type="password" onChange={handleBioDataChange} value={bioData.password2} className='form-control' name='password2' placeholder='********' required />
                            <button className='register-button' type='submit' disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <span>Processing...</span>
                                        <i className='fas fa-spinner fa-spin' />
                                    </>
                                ) : (
                                    <>
                                        <span>Sign Up</span>
                                        <i className='fas fa-user-plus' />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );

}

export default Register;