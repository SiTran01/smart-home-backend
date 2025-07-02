import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/errors.js'; // ✅ import error rõ nghĩa

// ✅ Mở rộng interface Request để thêm userId
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
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const decoded = jwt.verify(token, secret) as { id: string };
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error('JWT Verify Error:', err);
    next(new UnauthorizedError('Invalid token'));
  }
};

export default authMiddleware;
