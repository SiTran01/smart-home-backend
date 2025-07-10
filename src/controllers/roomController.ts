import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware.js';
import {
  createRoomService,
  deleteRoomService,
  getAllRoomsService,
  updateRoomService,
} from '../services/roomService.js';
import { BadRequestError, UnauthorizedError } from '../utils/errors.js';

export const createRoom = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { name, homeId } = req.body;
    const userId = req.userId;

    if (!userId) throw new UnauthorizedError('No user ID found');
    if (!homeId) throw new BadRequestError('Missing homeId in request body');
    if (!name) throw new BadRequestError('Room name is required');

    // ✅ truyền userId vào service
    const savedRoom = await createRoomService(userId, name, homeId);
    res.status(201).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

export const deleteRoom = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { roomId } = req.params;
    const userId = req.userId;

    if (!userId) throw new UnauthorizedError('No user ID found');
    if (!roomId) throw new BadRequestError('Missing roomId in request params');

    // ✅ truyền userId vào service
    await deleteRoomService(userId, roomId);
    res.json({ message: 'Room deleted successfully' });
  } catch (err) {
    next(err);
  }
};

export const getAllRooms = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { homeId } = req.params;
    if (!homeId) throw new BadRequestError('Missing homeId in request params');

    const rooms = await getAllRoomsService(homeId);
    res.json(rooms);
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId;
    const { roomId } = req.params;
    const { name, type, location } = req.body;

    if (!userId) throw new UnauthorizedError('Unauthorized');
    if (!roomId) throw new BadRequestError('Missing roomId in request params');

    const updatedRoom = await updateRoomService(userId, roomId, { name, type, location });
    res.json(updatedRoom);
  } catch (err) {
    next(err);
  }
};