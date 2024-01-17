import express from 'express';
import * as AuthController from '../controllers/auth';
import { signUpBodyValidator, validate } from '../middlewares/validator';

const router = express.Router();

router.post('/signup', signUpBodyValidator, validate, AuthController.signUp);

router.post('/verify-email', AuthController.verifyEmail);

router.post('/resend-verification-code', AuthController.resendVerficationCode);

export default router;
