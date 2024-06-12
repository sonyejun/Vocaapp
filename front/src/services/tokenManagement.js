import { postRefreshToken } from './api';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthProvider';

// Function to set the token renewal timer
const setTokenRenewalTimer = () => {
    const expirationTime = parseInt(localStorage.getItem('jwtTokenExp'));

    if (isNaN(expirationTime)) {
        console.error('Invalid expiration time in localStorage.');
        return;
    };

    const now = new Date().getTime();
    const renewalThreshold = 60000;
    const timeUntilRenewal = expirationTime - renewalThreshold - now;
    if (timeUntilRenewal > 0) {
        setTimeout(() => {
            console.log('settime')
            tokenRenewal();
        }, timeUntilRenewal);
    } else {
        tokenRenewal();
    }
};

// Function to renew the token
const tokenRenewal = async () => {
    // Check the expiration time of the access token
    const expirationTime = parseInt(localStorage.getItem('jwtTokenExp'));
    const now = new Date().getTime();
    const renewalThreshold = 60000;

    // If the expiration time has passed
    if (now >= expirationTime - renewalThreshold) {
        try {
            console.log(123123123)
            // Assuming refreshToken is stored in sessionStorage as well
            const refreshedToken = await postRefreshToken('/auth/refreshtoken');

            if (!refreshedToken || !refreshedToken.accessToken || !refreshedToken.accessTokenExpiration) {
                throw new Error('Invalid response from token refresh API.');
            }
            // Store the refreshed access token
            localStorage.setItem('jwtToken', refreshedToken.accessToken);

            // Set the expiration time of the refreshed access token

            localStorage.setItem('jwtTokenExp', refreshedToken.accessTokenExpiration);

            console.log('Access token refreshed successfully:', refreshedToken);
        } catch (error) {

            console.error('Failed to refresh token:', error);
            throw error;
        }
    } else {
        console.log('Access token is still valid.');
    };
    
    setTokenRenewalTimer();
};

// Custom hook for token management
// Call the checkLoginStatus function when the component mounts or when setIsLoggedIn changes
const useTokenManagement = () => {
    const { setIsLoggedIn } = useAuth();

    useEffect(() => {
        const checkLoginStatus = async () => {
            const jwtToken = localStorage.getItem('jwtToken');
            const jwtTokenExp = localStorage.getItem('jwtTokenExp');

            if (jwtToken && jwtTokenExp) {
                try {
                    await tokenRenewal();
                    setIsLoggedIn(true);

                } catch (error) {
                    setIsLoggedIn(false);
                    localStorage.removeItem('jwtToken');
                    localStorage.removeItem('jwtTokenExp');
                }
            } else {
                setIsLoggedIn(false);
            }
        };

        checkLoginStatus();
    }, [setIsLoggedIn]);
};

export default useTokenManagement;