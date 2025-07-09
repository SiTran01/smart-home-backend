import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../providers/jwtProvider.js';
import { UnauthorizedError } from '../utils/errors.js';

export interface AuthRequest extends Request {
  userId?: string;
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new UnauthorizedError('No token provided'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token) as { id: string };
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error('JWT Verify Error:', err);
    next(new UnauthorizedError('Invalid token'));
  }
};

export default authMiddleware;
