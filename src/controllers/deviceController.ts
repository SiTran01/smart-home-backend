import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware.js';
import {
  createDeviceService,
  deleteDeviceService,
  getAllDevicesService,
  updateDeviceService,
} from '../services/deviceService.js';
import { BadRequestError, UnauthorizedError } from '../utils/errors.js';

/**
 * ➕ Tạo device mới (owner hoặc admin)
 */
export const createDevice = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId;
    if (!userId) throw new UnauthorizedError('Unauthorized');

    const savedDevice = await createDeviceService(userId, req.body);
    res.status(201).json(savedDevice);
  } catch (err) {
    next(err);
  }
};

/**
 * ✏️ Update device (owner hoặc admin)
 */
export const updateDevice = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId;
    const { deviceId } = req.params;

    if (!userId) throw new UnauthorizedError('Unauthorized');
    if (!deviceId) throw new BadRequestError('Missing deviceId in request params');

    const updatedDevice = await updateDeviceService(userId, deviceId, req.body);
    res.json(updatedDevice);
  } catch (err) {
    next(err);
  }
};

/**
 * 🗑️ Delete device (owner hoặc admin)
 */
export const deleteDevice = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId;
    const { deviceId } = req.params;

    if (!userId) throw new UnauthorizedError('Unauthorized');
    if (!deviceId) throw new BadRequestError('Missing deviceId in request params');

    const result = await deleteDeviceService(userId, deviceId);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

/**
 * 📄 Get all devices (owner hoặc admin có thể xem)
 */
export const getAllDevices = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId;
    const { homeId } = req.params;

    if (!userId) throw new UnauthorizedError('Unauthorized');
    if (!homeId) throw new BadRequestError('Missing homeId in request params');

    const devices = await getAllDevicesService(userId, homeId);
    res.json(devices);
  } catch (err) {
    next(err);
  }
};
