import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware.js';
import {
  createHomeService,
  deleteHomeService,
  getAllHomesService,
  updateHomeService,
} from '../services/homeService.js';
import { BadRequestError, UnauthorizedError } from '../utils/errors.js';

/**
 * ➕ Tạo home mới
 */
export const createHome = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    const owner = req.userId;

    if (!owner) throw new UnauthorizedError('No user ID found');
    if (!name) throw new BadRequestError('Home name is required');

    const savedHome = await createHomeService(name, owner);
    res.status(201).json(savedHome);
  } catch (err) {
    next(err);
  }
};

/**
 * 🗑️ Xóa home (chỉ admin)
 */
export const deleteHome = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    if (!userId) throw new UnauthorizedError('Unauthorized');
    if (!id) throw new BadRequestError('Missing home id');

    const result = await deleteHomeService(userId, id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

/**
 * 📄 Lấy tất cả home mà user sở hữu
 */
export const getAllHomes = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId;
    if (!userId) throw new UnauthorizedError('Unauthorized');

    const homes = await getAllHomesService(userId);
    res.json(homes);
  } catch (err) {
    next(err);
  }
};

/**
 * ✏️ Update home (chỉ admin)
 */
export const updateHome = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const userId = req.userId;

    if (!userId) throw new UnauthorizedError('Unauthorized');
    if (!id) throw new BadRequestError('Missing home id');
    if (!name) throw new BadRequestError('Home name is required');

    const updatedHome = await updateHomeService(userId, id, name);
    res.json(updatedHome);
  } catch (err) {
    next(err);
  }
};
