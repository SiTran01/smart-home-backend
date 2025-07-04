import { Response } from 'express';
import Room from '../../models/Room.js';
import { AuthRequest } from '../../middlewares/authMiddleware.js';

const updateRoom = async (req: AuthRequest, res: Response) => {
  try {
    const { roomId } = req.params;
    const { name, type, location } = req.body; // thêm fields nếu model Room có

    if (!roomId) {
      return res.status(400).json({ message: 'Missing roomId in request params' });
    }

    // Tìm room
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Cập nhật field nếu có truyền lên
    if (name !== undefined) room.name = name;
    if (type !== undefined) room.type = type;
    if (location !== undefined) room.location = location;

    const updatedRoom = await room.save();

    res.json(updatedRoom);
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export default updateRoom;
