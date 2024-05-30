import express, { Request, Response } from 'express';
import authRoutes from './auth.routes';
import folderRoutes from './folder.routes';

import { User } from '../entity/User';
import authenticateJWT from '../middleware/authenticateJWT';

const routes = express.Router();

routes.use('/auth', authRoutes);
routes.get('/protected', authenticateJWT, (req: Request, res: Response) => {
    const user = req.user as User;
    res.json({
        id: user.id,
        email: user.email
    });
});
routes.use('/folder', authenticateJWT, folderRoutes);

export default routes;