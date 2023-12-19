import express from 'express';
import * as AuthController from '../controllers/auth';

const router = express.Router();

router.post('/signup', AuthController.signUp);

export default router;
