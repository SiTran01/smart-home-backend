import dotenv from 'dotenv';
dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error('❌ MONGO_URI not defined in .env');
}

export const databaseConfig = {
  uri: process.env.MONGO_URI,
};
