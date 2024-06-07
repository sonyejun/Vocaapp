import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';

const PublicRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();

    return !isLoggedIn ? children : <Navigate to="/" />;
}

export default PublicRoute;