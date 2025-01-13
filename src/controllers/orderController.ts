import { Request, Response } from 'express';
import OrderService from '../services/orderService';

class OrderController {
  static async createOrder(req: Request, res: Response) {
    try {
      const order = await OrderService.createOrder(req.body);
      res.status(201).json(order);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllOrders(req: Request, res: Response) {
    try {
      const orders = await OrderService.getAllOrders();
      res.status(200).json(orders);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getOrderById(req: Request, res: Response) {
    try {
      const order = await OrderService.getOrderById(req.params.id);
      if (!order) return res.status(404).json({ message: 'Order not found' });
      res.status(200).json(order);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateOrder(req: Request, res: Response) {
    try {
      const updatedOrder = await OrderService.updateOrder(req.params.id, req.body);
      if (!updatedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json(updatedOrder);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteOrder(req: Request, res: Response) {
    try {
      await OrderService.deleteOrder(req.params.id);
      res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default OrderController;
