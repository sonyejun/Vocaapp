import express from 'express';
import dashboradCtrl from '../controllers/dashborad.ctrl';

const router = express.Router();

router.get('/', dashboradCtrl.getDashboard);

export default router;