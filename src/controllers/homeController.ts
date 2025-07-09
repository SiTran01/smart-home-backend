import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware.js';
import {
  createHomeService,
  deleteHomeService,
  getAllHomesService,
  updateHomeService,
} from '../services/homeService.js';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../utils/errors.js';

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

export const deleteHome = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deletedHome = await deleteHomeService(id);

    if (!deletedHome) throw new NotFoundError('Home not found');

    res.json({ message: 'Home deleted successfully' });
  } catch (err) {
    next(err);
  }
};

export const getAllHomes = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) throw new UnauthorizedError('Unauthorized');

    const homes = await getAllHomesService(req.userId);
    res.json(homes);
  } catch (err) {
    next(err);
  }
};

export const updateHome = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) throw new BadRequestError('Home name is required');

    const updatedHome = await updateHomeService(id, name);
    if (!updatedHome) throw new NotFoundError('Home not found');

    res.json(updatedHome);
  } catch (err) {
    next(err);
  }
};
