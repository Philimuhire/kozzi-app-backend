import { Request, Response } from 'express';
import OrderItemService from '../services/orderItemService';

class OrderItemController {
  async createOrderItem(req: Request, res: Response) {
    try {
      const orderItem = await OrderItemService.createOrderItem(req.body);
      return res.status(201).json(orderItem);
    } catch (error) {
      return res.status(500).json({ error: 'Error creating order item.' });
    }
  }

  async getOrderItemsByOrder(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      const orderItems = await OrderItemService.getOrderItemsByOrder(orderId);
      return res.status(200).json(orderItems);
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching order items.' });
    }
  }

  async deleteOrderItem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await OrderItemService.deleteOrderItem(id);
      return res.status(200).json({ message: 'Order item deleted successfully.' });
    } catch (error) {
      return res.status(500).json({ error: 'Error deleting order item.' });
    }
  }
}

export default new OrderItemController();
