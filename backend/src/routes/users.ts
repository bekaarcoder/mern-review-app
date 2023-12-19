import express from 'express';
import * as UserController from '../controllers/users';

const router = express.Router();

router.get('/', UserController.createUser);

export default router;
