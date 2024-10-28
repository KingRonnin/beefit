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
}