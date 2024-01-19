import express from 'express';
import * as AuthController from '../controllers/auth';
import {
    loginBodyValidator,
    passwordResetBodyValidator,
    passwordResetRequestBodyValidator,
    signUpBodyValidator,
    validate,
} from '../middlewares/validator';

const router = express.Router();

router.post('/signup', signUpBodyValidator, validate, AuthController.signUp);

router.post('/signin', loginBodyValidator, validate, AuthController.login);

router.post('/verify-email', AuthController.verifyEmail);

router.post('/resend-verification-code', AuthController.resendVerficationCode);

router.post(
    '/reset-password-request',
    passwordResetRequestBodyValidator,
    validate,
    AuthController.requestPasswordReset
);

router.post(
    '/reset-password',
    passwordResetBodyValidator,
    validate,
    AuthController.resetPassword
);

export default router;
