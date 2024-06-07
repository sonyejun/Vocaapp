import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { SignupSubTitle, SignupLinkText, SignupFormBox, SignupFormButton } from './Signup.styles';

import AuthLayout from '../../layouts/AuthLayout/AuthLayout';
import AuthForm from '../../components/AuthForm/AuthForm';

import EmailIcon from '../../assets/images/mail.png';
import UserIcon from '../../assets/images/user.png';
import PasswordIcon from '../../assets/images/password.png';
import { postData } from '../../services/api';

const defaultFormData = { email: '', username: '', password: '' };

const Signup = React.memo(() => {
    const [formData, setFormData] = useState(defaultFormData);
    const navigate = useNavigate();

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }, [formData]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        try {
            const response = await postData('/auth/signup', formData);
            console.log('Signup successful:', response);

            navigate('/login');

        } catch (err) {
            setFormData(defaultFormData);
            console.error('Signup failed:', err);
        }
    }, [formData, history]);

    return (
        <AuthLayout>
            <AuthForm title={'Sign up'}>
                <SignupSubTitle>Enter your information to create your account</SignupSubTitle>

                <SignupFormBox onSubmit={handleSubmit}>
                    <div>
                        <span className="icon">
                            <img src={EmailIcon} alt="mail icon" />
                        </span>
                        <input type="email" name="email" placeholder='Enter your email' required onChange={handleChange} value={formData.email} />
                    </div>
                    <div>
                        <span className="icon">
                            <img src={UserIcon} alt="user icon" />
                        </span>
                        <input type="text" name="username" placeholder='Enter your name' required onChange={handleChange} value={formData.username} />
                    </div>
                    <div>
                        <span className="icon">
                            <img src={PasswordIcon} alt="password icon" />
                        </span>
                        <input type="password" name="password" placeholder='Enter your password' required onChange={handleChange} value={formData.password} />
                    </div>
                    <SignupFormButton type="submit">Sign up</SignupFormButton>
                </SignupFormBox>

                <SignupLinkText>
                    Already have an account? <Link to="/login">Login</Link>
                </SignupLinkText>
            </AuthForm>
        </AuthLayout>
    );
});

export default Signup;
