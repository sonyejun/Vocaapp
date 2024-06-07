import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import * as userService from '../services/user.service';
import { UserDto } from '../dtos/user.dto';
import { verifyRefreshToken } from '../config/token';

const login = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', { session: false }, async (err: any, user: any, info: any) => {
        if (err) return res.status(500).json(err);
        
        if (!user) return res.status(400).json(info);

        const { accessToken, accessTokenExpiration } = userService.generateAccessToken(user);
        const refreshToken = userService.generateRefreshToken(user);

        try {
            await userService.saveRefreshToken(user, refreshToken);

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production' ? true : false, // Only Use HTTPS.
                sameSite: 'strict',
                path: '/',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7days
            });

            return res.status(200).json({ accessToken, accessTokenExpiration });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Failed to save refresh token' });
        }
    })(req, res, next)
};

const signup = async (req: Request, res: Response) => {
    try {
        const { email, password, username } = req.body;
        const user = await userService.createUser(email, password, username);

        const userDto = new UserDto(user);
        
        res.status(201).send(userDto);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const logout = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token not provided' });
    }

    try {
        const data = await userService.deleteRefreshToken(refreshToken);
        console.log(data);
        
        res.clearCookie('refreshToken');

        return res.status(200).json({ message: 'Logged out successfully' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to logout' });
    }
};


const refreshToken = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    console.log(req.cookies)
    // If refresh token is not provided, return error message to the client
    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token not provided' });
    }

    try {
        // Verify the refresh token
        const decodedToken = verifyRefreshToken(refreshToken);

        if (!decodedToken) {
            // If the refresh token is not valid, return error message to the client
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        console.log(decodedToken)

        // Retrieve user's refresh token from the database
        const user = await userService.findUserByRefreshToken(refreshToken);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Issue a new access token
        const { accessToken, accessTokenExpiration } = userService.generateAccessToken(user);
        // Return the new access token to the client
        return res.status(200).json({ accessToken, accessTokenExpiration });

    } catch (error) {
        // If the refresh token is not valid, return error message to the client
        console.error(error);
        return res.status(403).json({ message: 'Invalid refresh token' });
    }
};


export default {
    login,
    signup,
    refreshToken,
    logout
};
