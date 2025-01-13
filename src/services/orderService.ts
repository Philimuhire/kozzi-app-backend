import Order from '../models/orderModel';

class OrderService {   
  static async createOrder(data: { userId: string; totalAmount: number }) {
    return await Order.create(data);
  }

  static async getAllOrders() {
    return await Order.findAll();
  }

  static async getOrderById(id: string) {
    return await Order.findByPk(id);
  }

  static async updateOrder(id: string, updates: any) {
    const order = await Order.findByPk(id);
    if (!order) {
      throw new Error('Order not found');
    }

    await order.update(updates);
    return order;
  }

  static async deleteOrder(id: string) {
    const order = await Order.findByPk(id);
    if (!order) throw new Error('Order not found');
    return await order.destroy();
  }
}

export default OrderService;
