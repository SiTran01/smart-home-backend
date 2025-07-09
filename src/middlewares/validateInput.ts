import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { ValidationError } from '../utils/errors.js';

export const validateInput = (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err: any) {
      if (err.name === 'ZodError') {
        const message = err.errors.map((e: any) => e.message).join(', ');
        return next(new ValidationError(message));
      }
      next(err);
    }
  };
