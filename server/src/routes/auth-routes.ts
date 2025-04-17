import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } }); // Find user by username
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password); // Compare provided password with stored hash
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid password' });
  }
  const secretKey = process.env.JWT_SECRET_KEY || '';
  const token = jwt.sign({ username }, secretKey, { // Create JWT token with user data
    expiresIn: '5m',
  });
   return res.status(200).json({
    message: 'Login successful',
    token: token
  });
};

const router = Router();

// POST /login - Login a user
// 'auth/login'
router.post('/login', login);

export default router;