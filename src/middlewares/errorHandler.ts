import { Request, Response, NextFunction } from 'express';

/**
 * Error-handling middleware for Express.
 * Catches all errors and formats the response.
 * @param err - The error object.
 * @param req - The incoming request.
 * @param res - The outgoing response.
 * @param next - The next middleware function.
 */
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // Set the status code (default to 500 if not provided)
  const statusCode = err.status || 500;

  // Log the error (you can customize this based on your logging setup)
  console.error(err);

  // Respond with a JSON error message
  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export default errorHandler;
