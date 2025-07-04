import { Response } from 'express';
import Room from '../../models/Room.js';
import Home from '../../models/Home.js';
import { AuthRequest } from '../../middlewares/authMiddleware.js';

const createRoom = async (req: AuthRequest, res: Response) => {
  try {
    const { name, homeId } = req.body;
    const owner = req.userId;

    if (!owner) {
      return res.status(401).json({ message: 'Unauthorized: No user ID found' });
    }

    if (!homeId) {
      return res.status(400).json({ message: 'Missing homeId in request body' });
    }

    // Kiểm tra home có tồn tại không
    const home = await Home.findById(homeId);
    if (!home) {
      return res.status(404).json({ message: 'Home not found' });
    }

    // Tạo room mới
    const newRoom = new Room({
      name,
      home: homeId,
    });

    const savedRoom = await newRoom.save();

    // Push room mới vào home.rooms
    home.rooms.push(savedRoom._id.toString());
    await home.save();

    res.status(201).json(savedRoom);
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export default createRoom;
