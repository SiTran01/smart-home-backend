import mongoose from 'mongoose';
import { databaseConfig } from '../config/databaseConfig.js';

export const connectDB = async (uri = databaseConfig.uri) => {
  try {
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected:', uri);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};
