import React, { useState, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { LoginLinkText, LoginSubTitle, LoginFormBox, LoginFormButton } from './Login.styles';

import AuthLayout from '../../layouts/AuthLayout/AuthLayout';
import AuthForm from '../../components/AuthForm/AuthForm';

import EmailIcon from '../../assets/images/mail.png';
import PasswordIcon from '../../assets/images/password.png';

import { postData } from '../../services/api';
import { useAuth } from '../../contexts/AuthProvider';

const defaultFormData = { email: '', password: '' };

const Login = React.memo(() => {
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAuth();

    const { state } = useLocation();

    const [formData, setFormData] = useState({ ...defaultFormData });
    
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    }, [setFormData]);
    
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
    
        try {
            const response = await postData('/auth/login', formData);
            console.log('Login successful:', response);

            localStorage.setItem('jwtToken', response.accessToken);
            localStorage.setItem('jwtTokenExp', response.accessTokenExpiration);

            setIsLoggedIn(true);
            
            const navigateTo = state?.from || '/';
            console.log(navigateTo)
            navigate(navigateTo);

        } catch (err) {
            alert('Please verify your login information');
            setFormData({...defaultFormData})
            console.error('Login failed:', err);
        }
    }, [formData, setIsLoggedIn, history, location.state]);

    

    return (
        <AuthLayout>
            <AuthForm title={'Login'}>
                <LoginSubTitle>Enter your details to sign in to your account</LoginSubTitle>

                <LoginFormBox onSubmit={handleSubmit}>
                    <div>
                        <span className="icon">
                            <img src={EmailIcon} alt="mail icon" />
                        </span>
                        <input type="email" name="email" placeholder='Enter your email' required onChange={handleChange} value={formData.email} />
                    </div>
                    <div>
                        <span className="icon">
                            <img src={PasswordIcon} alt="password icon" />
                        </span>
                        <input type="password" name="password" placeholder='Enter your password' required onChange={handleChange} value={formData.password} />
                    </div>
                    <LoginFormButton type="submit">Login</LoginFormButton>
                </LoginFormBox>

                <LoginLinkText>
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </LoginLinkText>
            </AuthForm>
        </AuthLayout>
    );
});

export default Login;
