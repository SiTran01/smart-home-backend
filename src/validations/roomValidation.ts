import { z } from 'zod';

export const createRoomSchema = z.object({
  name: z.string().min(1, { message: 'Tên room không được để trống' }),
  homeId: z.string().min(1, { message: 'Home ID không được để trống' }),
});

export const updateRoomSchema = z.object({
  name: z.string().optional(),
});

// ✅ Types
export type CreateRoomInput = z.infer<typeof createRoomSchema>;
export type UpdateRoomInput = z.infer<typeof updateRoomSchema>;
