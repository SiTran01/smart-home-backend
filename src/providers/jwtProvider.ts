import jwt, { SignOptions } from 'jsonwebtoken';
import { jwtConfig } from '../config/jwtConfig.js';

/**
 * ✅ Hàm signToken
 * @param payload object chứa data cần sign
 * @param expiresIn thời gian hết hạn (default: jwtConfig.expiresIn)
 * @returns JWT token string
 */
export const signToken = (payload: object, expiresIn = jwtConfig.expiresIn) => {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, jwtConfig.secret, options);
};

/**
 * ✅ Hàm verifyToken
 * @param token JWT token string
 * @returns payload đã decode
 * @throws error nếu token không hợp lệ
 */
export const verifyToken = (token: string) => {
  return jwt.verify(token, jwtConfig.secret);
};
