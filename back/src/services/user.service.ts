import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import { RefreshToken } from '../entity/RefreshToken';
import { accessToken, refreshToken } from '../config/token';
import { UserDto } from '../dtos/user.dto';

// Find user by email
export const findUserByEmail = async (email: string): Promise<User | null> => {
    return await AppDataSource.getRepository(User).findOne({ where: { email } });
};

// Create user
export const createUser = async (email: string, password: string, username: string): Promise<User> => {
    const user = AppDataSource.getRepository(User).create({ email, password, username });
    return await AppDataSource.getRepository(User).save(user);
};

// Save a refresh token
export const saveRefreshToken = async (user: User, refreshToken: string): Promise<void> => {
    const refreshTokenEntity = new RefreshToken();
    refreshTokenEntity.token = refreshToken;
    refreshTokenEntity.user = user;
    await AppDataSource.getRepository(RefreshToken).save(refreshTokenEntity);
};

// Create a access token
export const generateAccessToken = (user: User): { accessToken: string; accessTokenExpiration: number } => {
    const payload = { ...new UserDto(user) };
    return accessToken(payload);
};

// Create a refresh token
export const generateRefreshToken = (user: User): string => {
    const payload = { ...new UserDto(user) };
    return refreshToken(payload);
};


export const findUserByRefreshToken = async (refreshToken: string) => {
    try { 
        const refreshTokenDoc = await AppDataSource.getRepository(RefreshToken).findOne({ where: { token: refreshToken }, relations: ['user'] });

        if (!refreshTokenDoc) {
            return null; 
        }

        const user = refreshTokenDoc.user;

        return user;
    } catch (error) {
        console.error('Error finding user by refresh token:', error);
        throw error;
    }
};

export const deleteRefreshToken = async (refreshToken: string): Promise<boolean> => {
    const RefreshTokenRepository = AppDataSource.getRepository(RefreshToken)
    const refreshTokenDoc = await RefreshTokenRepository.findOne({ where: { token: refreshToken }});

    if(!refreshTokenDoc) return false;

    await RefreshTokenRepository.remove(refreshTokenDoc);

    return true;
}