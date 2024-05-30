import jwt from 'jsonwebtoken';
import { User } from '../entity/User';
import './dotenv-setting';

export function generateAccessToken(user: User) {
    const { password, ...payload } = user;
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

export function generateRefreshToken(user: User) {
    const { password, ...payload } = user;
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}


export default {
    generateAccessToken,
    generateRefreshToken
}

