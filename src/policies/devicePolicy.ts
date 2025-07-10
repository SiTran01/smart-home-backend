import Device from '../models/Device.js';
import Home from '../models/Home.js';
import { NotFoundError, ForbiddenError } from '../utils/errors.js';

export const ensureDeviceAdminOrOwner = async (userId: string, deviceId: string) => {
  const device = await Device.findById(deviceId);
  if (!device) throw new NotFoundError('Device not found');

  const home = await Home.findById(device.home);
  if (!home) throw new NotFoundError('Home not found');

  if (home.owner.toString() === userId.toString()) {
    return { device, home }; // owner có quyền
  }

  const member = home.members.find(m => m.user.toString() === userId.toString());
  if (!member || member.role !== 'admin') {
    throw new ForbiddenError('Bạn không có quyền admin trong home này');
  }

  return { device, home };
};
