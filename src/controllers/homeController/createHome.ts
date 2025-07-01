import { Request, Response } from 'express';
import Home from '../../models/Home.js';

const createHome = async (req: Request, res: Response) => {
  try {
    const { name, owner } = req.body;

    const newHome = new Home({ name, owner });
    const savedHome = await newHome.save();

    res.status(201).json(savedHome);
  } catch (error) {
    console.error('Error creating home:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export default createHome;
