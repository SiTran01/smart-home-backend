import { Request, Response } from 'express';
import Home from '../../models/Home.js';

const updateHome = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedHome = await Home.findByIdAndUpdate(
      id,
      { name },
      { new: true },
    );

    if (!updatedHome) {
      return res.status(404).json({ message: 'Home not found' });
    }

    res.json(updatedHome);
  } catch (error) {
    console.error('Error updating home:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export default updateHome;
