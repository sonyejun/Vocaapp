import express from 'express';

import userCtrl from '../controllers/user.ctrl';

const router = express.Router();

router.post('/login', userCtrl.login);
router.post('/signup', userCtrl.signup);

export default router;