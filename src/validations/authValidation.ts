import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email({ message: 'Email không hợp lệ' }),
  password: z.string().min(6, { message: 'Password phải >= 6 ký tự' }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: 'Email không hợp lệ' }),
  password: z.string().min(1, { message: 'Password không được để trống' }),
});

export const googleLoginSchema = z.object({
  token: z.string().min(1, { message: 'Token không được để trống' }),
});

// ✅ Types inferred from schema
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type GoogleLoginInput = z.infer<typeof googleLoginSchema>;
