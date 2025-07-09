import { z } from 'zod';

export const createHomeSchema = z.object({
  name: z.string().min(1, { message: 'Tên home không được để trống' }),
});

export const updateHomeSchema = z.object({
  name: z.string().optional(),
});

// ✅ Types
export type CreateHomeInput = z.infer<typeof createHomeSchema>;
export type UpdateHomeInput = z.infer<typeof updateHomeSchema>;
