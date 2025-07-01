// import { Request, Response } from 'express';
// import jwt from 'jsonwebtoken';
// import { OAuth2Client } from 'google-auth-library';
// import User from '../models/User.js';
// import Home from '../models/Home.js'; // import Home model


// interface AuthRequest extends Request {
//   userId?: string;
// }

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
// const randomPassword: string = Math.random().toString(36).slice(-8);

// const generateToken = (id: string): string => {
//   const secret = process.env.JWT_SECRET;
//   if (!secret) {
//     throw new Error('JWT_SECRET is not defined in environment variables');
//   }
//   return jwt.sign({ id }, secret, { expiresIn: '7d' });
// };

// // ✅ REGISTER
// export const register = async (req: Request, res: Response): Promise<void> => {
//   const { name, email, password } = req.body;
//   try {
//     const userExist = await User.findOne({ email });
//     if (userExist) {
//       res.status(400).json({ message: 'Email đã tồn tại' });
//       return;
//     }

//     const user = await User.create({ name, email, password });

//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id.toString()),
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Lỗi server' });
//   }
// };

// // ✅ LOGIN
// export const login = async (req: Request, res: Response): Promise<void> => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user || !(await user.matchPassword(password))) {
//       res.status(401).json({ message: 'Sai tài khoản hoặc mật khẩu' });
//       return;
//     }

//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id.toString()),
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Lỗi server' });
//   }
// };

// // ✅ GOOGLE LOGIN
// export const googleLogin = async (req: Request, res: Response): Promise<void> => {
//   const { idToken } = req.body;

//   try {
//     const ticket = await client.verifyIdToken({
//       idToken,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const payload = ticket.getPayload();
//     if (!payload) {
//       res.status(401).json({ message: 'Google token không hợp lệ' });
//       return;
//     }

//     const { name, email, picture } = payload;

//     let user = await User.findOne({ email });

//     if (!user) {
//       user = await User.create({
//         name,
//         email,
//         password: randomPassword,
//         picture,
//       });

//       // 🔥 Tạo Home default cho user mới
//       const home = new Home({
//         name: 'My Home',
//         owner: user._id,
//       });
//       await home.save();

//       //Nếu model User có field homes, thì push home._id vào:
//       user.homes = [home._id];
//       await user.save();
//     }

//     const token = generateToken(user._id.toString());

//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       picture,
//       token,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(401).json({ message: 'Google token không hợp lệ' });
//   }
// };

// // ✅ GET USER INFO
// export const getUser = async (req: AuthRequest, res: Response): Promise<void> => {
//   try {
//     console.log('req.userId:', req.userId);
//     const user = await User.findById(req.userId);
//     if (!user) {
//       res.status(404).json({ message: 'User not found' });
//       return;
//     }

//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       picture: user.picture,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Lỗi server' });
//   }
// };
