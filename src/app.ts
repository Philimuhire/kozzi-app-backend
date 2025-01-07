import express, { Request, Response, NextFunction } from 'express';
import pool from './config/db';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';

const app = express();
app.use(express.json());

app.get('/api/test-db', async (_req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.status(200).json({ message: 'Database connected!', time: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Database connection failed', details: err });
  }
});

app.use('/api/auth', authRoutes);
app.use('/products', productRoutes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});


export default app;
