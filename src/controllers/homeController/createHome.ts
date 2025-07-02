import { Response } from 'express';
import Home from '../../models/Home.js';
import { AuthRequest } from '../../middlewares/authMiddleware.js'; // chỉnh path nếu cần

const createHome = async (req: AuthRequest, res: Response) => {
  try {
    const { name } = req.body;
    const owner = req.userId;

    if (!owner) {
      return res.status(401).json({ message: 'Unauthorized: No user ID found' });
    }

    const newHome = new Home({ name, owner });
    const savedHome = await newHome.save();

    res.status(201).json(savedHome);
  } catch (error) {
    console.error('Error creating home:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export default createHome;
