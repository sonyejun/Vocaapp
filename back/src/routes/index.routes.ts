import express, { Request, Response } from 'express';
import authRoutes from './auth.routes';
import folderRoutes from './folder.routes';
import wordRoutes from './word.routes';
import dashboardRoutes from './dashboard.routes';

import { User } from '../entity/User';
import authenticateJWT from '../middleware/authenticateJWT';

const routes = express.Router();

routes.use('/auth', authRoutes);
routes.use('/folder', authenticateJWT, folderRoutes);
routes.use('/word', authenticateJWT, wordRoutes);
routes.use('/dashboard', authenticateJWT, dashboardRoutes);

export default routes;