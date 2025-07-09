import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware.js';
import {
  createDeviceService,
  deleteDeviceService,
  getAllDevicesService,
  updateDeviceService,
} from '../services/deviceService.js';
import { BadRequestError, UnauthorizedError } from '../utils/errors.js';

export const createDevice = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const owner = req.userId;
    if (!owner) throw new UnauthorizedError('Unauthorized');

    const savedDevice = await createDeviceService(req.body);
    res.status(201).json(savedDevice);
  } catch (err) {
    next(err);
  }
};

export const deleteDevice = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { deviceId } = req.params;
    if (!deviceId) throw new BadRequestError('Missing deviceId in request params');

    const result = await deleteDeviceService(deviceId);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getAllDevices = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { homeId } = req.params;
    if (!homeId) throw new BadRequestError('Missing homeId in request params');

    const devices = await getAllDevicesService(homeId);
    res.json(devices);
  } catch (err) {
    next(err);
  }
};

export const updateDevice = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { deviceId } = req.params;
    if (!deviceId) throw new BadRequestError('Missing deviceId in request params');

    const updatedDevice = await updateDeviceService(deviceId, req.body);
    res.json(updatedDevice);
  } catch (err) {
    next(err);
  }
};
