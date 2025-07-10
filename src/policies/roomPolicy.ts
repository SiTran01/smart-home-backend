import Room from '../models/Room.js';
import Home from '../models/Home.js';
import { NotFoundError, ForbiddenError } from '../utils/errors.js';

export const ensureRoomAdminOrOwner = async (userId: string, roomId: string) => {
  const room = await Room.findById(roomId);
  if (!room) throw new NotFoundError('Room not found');

  const home = await Home.findById(room.home);
  if (!home) throw new NotFoundError('Home not found');

  if (home.owner.toString() === userId.toString()) {
    return { room, home }; // owner có quyền
  }

  const member = home.members.find(m => m.user.toString() === userId.toString());
  if (!member || member.role !== 'admin') {
    throw new ForbiddenError('Bạn không có quyền admin trong home này');
  }

  return { room, home };
};
