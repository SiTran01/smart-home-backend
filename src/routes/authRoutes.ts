import express, { Router } from 'express';
// import { register, login, googleLogin, getUser } from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { authController } from '../controllers/index.js';

const router: Router = express.Router();

// ✅ Route register user
router.post('/register', authController.register);

// ✅ Route login user 
router.post('/login', authController.login); 

// ✅ Route login với Google
router.post('/google', authController.googleLogin);

// ✅ Route get user info từ token
router.get('/user', authMiddleware, authController.getUser);

export default router;
