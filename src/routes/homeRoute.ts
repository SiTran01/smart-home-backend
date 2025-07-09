import express from 'express';
import { homeController } from '../controllers/index.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { validateInput } from '../middlewares/validateInput.js';
import { createHomeSchema, updateHomeSchema } from '../validations/homeValidation.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/gethomes', homeController.getAllHomes);
router.post('/createhomes', validateInput(createHomeSchema), homeController.createHome);
router.put('/:id', validateInput(updateHomeSchema), homeController.updateHome);
router.delete('/:id', homeController.deleteHome);

export default router;
