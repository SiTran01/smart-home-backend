import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validateRequest = (schema: ZodSchema) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error: any) {
    return res.status(400).json({
      errors: error.errors.map((err: any) => err.message),
    });
  }
};
