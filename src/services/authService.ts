import User from '../models/User.js';
import Home from '../models/Home.js';
import Room from '../models/Room.js';
import { NotFoundError, BadRequestError, UnauthorizedError } from '../utils/errors.js';

export const findUserById = async (id: string) => {
  const user = await User.findById(id);
  if (!user) throw new NotFoundError('User not found');
  return user;
};

export const loginUserService = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    throw new UnauthorizedError('Sai tài khoản hoặc mật khẩu');
  }
  return user;
};

export const registerUserService = async (name: string, email: string, password: string) => {
  const userExist = await User.findOne({ email });
  if (userExist) throw new BadRequestError('Email đã tồn tại');

  const user = await User.create({ name, email, password });
  return user;
};

export const googleLoginService = async (payload: any) => {
  const { name, email, picture } = payload;

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      name,
      email,
      password: Math.random().toString(36).slice(-8),
      picture,
    });

    const home = new Home({
      name: 'My Home',
      owner: user._id,
      members: [],
    });
    await home.save();

    const room = new Room({ name: 'New Room', home: home._id });
    await room.save();

    home.rooms.push(room._id.toString());
    await home.save();
  }

  return user;
};

