import Home from '../models/Home.js';
import { NotFoundError } from '../utils/errors.js';

export const createHomeService = async (name: string, owner: string) => {
  const newHome = new Home({ name, owner });
  return await newHome.save();
};

export const deleteHomeService = async (id: string) => {
  const deletedHome = await Home.findByIdAndDelete(id);
  if (!deletedHome) throw new NotFoundError('Home not found');
  return deletedHome;
};

export const getAllHomesService = async (owner: string) => {
  return await Home.find({ owner });
};

export const updateHomeService = async (id: string, name: string) => {
  const updatedHome = await Home.findByIdAndUpdate(id, { name }, { new: true });
  if (!updatedHome) throw new NotFoundError('Home not found');
  return updatedHome;
};
