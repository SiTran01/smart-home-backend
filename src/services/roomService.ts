import Room from '../models/Room.js';
import Home from '../models/Home.js';
import { ensureRoomAdminOrOwner } from '../policies/roomPolicy.js';
import { ensureHomeAdminOrOwner } from '../policies/homePolicy.js';


/**
 * 🏠 Tạo room mới, owner hoặc admin được phép
 */
export const createRoomService = async (userId: string, name: string, homeId: string) => {
  // ✅ Check quyền owner hoặc admin
  const home = await ensureHomeAdminOrOwner(userId, homeId);

  // ✅ Tạo room mới
  const newRoom = new Room({ name, home: homeId });
  const savedRoom = await newRoom.save();

  // ✅ Thêm room vào home.rooms
  home.rooms.push(savedRoom._id.toString());
  await home.save();

  return savedRoom;
};

/**
 * 🗑️ Xóa room, owner hoặc admin được phép
 */
export const deleteRoomService = async (userId: string, roomId: string) => {
  // ✅ Dùng policy đảm bảo quyền và load room + home
  const { room, home } = await ensureRoomAdminOrOwner(userId, roomId);

  await room.deleteOne();
  await Home.findByIdAndUpdate(home._id, { $pull: { rooms: room._id } });

  return { message: 'Room deleted successfully' };
};

/**
 * 📄 Lấy toàn bộ rooms của home
 */
export const getAllRoomsService = async (homeId: string) => {
  return await Room.find({ home: homeId });
};

/**
 * ✏️ Cập nhật room, owner hoặc admin được phép
 */
export const updateRoomService = async (
  userId: string,
  roomId: string,
  data: { name?: string; type?: string; location?: string },
) => {
  // ✅ Dùng policy đảm bảo quyền và load room + home
  const { room } = await ensureRoomAdminOrOwner(userId, roomId);

  if (data.name !== undefined) room.name = data.name;
  if (data.type !== undefined) room.type = data.type;
  if (data.location !== undefined) room.location = data.location;

  return await room.save();
};
