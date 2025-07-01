import express from 'express';
import { homeController } from '../controllers/index.js';

const router = express.Router();

router.get('/', homeController.getAllHomes);
router.post('/', homeController.createHome);
router.put('/:id', homeController.updateHome);
router.delete('/:id', homeController.deleteHome);

export default router;
