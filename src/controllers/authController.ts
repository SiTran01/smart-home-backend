import { Request, Response, NextFunction } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { findUserById, googleLoginService, loginUserService, registerUserService } from '../services/authService.js';
import { signToken } from '../providers/jwtProvider.js';
import { googleConfig } from '../config/googleConfig.js';
import { AuthRequest } from '../middlewares/authMiddleware.js';
import { UnauthorizedError } from '../utils/errors.js';

const client = new OAuth2Client(googleConfig.clientId);

export const getUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await findUserById(req.userId!);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      picture: user.picture,
    });
  } catch (err) {
    next(err);
  }
};

export const googleLoginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { idToken } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: googleConfig.clientId,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new UnauthorizedError('Google token không hợp lệ');
    }

    const user = await googleLoginService(payload);
    const token = signToken({ id: user._id.toString() });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      picture: user.picture,
      token,
    });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const user = await loginUserService(email, password);
    const token = signToken({ id: user._id.toString() });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (err) {
    next(err);
  }
};

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  try {
    const user = await registerUserService(name, email, password);
    const token = signToken({ id: user._id.toString() });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (err) {
    next(err);
  }
};
