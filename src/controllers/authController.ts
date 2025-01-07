import { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser } from '../services/authService';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password, name } = req.body;
  
    try {
      const user = await registerUser(email, password, name);
      res.status(201).json(user);
    } catch (error: any) {
      next(error); 
    }
  };

  export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;
  
    try {
      const { token, user } = await loginUser(email, password);
      res.status(200).json({ message: 'Login successful', token, user });
    } catch (error: any) {
      next(error); 
    }
  };
