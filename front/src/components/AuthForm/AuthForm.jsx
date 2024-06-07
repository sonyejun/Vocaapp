import React from 'react';
import { AuthFormWrapper, Title } from './AuthForm.styles';

const AuthForm = ({title, children}) => {
    return (
        <AuthFormWrapper>
            <Title>{title}</Title>

            { children }
        </AuthFormWrapper>
    );
};

export default AuthForm;