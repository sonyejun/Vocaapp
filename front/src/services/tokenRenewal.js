import { postRefreshToken } from './api';

const tokenRenewal = async () => {
    // Check the expiration time of the access token
    const expirationTime = parseInt(localStorage.getItem('jwtTokenExp'));
    const now = new Date().getTime();

    // If the expiration time has passed
    if (now > expirationTime) {
        try {
            // Assuming refreshToken is stored in sessionStorage as well
            const refreshedToken = await postRefreshToken('/auth/refreshtoken');

            if (!refreshedToken || !refreshedToken.accessToken || !refreshedToken.accessTokenExpiration) {
                throw new Error('Invalid response from token refresh API.');
            }
            console.log(refreshedToken)
            // Store the refreshed access token
            localStorage.setItem('jwtToken', refreshedToken.accessToken);
            
            // Set the expiration time of the refreshed access token

            localStorage.setItem('jwtTokenExp', refreshedToken.accessTokenExpiration);
            
            console.log('Access token refreshed successfully:', refreshedToken);
        } catch (error) {
            setIsLoggedIn(false);
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('jwtTokenExp');
            
            throw error;
        }
    }
};

export default tokenRenewal