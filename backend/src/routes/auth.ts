import express from 'express';
import * as AuthController from '../controllers/auth';
import { signUpBodyValidator, validate } from '../middlewares/validator';

const router = express.Router();

router.post('/signup', signUpBodyValidator, validate, AuthController.signUp);

export default router;
