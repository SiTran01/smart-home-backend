import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { roomController } from '../controllers/index.js';
import { validateInput } from '../middlewares/validateInput.js';
import { createRoomSchema, updateRoomSchema } from '../validations/roomValidation.js';

const router = express.Router();

router.use(authMiddleware); // ✅ tất cả route dưới đều cần auth

// 📝 Tạo room mới
router.post('/createroom', validateInput(createRoomSchema), roomController.createRoom);

// 📥 Lấy tất cả rooms trong 1 home
router.get('/getrooms/:homeId', roomController.getAllRooms);

// ✏️ Cập nhật room
router.put('/:roomId', validateInput(updateRoomSchema), roomController.updateRoom);

// 🗑️ Xóa room
router.delete('/:roomId', roomController.deleteRoom);

export default router;
