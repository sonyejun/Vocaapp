import jwt from 'jsonwebtoken';
import { User } from '../entity/User';
import './dotenv-setting';
import { UserDto } from '../dtos/user.dto';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;

export function accessToken(userDto: UserDto) {
    return jwt.sign(userDto, accessTokenSecret, { expiresIn: '15m' });
}

export function refreshToken(userDto: UserDto) {
    return jwt.sign(userDto, refreshTokenSecret, { expiresIn: '7d' });
}

export default {
    accessToken,
    refreshToken
}

