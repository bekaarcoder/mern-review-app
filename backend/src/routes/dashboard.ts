import express from 'express';
import { isAdmin, verifyToken } from '../middlewares/auth';
import { getDashboardCount } from '../controllers/dashboard';

const router = express.Router();

router.get('/counts', verifyToken, isAdmin, getDashboardCount);

export default router;
