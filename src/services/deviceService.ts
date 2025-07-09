import Device from '../models/Device.js';
import Home from '../models/Home.js';
import Room from '../models/Room.js';
import { NotFoundError } from '../utils/errors.js';

export const createDeviceService = async (data: {
  name: string;
  type: string;
  homeId: string;
  roomId?: string;
  status?: any;
}) => {
  const { name, type, homeId, roomId, status } = data;

  const home = await Home.findById(homeId);
  if (!home) throw new NotFoundError('Home not found');

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

  home.devices.push(savedDevice._id);
  await home.save();

  return savedDevice;
};

export const getAllDevicesService = async (homeId: string) => {
  return await Device.find({ home: homeId });
};

export const updateDeviceService = async (deviceId: string, data: any) => {
  const device = await Device.findById(deviceId);
  if (!device) throw new NotFoundError('Device not found');

  const { name, type, status, room } = data;

  if (name !== undefined) device.name = name;
  if (type !== undefined) device.type = type;
  if (status !== undefined) device.status = status;
  if (room !== undefined) device.room = room;

  return await device.save();
};

export const deleteDeviceService = async (deviceId: string) => {
  const device = await Device.findById(deviceId);
  if (!device) throw new NotFoundError('Device not found');

  await device.deleteOne();
  await Home.findByIdAndUpdate(device.home, { $pull: { devices: device._id } });

  return { message: 'Device deleted successfully' };
};
