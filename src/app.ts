import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import homeRoutes from './routes/homeRoutes.js';
import { HttpError } from './utils/errors.js'; // ✅ import HttpError class

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoutes); // ✅ thêm line này

// ✅ Connect DB
mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB error:', err));

// ✅ Error handler middleware (luôn đặt CUỐI cùng)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Global Error Handler:', err);

  if (err instanceof HttpError) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default app;
