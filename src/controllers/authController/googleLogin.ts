import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import User from '../../models/User.js';
import Home from '../../models/Home.js';
import Room from '../../models/Room.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const randomPassword: string = Math.random().toString(36).slice(-8);

const generateToken = (id: string): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET not defined');
  return jwt.sign({ id }, secret, { expiresIn: '7d' });
};

export const googleLogin = async (req: Request, res: Response): Promise<void> => {
  const { idToken } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      res.status(401).json({ message: 'Google token không hợp lệ' });
      return;
    }

    const { name, email, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        password: randomPassword,
        picture,
      });

      // Tạo Home mặc định cho người dùng mới
      const home = new Home({
        name: 'My Home',
        owner: user._id,
      });
      await home.save(); // save Home trước để có _id

      // Tạo Room mặc định cho Home mới
      const room = new Room({
        name: 'New Room',
        home: home._id,
      });
      await room.save(); // ✅ save room vào DB

      // Push room vào home.rooms
      home.rooms.push(room._id.toString());
      await home.save(); // ✅ update home với room mới
    }


    const token = generateToken(user._id.toString());

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      picture,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Google token không hợp lệ' });
  }
};
