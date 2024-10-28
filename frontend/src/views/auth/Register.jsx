import React, { useState } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";

import apiInstance from '../../utils/axios';
import { useAuthStore } from '../../store/auth';
import { register } from '../../utils/auth';

function Register() {
    const [bioData, setBioData] = ({ email: "", pasword: "", password2: ""  });
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
            password2: "",
        });
    };

    const handleRegister = async (e) => {

    }
}