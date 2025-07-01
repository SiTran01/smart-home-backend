import { Request, Response } from 'express';
import Home from '../../models/Home.js';

const getAllHomes = async (req: Request, res: Response) => {
  try {
    const homes = await Home.find();
    res.json(homes);
  } catch (error) {
    console.error('Error fetching homes:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export default getAllHomes;
