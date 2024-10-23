import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children, isAuthenticated }) => {
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!isAuthenticated) {
            navigate('/'); // Navigate to the login page
        }
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? children : null; // Render children if authenticated
};

export default PrivateRoute;
