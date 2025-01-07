import bcrypt from 'bcryptjs';
import { findUserByEmail, createUser } from '../models/userModel';
import { generateToken } from '../utils/jwtUtils';

export const registerUser = async (email: string, password: string, name: string) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return createUser(email, hashedPassword, name);
};

export const loginUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken({ id: user.id, email: user.email });
  return { token, user };
};
