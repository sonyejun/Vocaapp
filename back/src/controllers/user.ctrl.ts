import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

import passport from 'passport';
import { generateAccessToken, generateRefreshToken } from '../config/token';
import { RefreshToken } from '../entity/RefreshToken';

const login = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', {session: false}, async (err: any, user: any, info: any) => {
        if (err) return res.status(500).json(err);
        
        if(!user) return res.status(400).json(info);

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        try {
            const refreshTokenEntity = new RefreshToken();
            refreshTokenEntity.token = refreshToken;
            refreshTokenEntity.user = user;

            await AppDataSource.getRepository(RefreshToken).save(refreshTokenEntity);

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production'? true: false, // Only Use HTTPS.
                sameSite: 'strict',
                path: '/',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7days
            });

            return res.status(200).json({
                accessToken
            });

        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Failed to save refresh token' });
        }
    })(req, res, next)
};

const signup = async (req: Request, res: Response) => {
    try {
        const { email, password, username }:User = req.body;
        const user = AppDataSource.getRepository(User).create({
            email,
            password,
            username
        });

        const results: User = await AppDataSource.getRepository(User).save(user);

        const { password: _, ...userWithoutPassword } = results;
        
        res.status(201).send(userWithoutPassword);
    } catch (err) {
        res.status(500).send(err.message);
    }
};


export default {
    login,
    signup
};