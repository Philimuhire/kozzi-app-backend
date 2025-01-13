import OrderItem from '../models/orderItemModel';

class OrderItemService {
  async createOrderItem(data: {
    orderId: string;
    productId: string;
    quantity: number;
    price: number;
  }) {
    return await OrderItem.create(data);
  }

  async getOrderItemsByOrder(orderId: string) {
    return await OrderItem.findAll({ where: { orderId } });
  }

  async deleteOrderItem(id: string) {
    return await OrderItem.destroy({ where: { id } });
  }
}

export default new OrderItemService();
