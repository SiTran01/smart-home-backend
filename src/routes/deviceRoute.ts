import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { deviceController } from '../controllers/index.js';
import { validateInput } from '../middlewares/validateInput.js';
import { createDeviceSchema, updateDeviceSchema } from '../validations/deviceValidation.js';

const router = express.Router();

router.use(authMiddleware); // ✅ bảo vệ toàn bộ routes dưới

// 📝 Tạo device mới
router.post('/createdevice', validateInput(createDeviceSchema), deviceController.createDevice);

// 📥 Lấy tất cả devices trong 1 home
router.get('/getdevices/:homeId', deviceController.getAllDevices);

// ✏️ Cập nhật device
router.put('/:deviceId', validateInput(updateDeviceSchema), deviceController.updateDevice);

// 🗑️ Xóa device
router.delete('/:deviceId', deviceController.deleteDevice);

export default router;
