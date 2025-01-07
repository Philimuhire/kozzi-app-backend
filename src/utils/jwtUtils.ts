import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret_key';  // Replace with an environment variable

export const generateToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
