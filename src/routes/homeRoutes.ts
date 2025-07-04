import express from 'express';
import { homeController } from '../controllers/index.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/gethomes', authMiddleware, homeController.getAllHomes);
router.post('/createhomes', authMiddleware, homeController.createHome);
router.put('/:id', authMiddleware, homeController.updateHome);
router.delete('/:id', authMiddleware, homeController.deleteHome);

export default router;
