import Room from '../models/Room.js';
import Home from '../models/Home.js';
import { NotFoundError } from '../utils/errors.js';

export const createRoomService = async (name: string, homeId: string) => {
  const home = await Home.findById(homeId);
  if (!home) throw new NotFoundError('Home not found');

  const newRoom = new Room({ name, home: homeId });
  const savedRoom = await newRoom.save();

  home.rooms.push(savedRoom._id.toString());
  await home.save();

  return savedRoom;
};

export const deleteRoomService = async (roomId: string) => {
  const room = await Room.findById(roomId);
  if (!room) throw new NotFoundError('Room not found');

  await room.deleteOne();
  await Home.findByIdAndUpdate(room.home, { $pull: { rooms: room._id } });

  return true;
};

export const getAllRoomsService = async (homeId: string) => {
  return await Room.find({ home: homeId });
};

export const updateRoomService = async (
  roomId: string,
  data: { name?: string; type?: string; location?: string },
) => {
  const room = await Room.findById(roomId);
  if (!room) throw new NotFoundError('Room not found');

  if (data.name !== undefined) room.name = data.name;
  if (data.type !== undefined) room.type = data.type;
  if (data.location !== undefined) room.location = data.location;

  return await room.save();
};
