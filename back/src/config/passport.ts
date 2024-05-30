
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions, VerifiedCallback } from 'passport-jwt';
import * as userService from '../services/user.service';

passport.use(
    new LocalStrategy(
        { usernameField: 'email', passwordField: 'password' },
        async (email, password, done) => {
            try {
                const user = await userService.findUserByEmail(email);
        
                if (!user) return done(null, false, { message: `Email ${email} not found` });

                const isMatch = await user.comparePassword(password);

                if (!isMatch) return done(null, false, { message: 'Incorrect password' });
                
                done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    )
);

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.ACCESS_TOKEN_SECRET // JWT를 서명하는데 사용되는 비밀키입니다.
};

passport.use(
    new JwtStrategy(options, async (jwt_payload: any, done: VerifiedCallback) => {
        try {
            const user = await userService.findUserByEmail(jwt_payload.email);

            if (!user) return done(null, false);

            done(null, user);
        } catch (err) {
            done(err, false);
        }
    })
);