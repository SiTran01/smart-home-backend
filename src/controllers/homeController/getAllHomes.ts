import { Request, Response } from 'express';
import Home from '../../models/Home.js';

interface AuthRequest extends Request {
  userId?: string;
}

const getAllHomes = async (req: AuthRequest, res: Response) => {
  try {
    const homes = await Home.find({ owner: req.userId }); // ✅ lọc theo owner (userId)
    res.json(homes);
  } catch (error) {
    console.error('Error fetching homes:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export default getAllHomes;
