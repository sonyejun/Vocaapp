import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { UserDto } from "../dtos/user.dto";

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, (error: any, user: any, info: any) => {
        if (error) return res.status(500).json({ message: "Server Error" });

        if (!user) return res.status(403).json({ message: "Unauthorized" });

        req.user = user;
        next();
    })(req, res, next);
};

export default authenticateJWT;