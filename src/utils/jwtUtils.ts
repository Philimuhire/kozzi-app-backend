import jwt from 'jsonwebtoken';

const JWT_SECRET = 'secret123';  

export const generateToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
