import Home from '../models/Home.js';
import { NotFoundError, ForbiddenError } from '../utils/errors.js';

export const ensureHomeOwner = async (userId: string, homeId: string) => {
  const home = await Home.findById(homeId);
  if (!home) throw new NotFoundError('Home not found');

  if (home.owner.toString() !== userId.toString()) {
    throw new ForbiddenError('Bạn không phải owner của home này');
  }

  return home;
};

export const ensureHomeAdminOrOwner = async (userId: string, homeId: string) => {
  const home = await Home.findById(homeId);
  if (!home) throw new NotFoundError('Home not found');

  if (home.owner.toString() === userId.toString()) {
    return home; // owner có quyền
  }

  const member = home.members.find(m => m.user.toString() === userId.toString());
  if (!member || member.role !== 'admin') {
    throw new ForbiddenError('Bạn không có quyền admin trong home này');
  }

  return home;
};
