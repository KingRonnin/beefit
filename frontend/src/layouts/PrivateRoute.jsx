import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.js';

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const loggedIn = useAuthStore((state) => state.isLoggedIn)();

    useEffect(() => {
        if (!loggedIn) {
            navigate('/login')
        }
    }, [loggedIn, navigate]);

    return loggedIn ? <>{children}</> : null;
};

export default PrivateRoute;
