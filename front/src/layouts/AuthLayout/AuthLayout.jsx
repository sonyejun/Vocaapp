import React from 'react';
import { AuthLayoutWrapper } from './AuthLayout.styles';

const AuthLayout = ({children}) => {
    return (
        <AuthLayoutWrapper>
            { children }
        </AuthLayoutWrapper>
    )
};

export default AuthLayout;