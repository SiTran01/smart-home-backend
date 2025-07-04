import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { roomController } from '../controllers/index.js';

const router = express.Router();

// 📝 Tạo room mới
router.post('/createroom', authMiddleware, roomController.createRoom);

// 📥 Lấy tất cả rooms trong 1 home
router.get('/getrooms/:homeId', authMiddleware, roomController.getAllRooms);

// ✏️ Cập nhật room
router.put('/:roomId', authMiddleware, roomController.updateRoom);

// 🗑️ Xóa room
router.delete('/:roomId', authMiddleware, roomController.deleteRoom);

export default router;
