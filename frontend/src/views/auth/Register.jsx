import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { useAuthStore } from '../../store/auth.js';
import { register } from '../../utils/auth.js';

function Register() {
    const [bioData, setBioData] = useState({ email: "", password: "", password2: ""  });
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
            <section className="container">
                <div className="box">
                    <h2>Register</h2>
                    <form className='needs-validation' onSubmit={handleRegister} noValidate>
                        <label htmlFor='email' className='form-label'>
                            Email Address
                        </label>
                        <input type="email" onChange={handleBioDataChange} value={bioData.email} id='email' className='form-control' name='email' placeholder='johndoe@gmail.com' required/>
                        <label htmlFor="password" children className='form-label'>
                            Password
                        </label>
                        <input type="password" onChange={handleBioDataChange} value={bioData.password} className='form-control' name='password' placeholder='********' required />
                        <label htmlFor="password" className='form-label'>
                            Confirm Password
                        </label>
                        <input type="password" onChange={handleBioDataChange} value={bioData.password2} className='form=control' name='password2' placeholder='********' required />
                        <button type='submit' disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <span>
                                        Processing...
                                    </span>
                                    <i className='fas fa-spinner fa-spin' />
                                </>
                            ) : (
                                <>
                                    <span>
                                        Sign Up
                                    </span>
                                    <i className='fas fa-user-plus' />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Register;