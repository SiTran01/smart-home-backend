import { Response } from 'express';
import Room from '../../models/Room.js';
import Home from '../../models/Home.js';
import { AuthRequest } from '../../middlewares/authMiddleware.js';

const deleteRoom = async (req: AuthRequest, res: Response) => {
  try {
    const { roomId } = req.params;

    if (!roomId) {
      return res.status(400).json({ message: 'Missing roomId in request params' });
    }

    // Tìm room
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Xóa room
    await room.deleteOne();

    // Xóa roomId khỏi home.rooms
    await Home.findByIdAndUpdate(room.home, { $pull: { rooms: room._id } });

    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error('Error deleting room:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export default deleteRoom;
