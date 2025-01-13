import express from 'express';
import sequelize from './config/db';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import categoryRoutes from './routes/categoryRoutes';
import orderRoutes from './routes/orderRoutes';
import orderItemRoutes from './routes/orderItemRoutes'

import errorHandler from './middlewares/errorHandler';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/orders', orderRoutes);
app.use('/orderItems', orderItemRoutes)

app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Welcome to Kozzi Homes API!');
});

const startServer = async () => {
  try {
    await sequelize.sync({ force: true }); 
    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

startServer();

export default app;
