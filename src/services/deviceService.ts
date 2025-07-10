import Device from '../models/Device.js';
import Home from '../models/Home.js';
import Room from '../models/Room.js';
import { ensureHomeAdminOrOwner } from '../policies/homePolicy.js';
import { ensureDeviceAdminOrOwner } from '../policies/devicePolicy.js';
import { NotFoundError } from '../utils/errors.js';

/**
 * ➕ Tạo device mới, owner hoặc admin được phép
 */
export const createDeviceService = async (userId: string, data: {
  name: string;
  type: string;
  homeId: string;
  roomId?: string;
  status?: any;
}) => {
  const { name, type, homeId, roomId, status } = data;

  // ✅ Check quyền owner hoặc admin
  const home = await ensureHomeAdminOrOwner(userId, homeId);

  let room = null;
  if (roomId) {
    room = await Room.findById(roomId);
    if (!room) throw new NotFoundError('Room not found');
  }

  const newDevice = new Device({
    name,
    type,
    status: status || null,
    home: homeId,
    room: roomId || null,
  });

  const savedDevice = await newDevice.save();

  // ✅ Update home.devices
  home.devices.push(savedDevice._id);
  await home.save();

  return savedDevice;
};

/**
 * 📄 Lấy toàn bộ device của home
 */
export const getAllDevicesService = async (userId: string, homeId: string) => {
  // ✅ Check quyền xem device trong home
  await ensureHomeAdminOrOwner(userId, homeId);
  return await Device.find({ home: homeId });
};

/**
 * ✏️ Update device, owner hoặc admin được phép
 */
export const updateDeviceService = async (userId: string, deviceId: string, data: any) => {
  // ✅ Check quyền và load device + home
  const { device } = await ensureDeviceAdminOrOwner(userId, deviceId);

  const { name, type, status, room } = data;

  if (name !== undefined) device.name = name;
  if (type !== undefined) device.type = type;
  if (status !== undefined) device.status = status;
  if (room !== undefined) device.room = room;

  return await device.save();
};

/**
 * 🗑️ Delete device, owner hoặc admin được phép
 */
export const deleteDeviceService = async (userId: string, deviceId: string) => {
  // ✅ Check quyền và load device + home
  const { device, home } = await ensureDeviceAdminOrOwner(userId, deviceId);

  await device.deleteOne();

  // ✅ Update home.devices
  await Home.findByIdAndUpdate(home._id, { $pull: { devices: device._id } });

  return { message: 'Device deleted successfully' };
};
