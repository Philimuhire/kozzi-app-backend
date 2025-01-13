import express from 'express';
import OrderItemController from '../controllers/orderItemController';

const router = express.Router();

const asyncHandler = (fn: Function) => 
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

router.post('/addOrderItem', asyncHandler(OrderItemController.createOrderItem));

router.get(
  '/getOrderItems/:orderId',
  asyncHandler(OrderItemController.getOrderItemsByOrder)
);

router.delete(
  '/deleteOrderItem/:id',
  asyncHandler(OrderItemController.deleteOrderItem)
);

export default router;
