import Home from '../models/Home.js';
import { ensureHomeOwner } from '../policies/homePolicy.js';

/**
 * ➕ Tạo home mới, owner riêng, members rỗng
 */
export const createHomeService = async (name: string, owner: string) => {
  const newHome = new Home({
    name,
    owner, // 👑 chỉ định owner
    members: [], // ❌ không thêm owner vào members
  });

  return await newHome.save();
};

/**
 * 🗑️ Xóa home, chỉ owner mới được xóa
 */
export const deleteHomeService = async (userId: string, homeId: string) => {
  // ✅ Check quyền owner qua policy
  const home = await ensureHomeOwner(userId, homeId);

  await home.deleteOne();
  return { message: 'Home deleted successfully' };
};

/**
 * 📄 Lấy toàn bộ home của user (owner hoặc member)
 */
export const getAllHomesService = async (userId: string) => {
  return await Home.find({
    $or: [
      { owner: userId },
      { 'members.user': userId },
    ],
  });
};

/**
 * ✏️ Update home, chỉ owner mới được update
 */
export const updateHomeService = async (userId: string, homeId: string, name: string) => {
  // ✅ Check quyền owner qua policy
  const home = await ensureHomeOwner(userId, homeId);

  home.name = name;
  await home.save();
  return home;
};
