import jwt from 'jsonwebtoken';
import { User } from '../entity/User';
import './dotenv-setting';
import { UserDto } from '../dtos/user.dto';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;

export function accessToken(userDto: UserDto): { accessToken: string; accessTokenExpiration: number } {
    const expiresIn = 15 * 60;
    const accessToken = jwt.sign(userDto, accessTokenSecret, { expiresIn });
    const accessTokenExpiration = Date.now() + expiresIn * 1000;

    return { accessToken, accessTokenExpiration };
}

export function refreshToken(userDto: UserDto) {
    return jwt.sign(userDto, refreshTokenSecret, { expiresIn: '7d' });
}

export function verifyRefreshToken(refreshToken: string): any {
    try {
        const decoded = jwt.verify(refreshToken, refreshTokenSecret);
        return decoded;
    } catch (err) {
        console.error('Refresh token verification error:', err);
        return null;
    }
};

export default {
    accessToken,
    refreshToken,
    verifyRefreshToken
}

