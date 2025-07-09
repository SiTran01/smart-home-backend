import express, { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { authController } from '../controllers/index.js';

const router: Router = express.Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/google', authController.googleLoginUser);
router.get('/user', authMiddleware, authController.getUser);

export default router;
