import { z } from 'zod';

export const createDeviceSchema = z.object({
  name: z.string().min(1, { message: 'Tên thiết bị không được để trống' }),
  type: z.string().min(1, { message: 'Loại thiết bị không được để trống' }),
  status: z.any(), // hoặc z.object({...}) tuỳ design status của mày
  homeId: z.string().min(1, { message: 'Home ID không được để trống' }),
});

export const updateDeviceSchema = z.object({
  name: z.string().optional(),
  type: z.string().optional(),
  status: z.any().optional(),
});

// ✅ Types
export type CreateDeviceInput = z.infer<typeof createDeviceSchema>;
export type UpdateDeviceInput = z.infer<typeof updateDeviceSchema>;
