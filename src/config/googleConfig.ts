import dotenv from 'dotenv';
dotenv.config();

if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error('❌ GOOGLE_CLIENT_ID not defined in .env');
}

export const googleConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID,
};
