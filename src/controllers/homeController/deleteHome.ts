import { Request, Response } from 'express';
import Home from '../../models/Home.js';

const deleteHome = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedHome = await Home.findByIdAndDelete(id);

    if (!deletedHome) {
      return res.status(404).json({ message: 'Home not found' });
    }

    res.json({ message: 'Home deleted successfully' });
  } catch (error) {
    console.error('Error deleting home:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export default deleteHome;
