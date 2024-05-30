import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import * as userService from '../services/user.service';
import { UserDto } from '../dtos/user.dto';

const login = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', { session: false }, async (err: any, user: any, info: any) => {
        if (err) return res.status(500).json(err);
        
        if (!user) return res.status(400).json(info);

        const accessToken = userService.generateAccessToken(user);
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

            return res.status(200).json({ accessToken });
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

export default {
    login,
    signup
};
