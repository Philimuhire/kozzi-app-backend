import { Request, Response, NextFunction } from 'express';

export const validateProduct = (req: Request, res: Response, next: NextFunction): void => {
  const { name, description, image_url } = req.body;
  if (!name || !description || !image_url) {
    res.status(400).json({ message: 'All fields (name, description, image_url) are required' });
  } else {
    next();
  }
};
