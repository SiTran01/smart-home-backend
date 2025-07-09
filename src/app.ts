import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { connectDB } from './providers/dbProvider.js';
import authRoutes from './routes/authRoute.js';
import homeRoutes from './routes/homeRoute.js';
import roomRoutes from './routes/roomRoute.js';
import deviceRoutes from './routes/deviceRoute.js';
import { databaseConfig } from './config/databaseConfig.js';
import errorHandler from './middlewares/errorHandler.js';
import { NotFoundError } from './utils/errors.js';

const app = express();

// ✅ Connect DB
connectDB(databaseConfig.uri);

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Health Check route
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/room', roomRoutes);
app.use('/api/device', deviceRoutes);

// ✅ 404 handler (nếu không khớp route nào)
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(`Route ${req.originalUrl} not found`));
});

// ✅ Global Error handler middleware (luôn đặt CUỐI cùng)
app.use(errorHandler);

export default app;
