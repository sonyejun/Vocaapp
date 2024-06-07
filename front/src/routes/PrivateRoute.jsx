import React from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const navigateTo = location.state?.from || '/';

    const { isLoggedIn } = useAuth();
    return isLoggedIn ? (
        children
    ) : (
        <Navigate to="/login" state={{ from: navigateTo }} replace />
    );
};


export default PrivateRoute;
