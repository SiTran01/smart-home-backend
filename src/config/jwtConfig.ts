import dotenv from 'dotenv';
dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error('❌ JWT_SECRET not defined in .env');
}

export const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: 60 * 60 * 24 * 7, // default 7 ngày
};
