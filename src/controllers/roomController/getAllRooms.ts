import { Response } from 'express';
import Room from '../../models/Room.js';
import { AuthRequest } from '../../middlewares/authMiddleware.js';

const getAllRooms = async (req: AuthRequest, res: Response) => {
  try {
    const { homeId } = req.params;

    if (!homeId) {
      return res.status(400).json({ message: 'Missing homeId in request params' });
    }

    const rooms = await Room.find({ home: homeId });

    res.json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export default getAllRooms;
