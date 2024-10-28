import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { useAuthStore } from '../../store/auth.js';
import { register } from '../../utils/auth.js';

function Login() {
    const [bioData, setBioData] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
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
        e.preventDefault()
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
                    <h2>Login</h2>
                    <form className='needs-valdiation' onSubmit={handleLogin} noValidate>
                        {/* username */}
                        <label htmlFor="email" className='form-label'>
                            Email Address
                        </label>
                        <input type="email" onChange={handleBioDataChange} value={bioData.email} id='email' className='form-control' name='email' placeholder='johndoe@gmail.com' required />
                        <div className='invalid-feedback'>Please enter valid username</div>
                        {/* password */}
                        <label htmlFor="password" className='form-label'>
                            Password
                        </label>
                        <input type="password" onChange={handleBioDataChange} value={bioData.password} id='password' classname='form-control' name='password' placeholder='********' required />
                        <div className='invalid-feedback'>Please enter a valid password</div>
                        {/* checkbox */}
                        <div className='form-check'>
                            <input type="checkbox" className='form-check-iput' id='rememberme' required />
                            <label htmlFor="rememberme">
                                Remember Me
                            </label>
                            <div className='invalid-feedback'>You must agree before submitting</div>
                        </div>
                        <div>
                            {/* <Link to=></Link> */}
                        </div>
                        <button type='submit' disabled={isLoading}>
                            {isLoading} ? (
                                <>
                                    <span>Processing...</span>
                                    <i className='fas fa-spinner fa-spin'/>
                                </>
                            ) : (
                                <>
                                    <span>
                                        Sign In
                                    </span>
                                    <i className='fas fa-sign-in-alt' />
                                </>
                            )
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}