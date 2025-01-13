import { Request, Response } from 'express';
import AuthService from '../services/authService';

class AuthController {
    static async register(req: Request, res: Response) {
        try {
          const user = await AuthService.register(req.body);
          res.status(201).json({
            message: 'User created successfully',
            user,
          });
        } catch (error: any) {
          if (error.message === 'User with this email already exists') {
            res.status(409).json({ error: error.message }); 
          } else {
            res.status(400).json({ error: error.message });
          }
        }
      }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { user, token } = await AuthService.login(email, password);
      res.status(200).json({  message: 'login successful',
         user, 
         token });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }
}

export default AuthController;
