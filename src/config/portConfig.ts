import dotenv from 'dotenv';
dotenv.config();

export const portConfig = {
  port: process.env.PORT || 5000,
};
